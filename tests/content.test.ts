import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTranslator } from 'next-intl';
import en from '../messages/en.json';
import pt from '../messages/pt.json';
import identity from '../content/identity.json';
import { filterProjects, projects } from '../src/lib/projects';
import { pageMetadata, publicPaths } from '../src/lib/metadata';
import { parseGitHubProfile, readGitHubProfile } from '../src/lib/github';
import { buildProfileContacts, getProfileContacts } from '../src/lib/public-contacts';

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
  assert.equal(identity.pageTitle, 'Matheus Sulino | Full-Stack Developer — VRAS CODE');
  assert.equal(identity.locales.en.greeting, "Hi, I'm Matheus Sulino.");
  assert.equal(identity.locales['pt-BR'].greeting, 'Olá, eu sou Matheus Sulino.');
  assert.equal(identity.locales['pt-BR'].headline, 'Desenvolvendo soluções para desafios reais.');
  assert.equal(identity.locales['pt-BR'].description, 'Sou desenvolvedor Full Stack e estudante de Ciência da Computação na Universidade Federal do Tocantins. Tenho interesse em engenharia de software, desenvolvimento de sistemas e na criação de soluções tecnológicas que unem funcionalidade, qualidade e boas práticas de desenvolvimento.');
  assert.equal(identity.locales.en.headline, 'Building software solutions for real-world challenges.');
  assert.equal(identity.locales.en.description, "I'm a Full-Stack Developer and Computer Science student at the Federal University of Tocantins, focused on software engineering, application development, and building practical solutions through thoughtful engineering.");
  assert.equal(identity.links.portfolio, 'https://vrascode.dev');
  assert.equal(identity.links.repository, 'https://github.com/vrascode/vrascode.dev');
});

test('the project collection preserves the required order and has complete localized details', () => {
  assert.deepEqual(projects.map(p => p.name), ['ClearLedger', 'FinTrack Pro', 'VRAS Watches', 'VRAS CODE', 'Controle de Estoque', 'Amigo Fiel']);
  assert.equal(new Set(projects.map(p => p.slug)).size, 6);
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

test('VRAS Watches uses its local project image without implying public repository access', () => {
  const watches = projects.find(p => p.slug === 'vras-watches')!;
  assert.equal(watches.verified, false);
  assert.equal(watches.repository, undefined);
  assert.equal(watches.image, '/images/vras-watches.png');
  assert.equal(watches.imagePresentation, 'cover');
  assert.deepEqual(watches.stack, ['Django']);
  assert.match(watches.content.pt.summary, /catálogo de produtos, carrinho de compras e interface responsiva/);
  const portfolio = projects.find(p => p.slug === 'vrascode')!;
  assert.equal(portfolio.verified, true);
  assert.equal(portfolio.repository, 'https://github.com/vrascode/vrascode.dev');
});

test('project search supports accent-insensitive terms, technology filters and empty results', () => {
  assert.equal(filterProjects(projects, 'reconciliacao', 'all', 'pt')[0]?.slug, 'clearledger');
  assert.deepEqual(filterProjects(projects, 'typescript', 'mobile', 'en').map(p => p.slug), ['fintrack-pro']);
  assert.equal(filterProjects(projects, 'nothing-matches-this', 'all', 'en').length, 0);
  assert.equal(filterProjects(projects, '   ', 'all', 'en').length, 6);
});

test('GitHub parsing rejects invalid counts, another profile and untrusted fields', () => {
  assert.deepEqual(parseGitHubProfile({ login: 'vrascode', public_repos: 8, followers: 6, email: 'never-exposed' }), { login: 'vrascode', publicRepos: 8, followers: 6 });
  for (const value of [null, {}, { login: 'someone-else', public_repos: 5, followers: 1 }, { login: 'vrascode', public_repos: -1, followers: 1 }, { login: 'vrascode', public_repos: 2.5, followers: 1 }, { login: 'vrascode', public_repos: 2, followers: '1' }]) assert.equal(parseGitHubProfile(value), null);
});

test('all localized public pages have production canonicals and matching language alternatives', () => {
  const paths = [...publicPaths, ...projects.map(p => `/projects/${p.slug}`)];
  assert.equal(paths.length, 11);
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

test('authorized email and WhatsApp details are normalized and available by default', () => {
  assert.deepEqual(identity.publicContact, { email: 'vrascode@gmail.com', whatsapp: '+55 63 99225-4787' });
  assert.deepEqual(getProfileContacts(), { email: 'vrascode@gmail.com', whatsapp: '5563992254787' });
  assert.deepEqual(buildProfileContacts({}), { email: null, whatsapp: null });
  assert.deepEqual(buildProfileContacts({ email: 'not-an-email', whatsapp: '123-abc' }), { email: null, whatsapp: null });
  assert.deepEqual(buildProfileContacts({ email: 'matheus@example.com', whatsapp: '+55 (63) 99999-1234' }), { email: 'matheus@example.com', whatsapp: '5563999991234' });
});

test('professional identity includes the LinkedIn profile supplied by Matheus', () => {
  assert.equal(identity.links.linkedin, 'https://www.linkedin.com/in/matheus-sulino-2227a9257/');
});

test('optional photograph and resume use the requested drop-in filenames', async () => {
  const assets = await import('../src/lib/profile-assets');
  assert.equal(assets.profilePhotoPath, '/images/matheus-sulino.png.jpeg');
  assert.equal(assets.hasProfilePhoto(), true);
  assert.equal(assets.resumePath, '/documents/matheus-sulino-cv.pdf');
  assert.equal(identity.locales['pt-BR'].education.semester, '8' + String.fromCharCode(186) + ' semestre');
  assert.equal(identity.locales.en.education.semester, '8th semester');
});
