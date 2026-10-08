import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://showcase';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(`${base}/gallery`, { waitUntil: 'networkidle' });
await page.locator('#btn-open-modal button').click();
await page.locator('na-modal [role="dialog"]').waitFor();

const dump = await page.evaluate(() => {
  const overlay = document.querySelector('na-modal .na-modal__overlay');
  const dialog = document.querySelector('na-modal [role="dialog"]');
  const o = getComputedStyle(overlay);
  const d = dialog.getBoundingClientRect();
  return {
    overlay: {
      position: o.position,
      inset: `${o.top} ${o.right} ${o.bottom} ${o.left}`,
      background: o.backgroundColor,
      display: o.display,
      zIndex: o.zIndex,
      rect: overlay.getBoundingClientRect().toJSON(),
    },
    dialogRect: d.toJSON(),
    viewport: { w: innerWidth, h: innerHeight },
    scrollY: scrollY,
  };
});
console.log(JSON.stringify(dump, null, 1));
await browser.close();
