'use client';

import { useState, type CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, ExternalLink, Search } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { filterProjects, projects } from '@/lib/projects';
import { Reveal } from './reveal';
import { ProjectInteractiveShowcase } from './project-interactive-showcase';
import type { ShowcaseLabels } from './project-interactive-showcase';
import { Link } from '@/i18n/navigation';

export function ProjectExplorer() {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = filterProjects(projects, query, category, locale);
  const labels: ShowcaseLabels = {
    zoom: t('zoom'), close: t('close'), previous: t('previous'), next: t('nextImage'),
    sample: t('sample'), demoTitle: t('demoTitle'), demoIntro: t('demoIntro'),
    orders: t('orders'), payments: t('payments'), deposits: t('deposits'),
    discrepancies: t('discrepancies'), results: t('demoResults'), run: t('run'), reset: t('resetDemo'),
    order: t('order'), amount: t('amount'), state: t('state'), matched: t('matched'),
    pending: t('pending'), difference: t('difference'), demoNotice: t('demoNotice'), slide: t('slide')
  };

  return <>
    <h2 className="sr-only">{t('all')}</h2>
    <div className="project-toolbar"><div className="project-filters" role="group" aria-label={t('filters')}>{(['all', 'mobile', 'fullstack', 'web'] as const).map(key => <button type="button" key={key} aria-pressed={category === key} onClick={() => setCategory(key)}>{t(key)}</button>)}</div><label className="search-field"><Search size={18} /><span className="sr-only">{t('search')}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} /></label></div>
    <p className="result-count mono" role="status">{t('results', { count: filtered.length })}</p>
    <Reveal stagger className="project-stories">{filtered.map((project, index) => {
      const copy = project.content[locale];
      return <article className="project-story" data-project={project.slug} data-gsap-item key={project.slug} style={{ '--story-index': index } as CSSProperties}>
        <div className="project-story-inner">
          <div className="project-story-copy">
            <div className="project-story-meta"><span className="mono">{project.number} / {copy.category}</span><span className="project-state"><i className={`status-dot ${project.verified ? '' : 'pending-dot'}`} aria-hidden="true" />{copy.status}</span></div>
            <h2><Link href={`/projects/${project.slug}`}>{project.name}<ArrowUpRight size={24} aria-hidden="true" /></Link></h2>
            <p className="project-story-summary">{copy.summary}</p>
            <div className="project-story-context"><span className="eyebrow">{t('context')}</span><p>{copy.overview}</p></div>
            {project.highlights && <div className="project-highlights" aria-label={t('highlights')}>{project.highlights[locale].map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>}
            {copy.features.length > 0 && <ul className="project-story-features">{copy.features.slice(0, 3).map(feature => <li key={feature}>{feature}</li>)}</ul>}
            <div className="project-story-stack" aria-label={t('stack')}>{project.stack.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="project-story-actions"><Link href={`/projects/${project.slug}`} className="text-link">{t('openCase')}<ArrowUpRight size={15} /></Link>{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">{t('repository')}<ExternalLink size={14} /></a>}{project.liveDemo && <a className="text-link" href={project.liveDemo} target="_blank" rel="noopener noreferrer">{t('openWebsite')}<ExternalLink size={14} /></a>}</div>
          </div>
          <div className="project-story-media"><ProjectInteractiveShowcase project={project} locale={locale} editorial preload={index === 0} labels={labels} /><p className="image-caption">{copy.imageCaption}</p></div>
        </div>
      </article>;
    })}</Reveal>
    {filtered.length === 0 && <div className="empty-state"><Search size={32} /><p>{t('empty')}</p><button className="button button-secondary" onClick={() => { setQuery(''); setCategory('all'); }}>{t('reset')}</button></div>}
  </>;
}
