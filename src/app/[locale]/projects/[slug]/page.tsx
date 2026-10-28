import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowUpRight, GitFork as Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { resolveLocale } from '@/lib/locale';
import { getProject, projects } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';
import { ProjectVisual } from '@/components/project-card';

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata(locale, `/projects/${project.slug}`, project.name, project.content[locale].summary);
}

export default async function ProjectDetail({ params }: Props) {
  const locale = await resolveLocale(params);
  const project = getProject((await params).slug);
  if (!project) notFound();
  const t = await getTranslations('Projects');
  const copy = project.content[locale];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <article className="container page-content">
    <header className="page-header project-detail-header"><Link href="/projects" className="text-link"><ArrowLeft size={15} />{t('back')}</Link><p className="eyebrow">{project.number} / {copy.category}</p><h1>{project.name}</h1><p>{copy.summary}</p>{project.repository && <div className="hero-actions"><a className="button button-primary" href={project.repository} target="_blank" rel="noopener noreferrer"><Github size={16} />{t('repository')}<ArrowUpRight size={16} /></a></div>}</header>
    <figure><ProjectVisual project={project} locale={locale} detail /><figcaption className="image-caption">{project.image ? copy.imageCaption : `${t('illustration')}. ${copy.imageCaption}`}</figcaption></figure>
    <div className="detail-layout"><div className="detail-body">
      <section><h2>{t('overview')}</h2><p>{copy.overview}</p></section>
      {copy.features.length > 0 && <section><h2>{t('features')}</h2><ul>{copy.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>}
      <section><h2>{t('architecture')}</h2><p>{copy.architecture}</p></section>
      <section><h2>{t('contribution')}</h2><p>{copy.contribution}</p></section>
      <section><h2>{t('verification')}</h2><p>{copy.verification}</p></section>
      <section><h2>{t('limitations')}</h2><p>{copy.limitations}</p></section>
    </div><aside className="detail-sidebar"><div><h2>{t('status')}</h2><p>{copy.status}</p></div>{project.stack.length > 0 && <div><h2>{t('stack')}</h2><div className="project-tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div></div>}{project.sources.length > 0 && <div><h2>{t('sources')}</h2><div className="source-links">{project.sources.map(source => <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>{source.label}<ArrowUpRight size={14} /></a>)}</div></div>}</aside></div>
    <Link href={`/projects/${next.slug}`} className="next-project"><div><span className="eyebrow">{t('next')} / {next.number}</span><strong>{next.name}</strong></div><ArrowUpRight size={30} /></Link>
  </article>;
}
