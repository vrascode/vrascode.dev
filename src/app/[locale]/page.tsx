import { getTranslations } from 'next-intl/server';
import { ArrowDown, ArrowDownRight, ArrowUpRight, BriefcaseBusiness, GitFork as GithubMark, GraduationCap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { getIdentity, identity } from '@/lib/identity';
import { pageMetadata } from '@/lib/metadata';
import { hasProfilePhoto } from '@/lib/profile-assets';
import { projects } from '@/lib/projects';
import { Monogram } from '@/components/brand';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card';
import { TechnologySection } from '@/components/technology-section';
import { GitHubSection } from '@/components/github-section';
import { ContactBanner } from '@/components/contact-banner';
import { ProfilePhoto } from '@/components/profile-photo';

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '', t('home'), getIdentity(locale).description);
}

export default async function Home({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const [t, p] = await Promise.all([getTranslations('Home'), getTranslations('Projects')]);
  const portraitAvailable = hasProfilePhoto();
  const person = getIdentity(locale);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Person', '@id': `${identity.links.portfolio}/#person`,
    name: identity.name, url: identity.links.portfolio, sameAs: [identity.links.github, identity.links.linkedin],
    jobTitle: person.role, description: person.description,
    affiliation: { '@type': 'CollegeOrUniversity', name: person.education.university },
    address: { '@type': 'PostalAddress', addressLocality: 'Palmas', addressRegion: 'Tocantins', addressCountry: 'BR' }
  };
  return <div className="container">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <section className={`hero${portraitAvailable ? ' hero-has-photo' : ''}`} aria-labelledby="hero-heading">
      <div className="hero-top"><p className="eyebrow"><span className="status-dot" />{t('eyebrow')}</p><p className="eyebrow">{t('location')}</p></div>
      <p className="hero-greeting">{person.greeting}</p>
      <h1 className="hero-heading" id="hero-heading">{person.headline}</h1>
      <p className="hero-description">{person.description}</p>
      <div className="hero-actions"><Link href="/projects" className="button button-primary">{t('projectsCta')}<ArrowUpRight size={17} /></Link><a href={identity.links.linkedin} className="button button-secondary" target="_blank" rel="noopener noreferrer"><span>{t('linkedinCta')}</span><ArrowUpRight size={16} /></a><a href={identity.links.github} className="button button-secondary" target="_blank" rel="noopener noreferrer"><GithubMark size={16} /><span>{t('githubCta')}</span><ArrowUpRight size={16} /></a><Link href="/contact" className="button button-secondary"><span>{t('contactCta')}</span><ArrowUpRight size={16} /></Link></div>
      <div className="hero-art">{portraitAvailable ? <ProfilePhoto alt={t('photoAvailable')} className="profile-photo-home" preload /> : <Monogram />}</div>
      <div className="hero-bottom"><a href="#selected-work" className="mono"><ArrowDown size={13} />{t('scroll')}</a><p className="mono">{t('note')}</p></div>
    </section>
    <section className="section" id="selected-work"><Reveal><SectionHeading label={t('workLabel')} title={t('workTitle')} description={t('workDescription')}><Link href="/projects" className="text-link">{t('allProjects')}<ArrowUpRight size={16} /></Link></SectionHeading><div className="projects-grid">{projects.slice(0, 2).map(project => <ProjectCard key={project.slug} project={project} locale={locale} viewLabel={p('view')} />)}</div></Reveal></section>
    <section className="section" id="about"><Reveal className="about-grid"><div><p className="eyebrow">{t('aboutLabel')}</p><h2 className="section-title">{t('aboutTitle')}</h2><div className="about-facts"><div className="fact-row"><GraduationCap size={22} strokeWidth={1.4} /><div><h3>{t('education')}</h3><p>{t('educationNote')}</p></div></div><div className="fact-row"><BriefcaseBusiness size={21} strokeWidth={1.4} /><div><h3>{t('experience')}</h3><p>{t('experienceNote')}</p></div></div></div></div><div className="about-copy"><p>{t('aboutDescription')}</p><p>{t('aboutSecond')}</p><Link href="/about" className="text-link">{t('moreAbout')}<ArrowDownRight size={17} /></Link></div></Reveal></section>
    <TechnologySection /><GitHubSection /><ContactBanner />
  </div>;
}
