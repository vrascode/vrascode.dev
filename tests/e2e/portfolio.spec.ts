import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import identity from '../../content/identity.json';
import { projects } from '../../src/lib/projects';

test('English is the default even for a Portuguese browser', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'pt-BR' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('h1')).toHaveText(identity.locales.en.headline);
  await context.close();
});

for (const locale of ['en', 'pt'] as const) {
  test(`${locale}: all pages render, metadata and links are valid`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['', '/projects', '/about', '/experience', '/contact', ...projects.map(p => `/projects/${p.slug}`)]) {
      const response = await page.goto(`/${locale}${route}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://vrascode.dev/${locale}${route}`);
      expect(await page.title()).toContain(identity.name);
      if (route === '/projects') {
        await expect(page.locator('.page-header h1')).toHaveText(locale === 'pt' ? 'Projetos que transformam conhecimento em soluções reais.' : 'Projects that turn knowledge into real-world solutions.');
        await expect(page.locator('.page-header > p').last()).toHaveText(locale === 'pt' ? 'Uma coleção de aplicações desenvolvidas para explorar desafios de engenharia de software, desenvolvimento Full Stack e arquitetura de sistemas. Cada projeto representa uma oportunidade de aplicar tecnologias, aprimorar habilidades e construir soluções com propósito.' : 'A collection of applications built to explore software engineering, full-stack development and systems architecture. Each project is an opportunity to apply technology, strengthen my skills and build purposeful solutions.');
      }
      if (route.startsWith('/projects/')) {
        const project = projects.find(item => route.endsWith(item.slug))!;
        const repositoryLink = page.locator('.project-detail-header a[href*="github.com/"]');
        if (project.repository) await expect(repositoryLink).toHaveAttribute('href', project.repository);
        else await expect(repositoryLink).toHaveCount(0);
      }
      expect(await page.locator('body').innerText()).not.toMatch(/Nubank|NuDemo|MISSING_MESSAGE|undefined/);
      const internal = await page.locator('a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')!).filter(Boolean))]);
      for (const link of internal) {
        const linked = await request.get(link);
        expect(linked.status(), `${locale}${route}: ${link}`).toBeLessThan(400);
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${locale}: homepage identity, project order and keyboard access`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const copy = identity.locales[locale === 'pt' ? 'pt-BR' : 'en'];
    await expect(page.locator('.hero-greeting')).toHaveText(copy.greeting);
    await expect(page.locator('h1')).toHaveText(copy.headline);
    await expect(page.locator('.hero-description')).toHaveText(copy.description);
    const linkedIn = page.getByRole('link', { name: locale === 'pt' ? 'Meu LinkedIn' : 'My LinkedIn' });
    await expect(linkedIn).toHaveAttribute('href', identity.links.linkedin);
    await expect(linkedIn).toHaveAttribute('rel', /noopener/);
    const github = page.getByRole('link', { name: 'GitHub' }).first();
    await expect(github).toHaveAttribute('href', identity.links.github);
    await expect(page.getByRole('link', { name: locale === 'pt' ? 'Entre em contato' : 'Get in touch' })).toHaveAttribute('href', `/${locale}/contact`);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    await page.goto(`/${locale}/projects`);
    await expect(page.locator('.project-card h3')).toHaveText(projects.map(p => p.name));
  });

  test(`${locale}: accessible pages in both themes`, async ({ page }) => {
    for (const theme of ['dark', 'light']) {
      for (const route of ['', '/projects', '/about', '/experience', '/contact', '/projects/clearledger', '/projects/vras-watches', '/projects/vrascode']) {
        await page.goto(`/${locale}${route}`);
        await page.evaluate(value => { localStorage.setItem('theme', value); document.documentElement.setAttribute('data-theme', value); }, theme);
        const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), `${locale}${route} ${theme}`).toEqual([]);
      }
    }
  });

  test(`${locale}: profile image loads only when Matheus's supplied photograph exists`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const providedPhotoExists = existsSync('public/images/matheus-sulino.png.jpeg');
    await expect(page.locator('.hero-art img')).toHaveCount(providedPhotoExists ? 1 : 0);
    if (providedPhotoExists) {
      await expect(page.locator('.hero-art img')).toHaveAttribute('alt', locale === 'pt' ? 'Foto profissional de Matheus Sulino' : 'Professional photo of Matheus Sulino');
      const response = await page.request.get('/images/matheus-sulino.png.jpeg');
      expect(response.ok()).toBe(true);
      await response.body();
      await expect(page.locator('.hero-art')).toBeVisible();
      await page.goto(`/${locale}/about`);
      await expect(page.locator('.bio-mark img')).toHaveAttribute('alt', locale === 'pt' ? 'Foto profissional de Matheus Sulino' : 'Professional photo of Matheus Sulino');
    } else {
      await expect(page.locator('.hero-art .monogram')).toBeVisible();
      await page.goto(`/${locale}/about`);
      await expect(page.locator('.bio-mark .monogram')).toBeVisible();
    }
  });

  test(`${locale}: academic timeline displays evidence without inventing graduation progress`, async ({ page }) => {
    await page.goto(`/${locale}/about#education`);
    const timeline = page.locator('#education');
    await expect(timeline.locator('.timeline-date').filter({ hasText: /2025\/2/ })).toBeVisible();
    await expect(timeline.locator('.timeline-date').filter({ hasText: /2026\/1/ })).toBeVisible();
    await expect(timeline.getByText(locale === 'pt' ? 'Janeiro de 2023 — Dezembro de 2027 (previsão)' : 'January 2023 — December 2027 (expected)')).toBeVisible();
    await expect(timeline).not.toContainText(/período informado no LinkedIn|period listed on LinkedIn/i);
    await expect(timeline.locator('.academic-data-pending')).toHaveText(locale === 'pt' ? '8º período · Graduação em andamento' : '8th term · Degree in progress');
    await expect(timeline.getByText(locale === 'pt' ? /Graduação em Ciência da Computação com estudos em programação/ : /Computer Science studies in programming/)).toBeVisible();
    const uftLogo = timeline.locator('.institution-logo');
    await expect(uftLogo).toHaveAttribute('alt', 'Universidade Federal do Tocantins — UFT');
    await expect.poll(() => uftLogo.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const logoResponse = await page.request.get('/images/institutions/uft-logo.png');
    expect(logoResponse.ok()).toBe(true);
    expect(logoResponse.headers()['content-type']).toMatch(/image\/png/);
    const amigoLogo = timeline.locator('.academic-project-preview-image');
    await expect(amigoLogo).toHaveAttribute('alt', locale === 'pt' ? 'Logotipo do projeto Amigo Fiel' : 'Amigo Fiel project logo');
    await expect.poll(() => amigoLogo.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(timeline.locator('.academic-project-heading .academic-project-logo')).toHaveCount(0);
    await expect.poll(() => amigoLogo.evaluate(image => getComputedStyle(image).objectFit)).toBe('contain');
    const amigoLogoResponse = await page.request.get('/images/projects/amigo-fiel-preview.png');
    expect(amigoLogoResponse.ok()).toBe(true);
    expect(amigoLogoResponse.headers()['content-type']).toMatch(/image\/png/);
    const amigoFielEntry = timeline.locator('.timeline-entry').filter({ hasText: 'Amigo Fiel' });
    await expect(amigoFielEntry.locator('.academic-project-meta .timeline-date')).toBeVisible();
    await expect(amigoFielEntry.locator('.academic-project-meta .academic-project-preview')).toBeVisible();
    const inventoryEntry = timeline.locator('.timeline-entry').filter({ hasText: 'Controle de Estoque' });
    await expect(inventoryEntry.locator('.academic-project-preview')).toHaveCount(0);
    await expect(timeline).not.toContainText(/percentual de conclusão da graduação e a previsão de formatura não foram confirmados|degree completion percentage and expected graduation date have not been confirmed/i);
    await expect(timeline).not.toContainText(/\b\d+%\b/);
  });

  test(`${locale}: academic project preview preserves image proportions and responsive order`, async ({ page }) => {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/about#education`);
      const timeline = page.locator('#education');
      const entry = timeline.locator('.timeline-entry').filter({ hasText: 'Amigo Fiel' });
      const meta = entry.locator('.academic-project-meta');
      const frame = meta.locator('.academic-project-preview');
      const image = frame.locator('img');
      const content = entry.locator('> div').nth(1);
      await frame.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      const periodBox = await meta.locator('.timeline-date').boundingBox();
      const imageBox = await frame.boundingBox();
      const titleBox = await content.locator('h3').boundingBox();
      expect(periodBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      expect(titleBox).not.toBeNull();
      const natural = await image.evaluate(element => ({ width: (element as HTMLImageElement).naturalWidth, height: (element as HTMLImageElement).naturalHeight, fit: getComputedStyle(element).objectFit }));
      expect(natural.width).toBeGreaterThan(0);
      expect(natural.height).toBeGreaterThan(0);
      expect(natural.fit).toBe('contain');
      expect(Math.abs(imageBox!.width / imageBox!.height - 16 / 9)).toBeLessThan(0.02);
      const metaBox = await meta.boundingBox();
      expect(metaBox).not.toBeNull();
      expect(imageBox!.x).toBeGreaterThanOrEqual(metaBox!.x);
      expect(imageBox!.x + imageBox!.width).toBeLessThanOrEqual(metaBox!.x + metaBox!.width + 1);
      if (width <= 620) {
        expect(imageBox!.y).toBeGreaterThan(periodBox!.y);
        expect(titleBox!.y).toBeGreaterThan(imageBox!.y + imageBox!.height);
      } else {
        expect(imageBox!.x).toBeLessThan(titleBox!.x);
      }
      await expect(entry.locator('a[href$="/projects/amigo-fiel"]')).toHaveCount(1);
      const stock = timeline.locator('.timeline-entry').filter({ hasText: 'Controle de Estoque' });
      await expect(stock.locator('.timeline-date')).toBeVisible();
      await expect(stock.locator('a[href$="/projects/controle-de-estoque"]')).toHaveCount(1);
      await expect(stock.locator('.academic-project-preview')).toHaveCount(0);
    }
  });
}

for (const locale of ['en', 'pt'] as const) {
  test(`${locale}: confirmed e-mail and WhatsApp contacts render working public links`, async ({ page }) => {
    await page.goto(`/${locale}/contact`);
    await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:vrascode@gmail.com');
    await expect(page.locator('a[href^="https://wa.me/"]')).toHaveAttribute('href', /5563992254787/);
    await expect(page.getByRole('link', { name: locale === 'pt' ? 'Enviar e-mail' : 'Send an email' })).toHaveAttribute('href', 'mailto:vrascode@gmail.com');
    await expect(page.getByRole('link', { name: locale === 'pt' ? 'Conversar pelo WhatsApp' : 'Chat on WhatsApp' })).toHaveAttribute('href', /5563992254787/);
    await expect(page.getByRole('link', { name: locale === 'pt' ? 'Ver perfil no LinkedIn' : 'View LinkedIn profile' })).toHaveAttribute('href', identity.links.linkedin);
    await expect(page.getByRole('link', { name: locale === 'pt' ? 'Ver perfil no GitHub' : 'View GitHub profile' })).toHaveAttribute('href', identity.links.github);
  });

  test(`${locale}: SEFAZ-TO internship and work arrangement are accurate`, async ({ page }) => {
    await page.goto(`/${locale}/experience`);
    const experience = page.locator('.timeline-entry').first();
    await expect(experience.locator('h2')).toHaveText(locale === 'pt' ? 'Estagiário de Tecnologia da Informação' : 'Information Technology Intern');
    await expect(experience.locator('.experience-entry-meta .timeline-date')).toHaveText('SEFAZ-TO');
    await expect(experience.locator('.timeline-company')).toHaveCount(0);
    await expect(experience).not.toContainText(locale === 'pt' ? 'Junho de 2025 — Atual' : 'June 2025 — Present');
    await expect(experience).toContainText(locale === 'pt' ? 'Palmas, Tocantins, Brasil' : 'Palmas, Tocantins, Brazil');
    await expect(experience).toContainText(locale === 'pt' ? 'Presencial' : 'On-site');
    await expect(experience.locator('.timeline-body').last()).toContainText(locale === 'pt' ? 'Desenvolvedor de software, suporte técnico, manutenção de equipamentos e apoio à infraestrutura de TI' : 'software development, technical support, equipment maintenance and IT infrastructure support');
    const sefazLogo = experience.locator('.experience-institution-logo');
    await expect(experience.locator('.experience-entry-logo img')).toHaveCount(1);
    await expect(experience.locator('.experience-institution img')).toHaveCount(0);
    await expect(sefazLogo).toHaveAttribute('alt', locale === 'pt' ? 'Logotipo oficial da Secretaria da Fazenda do Tocantins' : 'Official logo of the Tocantins Department of Finance');
    await expect.poll(() => sefazLogo.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect.poll(() => sefazLogo.evaluate(image => getComputedStyle(image).objectFit)).toBe('contain');
    const sefazResponse = await page.request.get('/images/institutions/sefaz-to-logo.png');
    expect(sefazResponse.ok()).toBe(true);
    expect(sefazResponse.headers()['content-type']).toMatch(/image\/png/);
    const academicExperience = page.locator('.timeline-entry').nth(1);
    const uftLogo = academicExperience.locator('.experience-entry-logo img');
    await expect(uftLogo).toHaveAttribute('alt', 'Universidade Federal do Tocantins — UFT');
    await expect.poll(() => uftLogo.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(academicExperience.locator('.experience-academic-brand img')).toHaveCount(0);
    await expect.poll(() => uftLogo.evaluate(image => getComputedStyle(image).objectFit)).toBe('contain');
    const sefazBox = await experience.locator('.experience-entry-logo').boundingBox();
    const sefazTitleBox = await experience.locator('h2').boundingBox();
    const uftBox = await academicExperience.locator('.experience-entry-logo').boundingBox();
    const uftTitleBox = await academicExperience.locator('h2').boundingBox();
    expect(sefazBox!.x).toBeLessThan(sefazTitleBox!.x);
    expect(uftBox!.x).toBeLessThan(uftTitleBox!.x);
  });

  test(`${locale}: experience institution logos stack correctly on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/experience`);
    for (const index of [0, 1] as const) {
      const entry = page.locator('.timeline-entry').nth(index);
      const date = entry.locator('.experience-entry-meta .timeline-date');
      const frame = entry.locator('.experience-entry-logo');
      const title = entry.locator('h2');
      await frame.scrollIntoViewIfNeeded();
      await expect.poll(() => frame.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      const dateBox = await date.boundingBox();
      const imageBox = await frame.boundingBox();
      const titleBox = await title.boundingBox();
      expect(imageBox!.y).toBeGreaterThan(dateBox!.y);
      expect(titleBox!.y).toBeGreaterThan(imageBox!.y + imageBox!.height);
      expect(await entry.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
  });
}

for (const locale of ['en', 'pt'] as const) {
  test(`${locale}: local project images load on cards and detail pages`, async ({ page }) => {
    const expected = {
      'clearledger': '/projects/clearledger.png',
      'fintrack-pro': '/projects/fintrack-pro.png',
      'controle-de-estoque': '/images/Controle-de-estoque.png',
      'vras-watches': '/images/vras-watches.png',
      'amigo-fiel': '/images/projects/amigo-fiel-logo.png',
      'vrascode': '/icon.svg'
    } as const;
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/projects`);
      const visualHeights: number[] = [];
      for (const [slug, path] of Object.entries(expected)) {
        const card = page.locator(`.project-card[data-project="${slug}"]`);
        const image = card.locator('.project-visual img');
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        const source = await image.evaluate(element => {
          const url = new URL((element as HTMLImageElement).currentSrc);
          return url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
        });
        expect(source).toBe(path);
        const box = await card.locator('.project-visual').boundingBox();
        visualHeights.push(box!.height);
        if (slug === 'clearledger' || slug === 'fintrack-pro') await expect(card.locator('.screenshot-frame')).toHaveCount(1);
        else {
          await expect(card.locator('.project-asset-preview')).toHaveCount(1);
          await expect.poll(() => image.evaluate(element => getComputedStyle(element).objectFit)).toBe('contain');
        }
      }
      expect(new Set(visualHeights).size).toBe(1);
    }
    for (const slug of Object.keys(expected)) {
      await page.goto(`/${locale}/projects/${slug}`);
      const image = page.locator('.project-visual img');
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
  });
}

test('project search, categories and recovery from empty results work', async ({ page }) => {
  await page.goto('/en/projects');
  await page.getByRole('searchbox').fill('FastAPI');
  await expect(page.locator('.project-card h3')).toHaveText(['ClearLedger']);
  await page.getByRole('searchbox').fill('no-such-project');
  await expect(page.getByRole('status')).toHaveText('No projects found');
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(page.locator('.project-card h3')).toHaveText(['FinTrack Pro']);
});

test('language switching retains the project route and theme persists', async ({ page }) => {
  await page.goto('/en/projects/clearledger');
  await page.getByRole('link', { name: 'Change language to Portuguese' }).click();
  await expect(page).toHaveURL(/\/pt\/projects\/clearledger$/);
  await expect(page.getByRole('heading', { name: 'O que está implementado' })).toBeVisible();
  await page.getByRole('button', { name: 'Usar tema claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('link', { name: 'Mudar idioma para inglês' }).click();
  await expect(page).toHaveURL(/\/en\/projects\/clearledger$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }]) {
  test(`responsive layout at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const locale of ['en', 'pt']) for (const route of ['', '/projects', '/about', '/experience', '/contact', '/projects/fintrack-pro', '/projects/clearledger']) {
      await page.goto(`/${locale}${route}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${locale}${route}`).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
    }
    await page.goto('/pt');
    await mkdir('.artifacts/screenshots', { recursive: true });
    await page.screenshot({ path: `.artifacts/screenshots/home-pt-${viewport.width}.png`, fullPage: true });
    if (viewport.width <= 768) {
      await page.getByRole('button', { name: 'Abrir navegação' }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Abrir navegação' })).toBeFocused();
      await page.getByRole('button', { name: 'Abrir navegação' }).click();
      await dialog.getByRole('link', { name: /Projetos/ }).click();
      await expect(page).toHaveURL(/\/pt\/projects$/);
      await expect(dialog).not.toBeVisible();
    }
  });
}

test('reduced motion, back-to-top and copy interaction', async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('data-scroll-engine', 'native');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Back to top' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/contact');
  await page.getByRole('button', { name: 'Copy GitHub profile link' }).click();
  await expect(page.getByRole('status')).toHaveText('Profile link copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(identity.links.github);
});

test('Midnight Violet tokens, GSAP reveals, Lenis anchor scrolling and progress indicator', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: 8 }));
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('data-scroll-engine', 'lenis');
  await expect(page.locator('.scroll-progress')).toBeAttached();
  expect(await page.locator('.scroll-progress').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(167, 139, 250)');
  await page.locator('.hero-bottom a').click();
  await expect(page).toHaveURL(/#selected-work$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(50);
  const progress = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--scroll-progress').trim());
  expect(Number(progress)).toBeGreaterThan(0);
  await page.locator('#technologies').scrollIntoViewIfNeeded();
  await expect(page.locator('.stack-group').first()).toHaveCSS('visibility', 'visible');
});

test('404, robots, sitemap, favicon and localized Open Graph images', async ({ page, request }) => {
  const missing = await page.goto('/pt/pagina-inexistente');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading')).toHaveText('Esta página seguiu outro caminho.');
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('https://vrascode.dev/sitemap.xml');
  const sitemap = await request.get('/sitemap.xml');
  expect((await sitemap.text()).match(/<loc>/g)?.length).toBe(22);
  for (const route of ['/icon.svg', '/apple-icon', '/en/opengraph-image', '/pt/opengraph-image']) {
    const image = await request.get(route);
    expect(image.status(), route).toBe(200);
    expect(image.headers()['content-type']).toMatch(/image\//);
    if (route.includes('opengraph-image')) {
      const png = Buffer.from(await image.body());
      expect([...png.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
      expect(png.byteLength).toBeGreaterThan(20_000);
    }
  }
});
