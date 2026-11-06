import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { getPublishedProjects } from '../../src/lib/projects';
import { projectPreviewVideos } from '../../src/lib/project-videos';

for (const locale of ['en', 'pt']) for (const width of [1440, 390]) {
  test(`${locale} inline videos autoplay without hover at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    if (locale === 'pt') await page.addInitScript(() => localStorage.setItem('theme', 'light'));
    const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`/${locale}/projects`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.project-story h2')).toHaveText(getPublishedProjects().map(p => p.name));
    await expect(page.locator('.project-preview-button,.project-preview-label,.project-showcase-dialog')).toHaveCount(0);
    await expect(page.getByText(/Watch demo|Assistir demonstração/)).toHaveCount(0);
    // Filtering exercises cleanup/re-registration without sticky cards overlapping.
    for (const project of getPublishedProjects()) {
      await page.getByRole('searchbox').fill(project.name);
      const story = page.locator(`[data-project="${project.slug}"]`);
      const recording = projectPreviewVideos[project.slug];
      if (!recording) {
        await expect(story.locator('video,.home-video-toggle')).toHaveCount(0);
        await expect(story.locator('.project-visual img')).toBeVisible();
        continue;
      }
      const media = story.locator('.home-project-media');
      await media.scrollIntoViewIfNeeded();
      const video = media.locator('video');
      await expect(video).toHaveAttribute('src', recording.src);
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
      expect(await video.evaluate(v => { const x = v as HTMLVideoElement; return x.muted && x.loop && x.playsInline && x.autoplay; })).toBe(true);
      expect(await video.evaluate(v => (v as HTMLVideoElement).videoWidth)).toBe(1280);
      const control = media.getByRole('button');
      await expect(control).toHaveAttribute('aria-label', new RegExp(locale === 'pt' ? '^Pausar' : '^Pause'));
      await control.click();
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
      await control.focus(); await page.keyboard.press('Enter');
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
      await page.mouse.move(0, 0);
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
      await expect(page.locator('dialog[open]')).toHaveCount(0);
    }
    await page.getByRole('searchbox').fill('Amigo Fiel');
    await page.locator('.home-project-media').scrollIntoViewIfNeeded();
    await expect(page.locator('video')).toHaveAttribute('src', '/videos/projects/amigo-fiel.mp4');
    const axe = await new AxeBuilder({ page }).include('.project-story').withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(axe.violations.map(v => v.id)).toEqual([]);
    await mkdir('.artifacts/video-screenshots', { recursive: true });
    await page.screenshot({ path: `.artifacts/video-screenshots/inline-${locale}-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('Projects reduced motion defers requests and permits manual playback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const requests: string[] = []; page.on('request', r => { if (r.url().endsWith('.mp4')) requests.push(r.url()); });
  await page.goto('/pt/projects');
  await page.getByRole('searchbox').fill('Amigo Fiel');
  const media = page.locator('.home-project-media'); await media.scrollIntoViewIfNeeded();
  await media.hover();
  await expect(media.locator('video')).toHaveCount(0);
  expect(requests).toEqual([]);
  await media.getByRole('button').click();
  await expect.poll(() => media.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('Projects pauses before another preview starts and preserves case-study interactions', async ({ page }) => {
  await page.goto('/en/projects');
  const first = page.locator('[data-project="clearledger"] .home-project-media');
  await first.scrollIntoViewIfNeeded();
  await expect.poll(() => first.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  const second = page.locator('[data-project="fintrack-pro"] .home-project-media');
  await second.scrollIntoViewIfNeeded();
  await expect.poll(() => second.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await expect.poll(() => first.locator('video').evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  expect(await page.locator('video').evaluateAll(ns => ns.filter(n => !(n as HTMLVideoElement).paused).length)).toBe(1);
  await page.getByRole('searchbox').fill('ClearLedger');
  await page.getByRole('button', { name: 'Run sample' }).click();
  await expect(page.getByText('1 discrepancy identified for review')).toBeVisible();
});
