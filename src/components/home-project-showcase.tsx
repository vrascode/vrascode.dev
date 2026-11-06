import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getPublishedProjects } from '@/lib/projects';
import { homeProjectVideos } from '@/lib/project-videos';
import { HomeProjectFrame, HomeProjectVideo, HomeVideoPlayback } from './home-project-video';

export async function HomeProjectShowcase({ locale }: { locale: Locale }) {
  const t = await getTranslations('HomeShowcase');
  return <HomeVideoPlayback><div className="home-project-sections">{getPublishedProjects().map(project => {
    const copy = project.content[locale];
    const video = homeProjectVideos[project.slug];
    return <HomeProjectFrame key={project.slug} slug={project.slug}>
      <div className="home-project-copy">
        <p className="eyebrow">{copy.category}</p>
        <h3><Link href={`/projects/${project.slug}`}>{project.name}<ArrowUpRight size={24} aria-hidden="true" /></Link></h3>
        <p className="home-project-summary">{copy.summary}</p>
      </div>
      <HomeProjectVideo id={project.slug} name={project.name} video={video} poster={video?.poster ?? project.image} logo={project.imagePresentation === 'logo' && !video} note={video ? video.environment[locale] : project.slug === 'amigo-fiel' ? t('noDarkRecording') : t('unavailableRecording')} />
      <div className="home-project-details">
        <div className="home-project-context"><h4>{t('context')}</h4><p>{copy.overview}</p></div>
        {project.highlights && <dl className="home-project-highlights">{project.highlights[locale].map(item => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}</dl>}
        {copy.features.length > 0 && <ul className="home-project-features">{copy.features.slice(0, 3).map(feature => <li key={feature}>{feature}</li>)}</ul>}
        <div className="home-project-stack" aria-label={t('technologies')}>{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
        <nav className="home-project-links" aria-label={t('links', { name: project.name })}><Link href={`/projects/${project.slug}`} className="text-link">{t('viewProject')}<ArrowUpRight size={16} /></Link>{project.repository && <a href={project.repository} className="text-link" target="_blank" rel="noopener noreferrer">GitHub<ExternalLink size={14} /></a>}{project.liveDemo && <a href={project.liveDemo} className="text-link" target="_blank" rel="noopener noreferrer">{t('openApp')}<ExternalLink size={14} /></a>}</nav>
      </div>
    </HomeProjectFrame>;
  })}</div></HomeVideoPlayback>;
}
