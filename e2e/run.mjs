// Visual + functional sweep of every na-* component, executed inside Docker.
// BASE_URL: showcase container. OUT: mounted volume for screenshots + summary.
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://showcase';
const OUT = process.env.OUT ?? '/results';
mkdirSync(OUT, { recursive: true });

const failures = [];
const measures = {};
const fail = (name, detail) => {
  failures.push({ name, detail });
  console.log(`FAIL ${name}: ${detail}`);
};
const ok = (name) => console.log(`ok ${name}`);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

// Polls a condition (instant Playwright getters don't retry). Distinguishes
// "never happens" (real bug) from "render race" (timing).
async function poll(label, fn, timeout = 4000) {
  const t0 = Date.now();
  let last;
  while (Date.now() - t0 < timeout) {
    last = await fn();
    if (last) return true;
    await new Promise((r) => setTimeout(r, 100));
  }
  fail(label, `condition never true (last=${JSON.stringify(last)})`);
  return false;
}

async function newPage(route) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  return { page, errors };
}

function checkJsErrors(label, errors) {
  if (errors.length) fail(`${label} js-errors`, errors.join(' | '));
  else ok(`${label} js-errors`);
}

// --- 1. every route loads clean + full-page screenshots -------------------
for (const route of ['/', '/dashboard', '/signin', '/gallery']) {
  const { page, errors } = await newPage(route);
  checkJsErrors(`route ${route}`, errors);
  const name = route === '/' ? 'landing' : route.slice(1);
  await page.screenshot({ path: `${OUT}/${name}-desktop.png`, fullPage: true });
  await page.close();
}
ok('route screenshots');

// --- 2. shell nav works ----------------------------------------------------
{
  const { page, errors } = await newPage('/');
  for (const [link, heading] of [
    ['Dashboard', 'Good evening, Ada'],
    ['Sign in', 'Sign in'],
    ['Gallery', 'Component gallery'],
  ]) {
    await page.getByRole('link', { name: link, exact: true }).click();
    await page.locator('na-page').getByRole('heading', { name: heading }).waitFor();
    ok(`nav -> ${link}`);
  }
  checkJsErrors('nav', errors);
  await page.close();
  ok('nav');
}

// --- 3. gallery interactions ------------------------------------------------
const { page, errors: galleryErrors } = await newPage('/gallery');

// buttons
if (!(await page.locator('#btn-disabled button').isDisabled())) fail('button', 'disabled not disabled');
if (!(await page.locator('#btn-loading .na-btn__spinner').count())) fail('button', 'loading spinner missing');
await page.locator('#btn-block').screenshot({ path: `${OUT}/btn-block.png` });
ok('buttons');

// switch / checkbox / radio
await page.locator('#sw-basic input').click();
if ((await page.locator('#sw-basic input').isChecked()) !== false) fail('switch', 'toggle did not flip');
await page.locator('#cb-basic input').click();
if (!(await page.locator('#cb-basic input').isChecked())) fail('checkbox', 'toggle did not flip');
await page.locator('#radio-basic label', { hasText: 'Team' }).click();
await poll('radio', async () => page.locator('#radio-basic input').nth(2).isChecked());
await poll('radio-echo', async () => page.getByText('picked plan: team').count().then((n) => n > 0));
ok('toggles+radio');

// reactive disable (setDisabledState)
await page.locator('#btn-disable-fc button').click();
await poll('cva-disable', async () => page.locator('#sw-reactive input').isDisabled());
await page.locator('#btn-enable-fc button').click();
await poll('cva-enable', async () => page.locator('#sw-reactive input').isDisabled().then((d) => !d));
ok('cva-disabled');

// form submit
await page.locator('#form-nick').fill('ada');
await page.locator('na-form button[type="submit"]').click();
await poll('form-submit', async () => page.locator('#form-saved').count().then((n) => n > 0));
ok('form-submit');

// modal: open, Escape closes, backdrop closes
await page.locator('#btn-open-modal button').click();
await page.locator('na-modal [role="dialog"]').waitFor();
await page.screenshot({ path: `${OUT}/modal-open.png` });
await page.keyboard.press('Escape');
await poll('modal-escape', async () => page.locator('na-modal [role="dialog"]').count().then((n) => n === 0));
await page.locator('#btn-open-modal button').click();
await page.locator('na-modal [role="dialog"]').waitFor();
await page.locator('na-modal .na-modal__overlay').click({ position: { x: 40, y: 700 } });
await poll('modal-backdrop', async () => page.locator('na-modal [role="dialog"]').count().then((n) => n === 0));
ok('modal');

// tabs
await page.locator('#demo-tabs button[role="tab"]').nth(2).click();
await poll('tabs', async () => page.getByText('Panel 3 content.').count().then((n) => n > 0));
ok('tabs');

// tooltip attributes
const tipSpanTab = await page.locator('#tip-span').getAttribute('tabindex');
const tipBtnTab = await page.locator('#tip-btn').getAttribute('tabindex');
const tipEmptyData = await page.locator('#tip-empty').getAttribute('data-na-tooltip');
const tipEmptyTab = await page.locator('#tip-empty').getAttribute('tabindex');
if (tipSpanTab !== '0') fail('tooltip', `span tabindex=${tipSpanTab}`);
if (tipBtnTab !== null) fail('tooltip', `button tabindex=${tipBtnTab}`);
if (tipEmptyData !== null) fail('tooltip', `empty bubble data=${tipEmptyData}`);
if (tipEmptyTab !== null) fail('tooltip', `empty tabindex=${tipEmptyTab}`);
await page.locator('#tip-span').hover();
await page.locator('#sec-overlay').screenshot({ path: `${OUT}/tooltip-hover.png` });
ok('tooltip');

// breadcrumbs
const crumbLinks = page.locator('#crumbs-href a.na-crumbs__link');
if ((await crumbLinks.nth(0).getAttribute('href')) !== '/') fail('breadcrumbs', 'home href wrong');
if ((await crumbLinks.nth(1).getAttribute('href')) !== '/gallery') fail('breadcrumbs', 'gallery href wrong');
if (!(await page.locator('#crumbs-href .na-crumbs__current').count())) fail('breadcrumbs', 'current missing');
ok('breadcrumbs');

// progress clamp
const aria150 = await page.locator('#prog-150 [role="progressbar"]').getAttribute('aria-valuenow');
const ariaNeg = await page.locator('#prog-neg [role="progressbar"]').getAttribute('aria-valuenow');
const w100 = await page.locator('#prog-100 .na-progress__fill').evaluate((el) => el.getBoundingClientRect().width);
const w150 = await page.locator('#prog-150 .na-progress__fill').evaluate((el) => el.getBoundingClientRect().width);
measures.progress = { aria150, ariaNeg, w100, w150 };
if (aria150 !== '100' || ariaNeg !== '0') fail('progress', `aria ${aria150}/${ariaNeg}`);
if (w150 > w100 + 0.5) fail('progress', `overflow: 150 fill ${w150}px > 100 fill ${w100}px`);
ok('progress');

// avatar initials + sizes (size input is suspected dead — measured, not assumed)
const dbl = await page.locator('#avatar-double .na-avatar__initials').textContent();
measures.avatarInitials = dbl;
if (dbl !== 'AL') fail('avatar', `double-space initials="${dbl}"`);
for (const id of ['#avatar-sm', '#avatar-lg']) {
  measures[id] = await page.locator(id).evaluate((el) => el.getBoundingClientRect().width);
}
const smW = measures['#avatar-sm'];
const lgW = measures['#avatar-lg'];
const mdW = await page.locator('na-avatar:not([id])').first().evaluate((el) => el.getBoundingClientRect().width);
measures.avatarWidths = { sm: smW, md: mdW, lg: lgW };
if (smW === mdW && mdW === lgW) fail('avatar', `size input dead: sm=${smW} md=${mdW} lg=${lgW}`);
ok('avatar');

// bare link has no href (no top-jump)
if ((await page.locator('#link-bare').getAttribute('href')) !== null) fail('link', 'bare link has href');
ok('link');

// mobile pass: landing + gallery full page
const mob = await browser.newContext({ viewport: { width: 390, height: 844 } });
for (const [route, name] of [['/', 'landing'], ['/gallery', 'gallery']]) {
  const p = await mob.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(BASE + route, { waitUntil: 'networkidle' });
  if (errs.length) fail(`${name} mobile`, errs.join(' | '));
  await p.screenshot({ path: `${OUT}/${name}-mobile.png`, fullPage: true });
  await p.close();
}
ok('mobile screenshots');

checkJsErrors('gallery', galleryErrors);
await page.close();
await browser.close();

writeFileSync(`${OUT}/summary.json`, JSON.stringify({ failures, measures }, null, 2));
console.log(`\n${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
