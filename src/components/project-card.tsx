import Image from 'next/image';
import { ArrowUpRight, Boxes, PawPrint } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { Project } from '@/lib/projects';
import { Monogram } from './brand';

export function ProjectVisual({ project, locale, detail = false }: { project: Project; locale: Locale; detail?: boolean }) {
  return <div className={`project-visual visual-${project.slug} ${detail ? 'project-visual-detail' : ''}`}>
    {project.image ? <div className="screenshot-frame"><div className="window-bar" aria-hidden="true"><i /><i /><i /><span>{project.name}</span></div><Image src={project.image} width={project.slug === 'clearledger' ? 1440 : 1280} height={project.slug === 'clearledger' ? 1148 : 900} alt={project.content[locale].imageCaption} sizes={detail ? '(max-width: 800px) 100vw, 1080px' : '(max-width: 700px) 100vw, 560px'} className="project-screenshot" preload={detail} /></div>
      : <div className="project-illustration" aria-hidden="true">{project.slug === 'vras' ? <Monogram compact /> : project.slug === 'amigo-fiel' ? <><div className="illustration-ring"><PawPrint strokeWidth={1} size={86} /></div><span>amigo fiel<span className="illustration-dot">.</span></span></> : <><div className="illustration-ring"><Boxes strokeWidth={1} size={86} /></div><span>controle<span className="illustration-dot"> / </span>estoque</span></>}</div>}
  </div>;
}

export function ProjectCard({ project, locale, viewLabel }: { project: Project; locale: Locale; viewLabel: string }) {
  const copy = project.content[locale];
  return <article className="project-card" data-project={project.slug}>
    <Link href={`/projects/${project.slug}`} className="project-image-link" tabIndex={-1} aria-hidden="true"><ProjectVisual project={project} locale={locale} /><span className="visual-arrow"><ArrowUpRight size={24} /></span></Link>
    <div className="project-card-meta"><span className="mono">{project.number} / {copy.category}</span><span className={`status-dot ${project.verified ? '' : 'pending-dot'}`} aria-hidden="true" /></div>
    <h3><Link href={`/projects/${project.slug}`}>{project.name}<ArrowUpRight size={24} /></Link></h3>
    <p className="project-summary">{copy.summary}</p>
    <div className="project-tags">{project.stack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}{!project.verified && <span>{copy.status}</span>}</div>
    <Link href={`/projects/${project.slug}`} className="text-link project-view">{viewLabel}<ArrowUpRight size={15} /><span className="sr-only"> — {project.name}</span></Link>
  </article>;
}
