import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { ContactBanner } from '@/components/contact-banner';
import { Reveal } from '@/components/reveal';

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '/experience', t('experience'), t('experienceDescription'));
}

export default async function ExperiencePage({ params }: PageProps) {
  await resolveLocale(params);
  const t = await getTranslations('Experience');
  return <div className="container"><header className="page-header"><p className="eyebrow">{t('label')}</p><h1>{t('title')}</h1><p>{t('intro')}</p></header><Reveal stagger><div className="timeline page-content">
    <section className="timeline-entry" data-gsap-item><p className="timeline-date">{t('period')}</p><div><h2>{t('role')}</h2><p className="timeline-company">{t('company')}</p><p className="timeline-body">{t('employerFullName')}</p><p className="timeline-work-mode"><span>{t('workLocation')}:</span> {t('location')} · {t('modality')}</p><p className="timeline-body">{t('description')}</p><ul className="timeline-tasks">{(['task1', 'task2', 'task3', 'task4'] as const).map(task => <li key={task}>{t(task)}</li>)}</ul></div></section>
    <section className="timeline-entry" data-gsap-item><p className="timeline-date">UFT</p><div><h2>{t('academic')}</h2><p className="timeline-body">{t('academicBody')}</p><Link className="text-link" href="/projects">{t('projects')}<ArrowUpRight size={16} /></Link></div></section>
  </div></Reveal><ContactBanner /></div>;
}
