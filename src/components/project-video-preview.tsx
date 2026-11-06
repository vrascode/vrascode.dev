'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play, PanelsTopLeft } from 'lucide-react';
import type { Project } from '@/lib/projects';
import type { Locale } from '@/i18n/routing';
import { projectVideos } from '@/lib/project-videos';

const ProjectShowcaseModal = dynamic(() => import('./project-showcase-modal'), { ssr: false });

export function ProjectVideoPreview({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations('VideoShowcase');
  const video = projectVideos[project.slug];
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const playing = hovered && visible && !open && !failed;
  useEffect(() => {
    const element = player.current;
    // Normal pointer/viewport changes can abort a pending play request.
    // Media errors use onError; an interrupted autoplay keeps the poster available.
    if (playing) { void element?.play().catch(() => {}); }
    else if (element) { element.pause(); element.currentTime = 0; }
    const hide = () => { if (document.hidden) { element?.pause(); setHovered(false); } };
    document.addEventListener('visibilitychange', hide);
    return () => { element?.pause(); document.removeEventListener('visibilitychange', hide); };
  }, [playing]);
  return <div ref={root} className={`project-video-preview ${playing && ready ? 'is-playing' : ''}`} onPointerEnter={e => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (video && e.pointerType === 'mouse' && !connection?.saveData && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLoaded(true); setHovered(true); }
  }} onPointerLeave={() => setHovered(false)}>
    {video && loaded && <video ref={player} className="project-hover-video" src={video.src} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} onLoadedData={() => setReady(true)} onError={() => setFailed(true)} />}
    <button type="button" className="project-preview-button" onClick={() => { setHovered(false); setOpen(true); }} aria-label={video ? t('watch', { name: project.name }) : t('explore', { name: project.name })}><span className="project-preview-label">{video ? <Play size={18} fill="currentColor" /> : <PanelsTopLeft size={18} />}<span>{video ? t('preview') : t('presentation')}</span>{video && <small>{Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}</small>}</span></button>
    {open && <ProjectShowcaseModal project={project} locale={locale} onClose={() => setOpen(false)} />}
  </div>;
}
