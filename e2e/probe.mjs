import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://showcase';
const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto(`${base}/gallery`, { waitUntil: 'networkidle' });

const dump = await page.locator('#sec-type').evaluate((el) => {
  const out = [];
  el.querySelectorAll('na-heading').forEach((h) => {
    const cs = getComputedStyle(h);
    const kid = h.firstElementChild;
    out.push({
      levelAttr: h.getAttribute('ng-reflect-level') ?? h.getAttribute('level'),
      child: kid ? kid.tagName : '(empty)',
      childText: kid ? kid.textContent.trim().slice(0, 20) : '',
      hostDisplay: cs.display,
      childDisplay: kid ? getComputedStyle(kid).display : '',
      rect: h.getBoundingClientRect().height,
    });
  });
  return out;
});
console.log(JSON.stringify(dump, null, 1));
await browser.close();
