import { ArrowUpRight, GitFork as Github } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { identity } from '@/lib/identity';
import { getGitHubProfile } from '@/lib/github.server';
import { SectionHeading } from './section-heading';

export async function GitHubSection() {
  const [t, profile, locale] = await Promise.all([getTranslations('Home'), getGitHubProfile(), getLocale()]);
  const format = new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'en');
  return <section className="section" id="github"><SectionHeading label={t('githubLabel')} title={t('githubTitle')} />
    <div className="github-panel"><div><div className="github-profile"><Github strokeWidth={1.5} aria-hidden="true" /><div><h3>vrascode</h3><p>Matheus Sulino</p></div></div><p>{t('githubDescription')}</p><a className="text-link" href={identity.links.github} target="_blank" rel="noopener noreferrer">{t('githubCta')}<ArrowUpRight size={15} /></a></div>
      <div className="github-stats" data-testid="github-status">{profile ? <><div className="github-stat-grid"><div><strong>{format.format(profile.publicRepos)}</strong><span>{t('repositories')}</span></div><div><strong>{format.format(profile.followers)}</strong><span>{t('followers')}</span></div></div><p className="api-note">{t('githubSource')}</p></> : <p>{t('githubUnavailable')}</p>}</div>
    </div>
  </section>;
}
