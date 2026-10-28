import { getTranslations } from 'next-intl/server';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { ProjectExplorer } from '@/components/project-explorer';
import { ContactBanner } from '@/components/contact-banner';

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '/projects', t('projects'), t('projectsDescription'));
}

export default async function ProjectsPage({ params }: PageProps) {
  await resolveLocale(params);
  const t = await getTranslations('Projects');
  return <div className="container"><header className="page-header"><p className="eyebrow">{t('label')}</p><h1>{t('title')}</h1><p>{t('description')}</p></header><section className="page-content" aria-label={t('all')}><ProjectExplorer /></section><ContactBanner /></div>;
}
