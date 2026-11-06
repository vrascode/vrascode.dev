import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { getPublishedProjects } from '../../src/lib/projects';

for (const locale of ['en', 'pt']) for (const width of [1440, 768, 390]) {
  test(`complete editorial Home ${locale} at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    if (locale === 'pt') await page.addInitScript(() => localStorage.setItem('theme', 'light'));
    const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`/${locale}`);
    const sections = page.locator('.home-project-section');
    await expect(sections.locator('h3')).toHaveText(getPublishedProjects().map(p => p.name));
    await expect(page.locator('.project-card,.project-preview-button,.project-showcase-dialog')).toHaveCount(0);
    await expect(page.getByText('Watch demo', { exact: true })).toHaveCount(0);
    for (const section of await sections.all()) {
      const copy = await section.locator('.home-project-copy').boundingBox();
      const media = await section.locator('.home-project-media').boundingBox();
      expect(copy && media).toBeTruthy();
      if (width > 900) { expect(copy!.x).toBeLessThan(media!.x); expect(media!.width).toBeGreaterThan(copy!.width); }
      else expect(copy!.y + copy!.height).toBeLessThan(media!.y);
    }
    const first = sections.first(); await first.scrollIntoViewIfNeeded();
    await expect(first.locator('video')).toHaveCount(0);
    await mkdir('.artifacts/home-showcase', { recursive: true });
    await page.screenshot({ path: `.artifacts/home-showcase/${locale}-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto(`/${locale}/projects`);
    await expect(page.locator('.project-story h2')).toHaveText(getPublishedProjects().map(p => p.name));
    expect(errors).toEqual([]);
  });
}

test('visibility autoplay, manual pause, resumption and one-player arbitration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const requests: string[] = []; page.on('request', r => { if (r.url().endsWith('.mp4')) requests.push(r.url()); });
  await page.goto('/en');
  expect(requests).toEqual([]);
  const clear = page.locator('[data-home-project="clearledger"]');
  const fin = page.locator('[data-home-project="fintrack-pro"]');
  await clear.locator('.home-project-media').scrollIntoViewIfNeeded();
  const a = clear.locator('video');
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  expect(await a.evaluate(v => { const x = v as HTMLVideoElement; return x.muted && x.loop && x.playsInline && x.autoplay; })).toBe(true);
  const control = clear.locator('.home-video-toggle');
  // A browser may interrupt/reject automatic playback without changing viewport state.
  await a.evaluate(v => (v as HTMLVideoElement).pause());
  await expect(control).toHaveAttribute('aria-pressed', 'false');
  await control.click();
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await expect(control).toHaveAttribute('aria-pressed', 'true'); await control.click();
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  const before = await a.evaluate(v => (v as HTMLVideoElement).currentTime);
  await control.click();
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await fin.locator('.home-project-media').scrollIntoViewIfNeeded();
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  await expect.poll(() => fin.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  expect(await page.locator('.home-project-media video').evaluateAll(ns => ns.filter(n => !(n as HTMLVideoElement).paused).length)).toBe(1);
  await clear.locator('.home-project-media').scrollIntoViewIfNeeded();
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(before);
  await expect.poll(() => a.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('reduced motion has explicit touch playback and fallback posters are honest', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage(); await page.goto('/pt');
  const card = page.locator('[data-home-project="clearledger"]');
  await card.locator('.home-project-media').scrollIntoViewIfNeeded();
  await expect(card.locator('video')).toHaveCount(0);
  await card.locator('.home-video-toggle').tap();
  await expect.poll(() => card.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await card.locator('.home-video-toggle').tap();
  await expect.poll(() => card.locator('video').evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  for (const slug of ['amigo-fiel', 'vras-watches']) {
    const section = page.locator(`[data-home-project="${slug}"]`);
    await expect(section.locator('.home-project-poster')).toHaveCount(1);
    await expect(section.locator('video,.home-video-toggle')).toHaveCount(0);
  }
  await context.close();
});

test('network failure leaves the real poster and a functioning retry control', async ({ page }) => {
  await page.route('**/clearledger-dark.mp4', r => r.abort());
  await page.goto('/en');
  const card = page.locator('[data-home-project="clearledger"]');
  await card.locator('.home-project-media').scrollIntoViewIfNeeded();
  await expect(card.locator('figcaption')).toContainText('could not be loaded');
  await expect(card.locator('.home-project-poster')).toBeVisible();
  await page.unroute('**/clearledger-dark.mp4');
  await card.locator('.home-video-toggle').click();
  await expect.poll(() => card.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
});
