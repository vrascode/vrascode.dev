import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { Monogram } from '@/components/brand';
import { TechnologySection } from '@/components/technology-section';
import { ContactBanner } from '@/components/contact-banner';
import { ProfilePhoto } from '@/components/profile-photo';
import { hasProfilePhoto, hasResume, resumePath } from '@/lib/profile-assets';
import { Link } from '@/i18n/navigation';
import { projects } from '@/lib/projects';

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '/about', t('about'), t('aboutDescription'));
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('About');
  const home = await getTranslations('Home');
  const portraitAvailable = hasProfilePhoto();
  const resumeAvailable = hasResume();
  const academicProjects = [{ project: projects[3], period: t('semester2025') }, { project: projects[4], period: t('semester2026') }];
  return <div className="container"><header className="page-header"><p className="eyebrow">{t('label')}</p><h1>{t('title')}</h1></header>
    <div className="bio-layout"><div className="bio-copy"><p>{t('intro')}</p><p>{t('body')}</p><p>{t('body2')}</p>{resumeAvailable && <a className="button button-secondary" href={resumePath} download>{home('resumeCta')}<ArrowUpRight size={15} /></a>}</div><div className="bio-mark">{portraitAvailable ? <ProfilePhoto alt={t('photoAlt')} className="profile-photo-about" /> : <Monogram />}</div></div>
    <section className="section" id="education"><p className="eyebrow">{t('journeyLabel')}</p><h2 className="section-title">{t('journeyTitle')}</h2><p className="section-description">{t('journeyDescription')}</p><div className="academic-snapshot"><div><GraduationCap size={23} aria-hidden="true" /><div><h3>{t('degree')}</h3><p>{t('university')}</p><p>{t('location')}</p></div></div><span className="education-status"><span className="status-dot" />{t('journeyCurrent')}</span></div><div className="education-progress"><div><p className="eyebrow">{t('progressLabel')}</p><p>{t('progressNote')}</p></div><span className="academic-data-pending">{t('semesterPending')}</span></div><div className="timeline academic-timeline">{academicProjects.map(({ project, period }) => <article className="timeline-entry" key={project.slug}><p className="timeline-date">{period}</p><div><h3 className="academic-project-title">{project.name}</h3><p className="timeline-body">{project.content[locale].overview}</p><Link href={`/projects/${project.slug}`} className="text-link">{t('projectLink')}<ArrowUpRight size={15} /></Link></div></article>)}</div><div className="academic-interests"><p className="eyebrow">{t('softwareInterest')}</p><p>{t('softwareInterestBody')}</p></div></section>
    <section className="section"><h2 className="section-title">{t('approach')}</h2><div className="principles-grid">{([1, 2, 3] as const).map(n => <div key={n}><span className="mono">0{n}</span><h3>{t(`principle${n}`)}</h3><p>{t(`principle${n}Body`)}</p></div>)}</div></section>
    <TechnologySection /><ContactBanner />
  </div>;
}
