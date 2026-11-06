'use client';

import Image from 'next/image';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ProjectVideo } from '@/lib/project-videos';

type Entry = { node: HTMLElement; ratio: number; visible: (value: boolean) => void };
type Playback = { active: string | null; register: (id: string, node: HTMLElement, visible: Entry['visible']) => () => void; activate: (id: string) => void; pauseOthers: (id: string) => void };
const PlaybackContext = createContext<Playback | null>(null);

/** A single observer arbitrates the most visible demonstration, rather than playing every card. */
export function ProjectVideoPlayback({ children }: { children: ReactNode }) {
  const entries = useRef(new Map<string, Entry>());
  const observer = useRef<IntersectionObserver | null>(null);
  const requested = useRef<{ id: string; scrollY: number } | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const register = useCallback((id: string, node: HTMLElement, visible: Entry['visible']) => {
    entries.current.set(id, { node, visible, ratio: 0 }); observer.current?.observe(node);
    return () => { observer.current?.unobserve(node); entries.current.delete(id); };
  }, []);
  const pauseOthers = useCallback((id: string) => { entries.current.forEach((entry, key) => { if (key !== id) entry.node.querySelector('video')?.pause(); }); }, []);
  const activate = useCallback((id: string) => { requested.current = { id, scrollY: window.scrollY }; setActive(id); }, []);
  useEffect(() => {
    const choose = () => {
      // Neighbour updates must not cancel an explicit play/retry gesture.
      // Resume visibility arbitration as soon as the visitor scrolls again.
      if (requested.current && (!entries.current.get(requested.current.id)?.ratio || Math.abs(window.scrollY - requested.current.scrollY) > 2)) requested.current = null;
      const candidates = [...entries.current.entries()].filter(([, entry]) => entry.ratio >= .25);
      candidates.sort((a, b) => b[1].ratio - a[1].ratio);
      setActive(document.hidden ? null : requested.current?.id ?? candidates[0]?.[0] ?? null);
    };
    let headerHeight = -1;
    const observe = () => {
      const height = Math.ceil(document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0);
      if (height === headerHeight) return;
      headerHeight = height;
      observer.current?.disconnect();
      observer.current = new IntersectionObserver(changes => {
        for (const change of changes) entries.current.forEach(entry => { if (entry.node === change.target) { entry.ratio = change.intersectionRatio; entry.visible(change.isIntersecting); } });
        choose();
      }, { threshold: [0, .01, .25, .5, .75, 1], rootMargin: `-${height}px 0px 0px 0px` });
      entries.current.forEach(entry => observer.current?.observe(entry.node));
    };
    observe();
    const onScroll = () => {
      if (requested.current && Math.abs(window.scrollY - requested.current.scrollY) > 2) {
        requested.current = null;
        choose();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', observe);
    document.addEventListener('visibilitychange', choose);
    return () => { observer.current?.disconnect(); observer.current = null; document.removeEventListener('visibilitychange', choose); window.removeEventListener('resize', observe); window.removeEventListener('scroll', onScroll); };
  }, []);
  const value = useMemo(() => ({ active, register, activate, pauseOthers }), [active, register, activate, pauseOthers]);
  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
}

function VideoPreview({ id, name, video, poster, logo = false, note, variant = 'home', aspectRatio }: { id: string; name: string; video?: ProjectVideo; poster?: string; logo?: boolean; note?: string; variant?: 'home' | 'inline'; aspectRatio?: string }) {
  const t = useTranslations('HomeShowcase');
  const { active, register, activate, pauseOthers } = useContext(PlaybackContext)!;
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const gesturePlaying = useRef<boolean | null>(null);
  const reduced = useReducedMotion();
  const [dataSaver, setDataSaver] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [failed, setFailed] = useState(false);
  const automatic = reduced === false && !dataSaver;
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const update = () => setDataSaver(Boolean(connection?.saveData));
    update(); connection?.addEventListener('change', update);
    return () => connection?.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (root.current && video) return register(id, root.current, value => { setVisible(value); if (value && automatic) setLoaded(true); });
  }, [id, video, register, automatic]);
  useEffect(() => { const node = root.current; return () => node?.querySelector('video')?.pause(); }, []);
  const shouldPlay = active === id && visible && !paused && !failed && (automatic || manual);
  useEffect(() => {
    const element = player.current;
    if (shouldPlay && loaded) { pauseOthers(id); void element?.play().catch(() => { /* A blocked autoplay leaves the poster and manual play control available. */ }); }
    else element?.pause();
  }, [shouldPlay, loaded, id, pauseOthers]);
  const toggle = () => {
    const wasPlaying = gesturePlaying.current ?? Boolean(player.current && !player.current.paused && !player.current.ended);
    gesturePlaying.current = null;
    if (wasPlaying) { setPaused(true); setManual(false); player.current?.pause(); }
    else {
      if (failed) { setFailed(false); player.current?.load(); }
      setLoaded(true); setPaused(false); setManual(true); activate(id); pauseOthers(id);
      // Retry inside the user gesture even when the autoplay predicate was already true.
      if (player.current) void player.current.play().catch(() => {});
    }
  };
  // Focusing a control can scroll the viewport and pause its player before click.
  // Preserve the operation requested at pointer/key down across that transition.
  const captureGesture = () => { gesturePlaying.current = playing; };
  const label = failed ? t('retry', { name }) : playing ? t('pause', { name }) : t('play', { name });
  return <figure className={`home-project-demo${variant === 'inline' ? ' inline-project-demo' : ''}`}>
    <div ref={root} data-video-active={active === id} className={`home-project-media${logo ? ' home-project-media-logo' : ''}`} style={aspectRatio ? { aspectRatio } : undefined}>
      {poster && <Image src={poster} alt={t('poster', { name })} fill sizes="(max-width: 900px) 100vw, 60vw" className="home-project-poster" />}
      {video && loaded && <video ref={player} src={video.src} poster={video.poster} autoPlay={shouldPlay} muted loop playsInline preload="metadata" aria-label={t('recording', { name })} className={ready && !failed ? 'is-ready' : ''} onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />}
      {video && <button type="button" className="home-video-toggle" onPointerDown={captureGesture} onPointerCancel={() => { gesturePlaying.current = null; }} onKeyDown={event => { if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) captureGesture(); }} onBlur={() => { gesturePlaying.current = null; }} onClick={toggle} aria-label={label} title={label} aria-pressed={playing}>{failed ? <RotateCcw size={17} /> : playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button>}
    </div>
    {(note || failed) && <figcaption>{failed ? <span role="status">{t('error')}</span> : note}</figcaption>}
  </figure>;
}

/** Standalone case pages get a local coordinator; collections share one observer. */
export function ProjectVideoPreview(props: Parameters<typeof VideoPreview>[0]) {
  const context = useContext(PlaybackContext);
  return context ? <VideoPreview {...props} /> : <ProjectVideoPlayback><VideoPreview {...props} /></ProjectVideoPlayback>;
}
