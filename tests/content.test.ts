import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTranslator } from 'next-intl';
import en from '../messages/en.json';
import pt from '../messages/pt.json';
import identity from '../content/identity.json';
import { filterProjects, projects } from '../src/lib/projects';
import { pageMetadata, publicPaths } from '../src/lib/metadata';
import { parseGitHubProfile, readGitHubProfile } from '../src/lib/github';

function keys(value: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, item]) => typeof item === 'string' ? [`${prefix}${key}`] : keys(item as Record<string, unknown>, `${prefix}${key}.`)).sort();
}

test('every message has an English and Portuguese equivalent and formats without errors', () => {
  assert.deepEqual(keys(en), keys(pt));
  for (const [locale, messages] of Object.entries({ en, pt })) {
    const translate = createTranslator({ locale, messages, onError: error => { throw error; } }) as (key: string, values: Record<string, string | number>) => string;
    for (const key of keys(messages)) assert.ok(translate(key, { count: 3, year: 2026, name: 'ClearLedger' }).trim(), `${locale}:${key}`);
  }
});

test('identity retains the exact requested presentation and official links', () => {
  assert.equal(identity.name, 'Matheus Sulino');
  assert.equal(identity.brand, 'VRAS CODE');
  assert.equal(identity.pageTitle, 'Matheus Sulino | Full-Stack Developer');
  assert.equal(identity.locales.en.greeting, "Hi, I'm Matheus Sulino.");
  assert.equal(identity.locales['pt-BR'].greeting, 'Olá, eu sou Matheus Sulino.');
  assert.equal(identity.links.portfolio, 'https://vrascode.dev');
  assert.equal(identity.links.repository, 'https://github.com/vrascode/vrascode.dev');
});

test('the project collection preserves the required order and has complete localized details', () => {
  assert.deepEqual(projects.map(p => p.name), ['FinTrack Pro', 'ClearLedger', 'VRAS', 'Amigo Fiel', 'Controle de Estoque']);
  assert.equal(new Set(projects.map(p => p.slug)).size, 5);
  for (const project of projects) {
    assert.deepEqual(Object.keys(project.content.en).sort(), Object.keys(project.content.pt).sort());
    for (const locale of ['en', 'pt'] as const) {
      for (const [key, value] of Object.entries(project.content[locale])) {
        if (typeof value === 'string') assert.ok(value.trim(), `${project.slug}:${locale}:${key}`);
      }
    }
    if (project.verified) assert.ok(project.sources.length && project.repository);
  }
});

test('unidentified work cannot silently acquire invented technologies or a repository', () => {
  const vras = projects.find(p => p.slug === 'vras')!;
  assert.equal(vras.verified, false);
  assert.equal(vras.repository, undefined);
  assert.equal(vras.image, undefined);
  assert.deepEqual(vras.stack, []);
});

test('project search supports accent-insensitive terms, technology filters and empty results', () => {
  assert.equal(filterProjects(projects, 'reconciliacao', 'all', 'pt')[0]?.slug, 'clearledger');
  assert.deepEqual(filterProjects(projects, 'typescript', 'mobile', 'en').map(p => p.slug), ['fintrack-pro']);
  assert.equal(filterProjects(projects, 'nothing-matches-this', 'all', 'en').length, 0);
  assert.equal(filterProjects(projects, '   ', 'all', 'en').length, 5);
});

test('GitHub parsing rejects invalid counts, another profile and untrusted fields', () => {
  assert.deepEqual(parseGitHubProfile({ login: 'vrascode', public_repos: 8, followers: 6, email: 'never-exposed' }), { login: 'vrascode', publicRepos: 8, followers: 6 });
  for (const value of [null, {}, { login: 'someone-else', public_repos: 5, followers: 1 }, { login: 'vrascode', public_repos: -1, followers: 1 }, { login: 'vrascode', public_repos: 2.5, followers: 1 }, { login: 'vrascode', public_repos: 2, followers: '1' }]) assert.equal(parseGitHubProfile(value), null);
});

test('all localized public pages have production canonicals and matching language alternatives', () => {
  const paths = [...publicPaths, ...projects.map(p => `/projects/${p.slug}`)];
  assert.equal(paths.length, 10);
  for (const locale of ['en', 'pt'] as const) for (const path of paths) {
    const meta = pageMetadata(locale, path, identity.pageTitle, 'Description');
    assert.equal(meta.alternates?.canonical, `https://vrascode.dev/${locale}${path}`);
    assert.equal(meta.alternates?.languages?.['pt-BR'], `https://vrascode.dev/pt${path}`);
    assert.equal(meta.alternates?.languages?.['x-default'], `https://vrascode.dev/en${path}`);
  }
});

test('GitHub HTTP failures, malformed JSON and network timeouts safely fall back', async () => {
  assert.equal(await readGitHubProfile(async () => new Response('Rate limited', { status: 429 })), null);
  assert.equal(await readGitHubProfile(async () => new Response('Invalid JSON')), null);
  assert.equal(await readGitHubProfile(async () => { throw new DOMException('Timed out', 'TimeoutError'); }), null);
  assert.deepEqual(await readGitHubProfile(async () => Response.json({ login: 'vrascode', public_repos: 6, followers: 6 })), { login: 'vrascode', publicRepos: 6, followers: 6 });
});
