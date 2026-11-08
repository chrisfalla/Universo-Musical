import { chromium } from 'playwright';

const routes = ['/', '/accesorios/', '/instrumentos/guitarras/', '/404.html'];
const themes = ['light', 'dark'];

function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function parseColor(str) {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3] };
}

const browser = await chromium.launch();
const issues = [];

for (const theme of themes) {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
    const consoleErrors = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', (e) => consoleErrors.push(e.message));
    await page.goto('http://localhost:4321' + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const collected = await page.evaluate(() => {
      function getBg(el) {
        const fallback = document.documentElement.dataset.theme === 'light' ? 'rgb(248,250,252)' : 'rgb(13,13,13)';
        let cur = el;
        let bg = fallback;
        while (cur && cur !== document.documentElement) {
          const b = getComputedStyle(cur).backgroundColor;
          const m = b.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (m) {
            const a = m[4] === undefined ? 1 : parseFloat(m[4]);
            if (a > 0) {
              const fr = parseInt(m[1]), fg = parseInt(m[2]), fb = parseInt(m[3]);
              const br = parseInt(bg.match(/rgb\((\d+)/)[1]);
              const bgg = parseInt(bg.match(/rgb\(\d+,\s*(\d+)/)[1]);
              const bb = parseInt(bg.match(/rgb\(\d+,\s*\d+,\s*(\d+)/)[1]);
              const r = Math.round(fr * a + br * (1 - a));
              const g = Math.round(fg * a + bgg * (1 - a));
              const b = Math.round(fb * a + bb * (1 - a));
              bg = 'rgb(' + r + ',' + g + ',' + b + ')';
              if (a >= 0.95) break;
            }
          }
          cur = cur.parentElement;
        }
        return bg;
      }
      const out = [];
      const all = Array.from(document.querySelectorAll('*'));
      for (const el of all) {
        const text = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
        if (!text) continue;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const fontSize = parseFloat(cs.fontSize);
        const large = fontSize >= 18 || (fontSize >= 14 && parseInt(cs.fontWeight) >= 700);
        out.push({
          tag: el.tagName.toLowerCase(),
          text: text.slice(0, 60),
          color: cs.color,
          bg: getBg(el),
          fontSize,
          large,
          selector: el.id ? '#' + el.id : el.className ? '.' + String(el.className).split(' ')[0] : ''
        });
      }
      return out;
    });

    for (const item of collected) {
      const c = parseColor(item.color);
      const b = parseColor(item.bg);
      if (!c || !b) continue;
      const l1 = luminance(c.r, c.g, c.b);
      const l2 = luminance(b.r, b.g, b.b);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const threshold = item.large ? 3 : 4.5;
      if (ratio < threshold) {
        issues.push({ theme, route, ratio: ratio.toFixed(2), threshold, ...item });
      }
    }

    if (overflow) issues.push({ theme, route, type: 'overflow', ratio: '-', threshold: '-', tag: 'html', text: 'horizontal overflow', color: '', bg: '', fontSize: 0, large: false, selector: '' });
    if (consoleErrors.length) issues.push({ theme, route, type: 'console', ratio: '-', threshold: '-', tag: 'console', text: consoleErrors.join(' | ').slice(0, 200), color: '', bg: '', fontSize: 0, large: false, selector: '' });

    await page.screenshot({ path: `C:/Users/socra/AppData/Local/Temp/opencode/audit-${theme}-${route.replace(/\//g, '_')}.png`, fullPage: true });
    await page.close();
  }
}

await browser.close();

console.log('=== AUDIT ISSUES ===');
console.log(JSON.stringify(issues.slice(0, 80), null, 2));
console.log('Total issues:', issues.length);
