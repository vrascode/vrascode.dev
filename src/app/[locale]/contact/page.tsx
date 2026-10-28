import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, GitFork as Github } from 'lucide-react';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { identity } from '@/lib/identity';
import { CopyProfile } from '@/components/copy-profile';

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '/contact', t('contact'), t('contactDescription'));
}

export default async function ContactPage({ params }: PageProps) {
  await resolveLocale(params);
  const t = await getTranslations('Contact');
  return <div className="container"><header className="page-header"><p className="eyebrow">{t('label')}</p><h1>{t('title')}</h1><p>{t('body')}</p></header><div className="contact-layout"><div><div className="contact-profile"><Github size={31} strokeWidth={1.5} /><a href={identity.links.github} target="_blank" rel="noopener noreferrer" aria-label={t('profile')}><h2>github.com/vrascode</h2><p>{t('githubDescription')}</p></a><ArrowUpRight size={22} /></div><div className="hero-actions"><CopyProfile /></div></div><div className="contact-location"><p className="eyebrow">{t('locationLabel')}</p><p>{t('location')}</p><p className="role-note">{identity.name}<br />{t('role')}</p></div></div></div>;
}
