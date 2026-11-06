// Capture real apps. Seed disposable demo databases before running this script.
// RECORD_BASE_URL, RECORD_FFMPEG and optional RECORD_USERNAME/EMAIL/PASSWORD are local configuration.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const slug = process.argv[2];
const origin = process.env.RECORD_BASE_URL;
if (!origin) throw new Error('Set RECORD_BASE_URL to the demo application.');
const target = new URL(origin);
if (!['127.0.0.1', 'localhost'].includes(target.hostname) && !(slug === 'vrascode' && target.hostname === 'vrascode.dev')) throw new Error('Record disposable local apps; only the portfolio permits a read-only production recording.');
const output = resolve('public/videos/projects');
const raw = resolve('.artifacts/project-recordings', slug);
mkdirSync(output, { recursive: true }); mkdirSync(raw, { recursive: true });
const browser = await chromium.launch({ channel: process.env.RECORD_BROWSER || 'chrome' });
const setup = await browser.newContext({ viewport: { width: 1280, height: 720 }, locale: 'en-US' });
const warm = await setup.newPage();
const wait = (p, ms = 2800) => p.waitForTimeout(ms);
let start = '/';
const steps = [];
try {
  if (slug === 'clearledger') {
    await setup.addCookies([{ name: 'clearledger-locale', value: 'en-US', url: origin }]);
    await warm.goto(origin, { waitUntil: 'networkidle' });
    await warm.getByRole('button', { name: 'Explore sample data', exact: true }).first().click();
    await warm.locator('.sample-banner').waitFor();
    start = new URL(warm.url()).pathname + new URL(warm.url()).search;
    for (const route of ['/reconciliation', '/imports', '/reports']) await warm.goto(new URL(route + new URL(warm.url()).search, origin).href, { waitUntil: 'networkidle' });
  } else if (slug === 'controle-de-estoque') {
    await warm.goto(origin);
    await warm.locator('input[type=email]').fill(process.env.RECORD_EMAIL || '');
    await warm.locator('input[type=password]').fill(process.env.RECORD_PASSWORD || '');
    await warm.getByRole('button', { name: 'Entrar', exact: true }).click();
    await warm.waitForURL(/acao=listar/);
    start = '/index.php?acao=dashboard';
  } else if (slug === 'amigo-fiel') {
    await warm.goto(new URL('/login/', origin).href);
    await warm.locator('[name=username]').fill(process.env.RECORD_USERNAME || '');
    await warm.locator('[name=password]').fill(process.env.RECORD_PASSWORD || '');
    await warm.getByRole('button', { name: 'Entrar', exact: true }).click();
    await warm.waitForURL(origin + '/');
  } else if (slug === 'fintrack-pro') {
    await warm.goto(origin, { waitUntil: 'networkidle' });
    await warm.getByRole('button', { name: /Explorar demonstra/ }).click();
    await warm.getByText('Saldo disponível', { exact: true }).waitFor();
    for (const route of ['/activity', '/accounts', '/cards', '/budgets', '/preferences']) await warm.goto(new URL(route, origin).href, { waitUntil: 'networkidle' });
  } else if (slug === 'vrascode') start = '/en';
  else throw new Error('No verified recording workflow for this project.');

  const state = await setup.storageState();
  await setup.close();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, locale: 'en-US', storageState: state, recordVideo: { dir: raw, size: { width: 1280, height: 720 } } });
  const page = await context.newPage(); page.setDefaultTimeout(12_000);
  const began = Date.now();
  const act = async (name, action) => { steps.push(name); await action(); await wait(page); };
  await page.goto(new URL(start, origin).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (slug === 'clearledger') await page.locator('.metric-value').first().waitFor();
  if (slug === 'fintrack-pro') await page.getByText('Saldo disponível', { exact: true }).first().waitFor();
  await wait(page, 1000);
  // Remove only initial loading frames. All retained frames are actual app interactions.
  const trimStart = (Date.now() - began) / 1000;
  const contentBegan = Date.now();
  await wait(page);
  await page.screenshot({ path: resolve(output, `${slug}-poster.jpg`), type: 'jpeg', quality: 82 });
  if (slug === 'clearledger') {
    await act('Open persisted reconciliation', () => page.locator('a[href^="/reconciliation"]').first().click());
    await act('Expand missing-payment record', () => page.getByRole('button', { name: 'Expand ORD-1003', exact: true }).click());
    await act('Inspect exception details', () => page.getByRole('button', { name: 'Inspect ORD-1003', exact: true }).click());
    await act('Close exception drawer', () => page.keyboard.press('Escape'));
    await act('Review imported CSV datasets', () => page.locator('a[href^="/imports"]').first().click());
    await act('Read report analytics', () => page.locator('a[href^="/reports"]').first().click());
  } else if (slug === 'controle-de-estoque') {
    await act('Open stock overview', () => page.locator('a[href="index.php?acao=listar"]').first().click());
    await act('Open stock entry form', () => page.locator('a[href="index.php?acao=entrada&id=2"]').first().click());
    await page.locator('[name=motivo]').selectOption({ label: 'Compra' });
    await page.locator('[name=quantidade]').fill('5');
    await page.locator('[name=observacao]').fill('Entrada fictícia para demonstração');
    await wait(page);
    await act('Persist a five-unit demo stock entry', () => page.getByRole('button', { name: 'Confirmar entrada', exact: true }).click());
    await act('Open inventory reports', () => page.locator('a[href="index.php?acao=relatorios"]').first().click());
    await page.mouse.wheel(0, 360); await wait(page);
  } else if (slug === 'amigo-fiel') {
    await act('Open a synthetic pet profile', () => page.locator('a[href^="/pet/luna-demo-"]').first().click());
    await act('Browse adoption catalog', () => page.getByRole('link', { name: 'Procurando Adotar', exact: true }).click());
    await act('Browse marketplace', () => page.getByRole('link', { name: 'Produtos', exact: true }).click());
    await act('Open synthetic product', () => page.locator('a[href="/loja-demo/brinquedo-demo/"]').first().click());
    await act('Add real cart item in disposable database', () => page.getByRole('button', { name: 'Adicionar à sacola', exact: true }).click());
    await act('View cart', () => page.getByRole('link', { name: /Carrinho/ }).first().click());
  } else if (slug === 'fintrack-pro') {
    await act('Open built-in synthetic transaction history', () => page.getByRole('button', { name: /Movimentações/ }).first().click());
    await act('Search the real synthetic transaction list', () => page.locator('input').filter({ visible: true }).first().fill('Mercado'));
    await page.locator('input').filter({ visible: true }).first().fill('');
    await act('Open demo accounts', () => page.getByRole('button', { name: /Contas/ }).first().click());
    await act('Open device preferences', () => page.getByRole('button', { name: /Configurações/ }).first().click());
    await act('Switch actual device color theme', () => page.getByText('Escuro', { exact: true }).last().click());
    await act('Return to demo dashboard', () => page.getByRole('button', { name: /Visão geral/ }).first().click());
    await page.mouse.wheel(0, 350); await wait(page);
  } else {
    await act('Open portfolio projects', () => page.locator('header a[href="/en/projects"]').first().click());
    await act('Filter actual project catalog', () => page.getByRole('button', { name: 'Full stack', exact: true }).click());
    await act('Search a project technology', () => page.locator('input[type=search]').fill('Python'));
    await act('Reset search', () => page.locator('input[type=search]').fill(''));
    await act('Open biography', () => page.locator('header a[href="/en/about"]').first().click());
    await page.mouse.wheel(0, 500); await wait(page);
  }
  if (Date.now() - contentBegan < 26_000) await wait(page, 26_000 - (Date.now() - contentBegan));
  if (Date.now() - contentBegan > 44_000) throw new Error('Recording exceeded the intended length; prewarm the application and retry.');
  const recording = page.video(); await context.close();
  const rawPath = await recording.path();
  const ffmpeg = process.env.RECORD_FFMPEG || 'ffmpeg';
  const converted = spawnSync(ffmpeg, ['-y', '-ss', trimStart.toFixed(3), '-i', rawPath, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-r', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', resolve(output, `${slug}.mp4`)], { encoding: 'utf8' });
  if (converted.status !== 0) throw new Error(converted.stderr);
  writeFileSync(resolve(raw, 'evidence.json'), JSON.stringify({ slug, origin, recordedAt: new Date().toISOString(), sourceCommit: process.env.RECORD_SOURCE_SHA || null, steps, viewport: [1280, 720], elapsedSeconds: Math.round((Date.now() - began) / 1000), rawPath }, null, 2));
  console.log(`Recorded real ${slug} interactions to public/videos/projects/${slug}.mp4`);
} finally { await browser.close(); }
