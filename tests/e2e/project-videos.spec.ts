import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

for (const locale of ['en', 'pt']) {
  for (const width of [1440, 390]) {
    test(`${locale} video presentation plays and closes accessibly at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const errors: string[] = [];
      page.on('pageerror', e => errors.push(e.message));
      if (locale === 'pt') await page.addInitScript(() => localStorage.setItem('theme', 'light'));
      await page.goto(`/${locale}/projects`);
      const launcher = page.locator('[data-project="clearledger"] .project-preview-button');
      await launcher.click();
      const dialog = page.locator('.project-showcase-dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText('ClearLedger');
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
      const video = dialog.locator('video');
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(1);
      expect(await video.evaluate(v => (v as HTMLVideoElement).duration)).toBeGreaterThan(20);
      expect(await video.evaluate(v => (v as HTMLVideoElement).duration)).toBeLessThan(46);
      await video.evaluate(v => (v as HTMLVideoElement).play());
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.2);
      await video.evaluate(v => (v as HTMLVideoElement).pause());
      expect(await video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
      const axe = await new AxeBuilder({ page }).include('.project-showcase-dialog').withTags(['wcag2a', 'wcag2aa']).analyze();
      expect(axe.violations.map(v => v.id)).toEqual([]);
      await mkdir('.artifacts/video-screenshots', { recursive: true });
      await page.screenshot({ path: `.artifacts/video-screenshots/${locale}-${width}.png` });
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(launcher).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
      await launcher.click();
      await expect(dialog).toBeVisible();
      await dialog.click({ position: { x: 2, y: 2 } });
      await expect(dialog).toHaveCount(0);
      expect(errors).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}

test('hover recordings load on demand, pause outside media and respect reduced motion', async ({ page }) => {
  await page.goto('/en/projects');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('input[type=search]').fill('ClearLedger');
  expect(await page.locator('.project-hover-video').count()).toBe(0);
  const preview = page.locator('[data-project="clearledger"] .project-video-preview');
  await preview.hover();
  const video = preview.locator('video');
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await page.mouse.move(0, 0);
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await preview.hover();
  await expect(preview.locator('video')).toHaveCount(0);
});

test('all real recordings decode; unavailable projects have no fabricated video', async ({ page }) => {
  await page.goto('/en/projects');
  for (const slug of ['clearledger', 'fintrack-pro', 'amigo-fiel', 'controle-de-estoque', 'vrascode']) {
    await page.locator('input[type=search]').fill(slug === 'controle-de-estoque' ? 'Controle de Estoque' : slug === 'vrascode' ? 'VRAS CODE' : slug === 'amigo-fiel' ? 'Amigo Fiel' : slug === 'fintrack-pro' ? 'FinTrack Pro' : 'ClearLedger');
    await page.locator(`[data-project="${slug}"] .project-preview-button`).click();
    const video = page.locator('.project-showcase-dialog video');
    await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(1);
    expect(await video.evaluate(v => (v as HTMLVideoElement).videoWidth)).toBe(1280);
    await video.evaluate(v => (v as HTMLVideoElement).play());
    await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
    await page.keyboard.press('Escape');
    await expect(page.locator('.project-showcase-dialog')).toHaveCount(0);
  }
  await page.locator('input[type=search]').fill('VRAS Watches');
  await page.locator('[data-project="vras-watches"] .project-preview-button').click();
  await expect(page.locator('.project-showcase-dialog')).toContainText('Recording unavailable');
  await expect(page.locator('.project-showcase-dialog video')).toHaveCount(0);
  await page.keyboard.press('Escape');
});
