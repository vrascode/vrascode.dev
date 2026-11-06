'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';
import type { Locale } from '@/i18n/routing';
import { projectVideos, recordingLimitations } from '@/lib/project-videos';
import { Link } from '@/i18n/navigation';
import { ProjectVideoPlayer } from './project-video-player';

export default function ProjectShowcaseModal({ project, locale, onClose }: { project: Project; locale: Locale; onClose: () => void }) {
  const t = useTranslations('VideoShowcase');
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const reduced = useReducedMotion();
  const copy = project.content[locale];
  const video = projectVideos[project.slug];
  const close = () => { dialog.current?.querySelector('video')?.pause(); setClosing(true); };
  useEffect(() => {
    const node = dialog.current;
    const focus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { node?.querySelector('video')?.pause(); node?.close(); document.body.style.overflow = overflow; focus?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={dialog} className="project-showcase-dialog" data-lenis-prevent aria-labelledby={`video-title-${project.slug}`} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }}>
    <motion.div className="project-showcase-panel" initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: closing ? 0 : 1, y: closing && !reduced ? 12 : 0 }} transition={{ duration: reduced ? 0 : .2 }} onAnimationComplete={() => { if (closing) onClose(); }}>
      <header className="project-showcase-header"><div><span className="eyebrow">{t('presentation')}</span><h2 id={`video-title-${project.slug}`}>{project.name}</h2><p>{copy.summary}</p></div><button autoFocus type="button" className="showcase-icon-button" aria-label={t('close')} onClick={close}><X /></button></header>
      {video ? <><ProjectVideoPlayer video={video} label={t('watch', { name: project.name })} /><p className="project-video-note">{video.environment[locale]} · {t('recorded', { date: video.recordedAt })} · {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}</p></> : <div className="project-recording-unavailable">{project.image && <Image src={project.image} alt={copy.imageCaption} width={1280} height={720} sizes="(max-width: 800px) 100vw, 1000px" />}<p><strong>{t('unavailable')}</strong><br />{recordingLimitations[project.slug]?.[locale] ?? t('notRecorded')}</p></div>}
      <div className="project-showcase-details"><section><h3>{t('features')}</h3>{copy.features.length ? <ul>{copy.features.map(f => <li key={f}>{f}</li>)}</ul> : <p>{copy.limitations}</p>}<h3>{t('technologies')}</h3><div className="project-story-stack">{project.stack.map(s => <span key={s}>{s}</span>)}</div></section><section><h3>{t('engineering')}</h3><p>{copy.architecture}</p><h3>{t('scope')}</h3><p>{copy.limitations}</p></section></div>
      <footer className="project-story-actions"><Link href={`/projects/${project.slug}`} className="button button-secondary" onClick={close}>{t('caseStudy')}<ArrowUpRight size={16} /></Link>{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">GitHub<ExternalLink size={14} /></a>}{project.liveDemo && <a className="text-link" href={project.liveDemo} target="_blank" rel="noopener noreferrer">{t('openApp')}<ExternalLink size={14} /></a>}</footer>
    </motion.div>
  </dialog>;
}
