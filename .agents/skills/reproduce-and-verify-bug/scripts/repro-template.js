// Usage: node repro.js <baseUrl> <label>
const { chromium, devices } = require('playwright-core');
const fs = require('fs');

const base = process.argv[2] || 'http://localhost:3100';
const label = process.argv[3] || 'run';
const DEVICE = 'iPhone 13'; // or 'Desktop Chrome'
const START_PATH = '/clubs';

// Edit these to mirror the user's exact steps.
const STEPS = [
  ['loaded page', async (p) => {}],
  ['tap Community filter', async (p) => p.getByRole('button', { name: 'Community', exact: true }).first().tap()],
  ['tap first club card', async (p) => p.locator('[id^="club-card-"]').first().tap({ position: { x: 60, y: 30 } })],
  ['browser back', async (p) => p.goBack()],
];

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: fs.existsSync(edge) ? edge : chrome, headless: true });
  const page = await (await browser.newContext({ ...devices[DEVICE] })).newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && errors.push(`console.${m.type()}: ${m.text()}`));
  const crashed = async () =>
    (await page.locator('text=Application error').count()) > 0 || (await page.locator('text=We hit a snag').count()) > 0;

  await page.goto(base + START_PATH, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  for (const [i, [name, fn]] of STEPS.entries()) {
    try { await fn(page); } catch (e) { errors.push(`step "${name}" failed: ${e.message.split('\n')[0]}`); }
    await page.waitForTimeout(2500);
    console.log(`[${label}] ${i + 1} ${name.padEnd(40)} crashed=${await crashed()}`);
    await page.screenshot({ path: `${label}-${i + 1}_${name.replace(/\W+/g, '_')}.png` });
  }
  console.log(`[${label}] errors (${errors.length}):`);
  [...new Set(errors)].slice(0, 15).forEach((e) => console.log('   ' + e.slice(0, 220)));
  await browser.close();
})();
