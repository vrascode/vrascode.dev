'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { filterProjects, projects } from '@/lib/projects';
import { Reveal } from './reveal';
import { ProjectCard } from './project-card';

export function ProjectExplorer() {
  const t = useTranslations('Projects');
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = filterProjects(projects, query, category, locale);
  return <>
    <h2 className="sr-only">{t('all')}</h2>
    <div className="project-toolbar"><div className="project-filters" role="group" aria-label={t('filters')}>{(['all', 'mobile', 'fullstack', 'web'] as const).map(key => <button type="button" key={key} aria-pressed={category === key} onClick={() => setCategory(key)}>{t(key)}</button>)}</div><label className="search-field"><Search size={18} /><span className="sr-only">{t('search')}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} /></label></div>
    <p className="result-count mono" role="status">{t('results', { count: filtered.length })}</p>
    <Reveal stagger><div className="projects-grid">{filtered.map(project => <ProjectCard key={project.slug} project={project} locale={locale} viewLabel={t('view')} />)}</div></Reveal>
    {filtered.length === 0 && <div className="empty-state"><Search size={32} /><p>{t('empty')}</p><button className="button button-secondary" onClick={() => { setQuery(''); setCategory('all'); }}>{t('reset')}</button></div>}
  </>;
}
