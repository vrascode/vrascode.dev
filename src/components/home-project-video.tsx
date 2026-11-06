'use client';

import Image from 'next/image';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ProjectVideo } from '@/lib/project-videos';

type Entry = { node: HTMLElement; ratio: number; visible: (value: boolean) => void };
type Playback = { active: string | null; register: (id: string, node: HTMLElement, visible: Entry['visible']) => () => void; activate: (id: string) => void; pauseOthers: (id: string) => void };
const PlaybackContext = createContext<Playback | null>(null);

/** A single observer arbitrates the most visible demonstration, rather than playing every card. */
export function HomeVideoPlayback({ children }: { children: ReactNode }) {
  const entries = useRef(new Map<string, Entry>());
  const observer = useRef<IntersectionObserver | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const register = useCallback((id: string, node: HTMLElement, visible: Entry['visible']) => {
    entries.current.set(id, { node, visible, ratio: 0 }); observer.current?.observe(node);
    return () => { observer.current?.unobserve(node); entries.current.delete(id); };
  }, []);
  const pauseOthers = useCallback((id: string) => { entries.current.forEach((entry, key) => { if (key !== id) entry.node.querySelector('video')?.pause(); }); }, []);
  useEffect(() => {
    const choose = () => {
      const candidates = [...entries.current.entries()].filter(([, entry]) => entry.ratio >= .25);
      candidates.sort((a, b) => b[1].ratio - a[1].ratio);
      setActive(document.hidden ? null : candidates[0]?.[0] ?? null);
    };
    observer.current = new IntersectionObserver(changes => {
      for (const change of changes) entries.current.forEach(entry => { if (entry.node === change.target) { entry.ratio = change.intersectionRatio; entry.visible(change.isIntersecting); } });
      choose();
    }, { threshold: [0, .01, .25, .5, .75, 1] });
    entries.current.forEach(entry => observer.current?.observe(entry.node));
    document.addEventListener('visibilitychange', choose);
    return () => { observer.current?.disconnect(); observer.current = null; document.removeEventListener('visibilitychange', choose); };
  }, []);
  const value = useMemo(() => ({ active, register, activate: setActive, pauseOthers }), [active, register, pauseOthers]);
  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
}

export function HomeProjectFrame({ children, slug }: { children: ReactNode; slug: string }) {
  const reduced = useReducedMotion();
  return <motion.article className="home-project-section" data-home-project={slug} initial={{ opacity: .98, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: reduced ? 0 : .45 }}>{children}</motion.article>;
}

export function HomeProjectVideo({ id, name, video, poster, logo = false, note }: { id: string; name: string; video?: ProjectVideo; poster?: string; logo?: boolean; note: string }) {
  const t = useTranslations('HomeShowcase');
  const { active, register, activate, pauseOthers } = useContext(PlaybackContext)!;
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
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
  const shouldPlay = active === id && visible && !paused && !failed && (automatic || manual);
  useEffect(() => {
    const element = player.current;
    if (shouldPlay && loaded) { pauseOthers(id); void element?.play().catch(() => { /* A blocked autoplay leaves the poster and manual play control available. */ }); }
    else element?.pause();
    return () => element?.pause();
  }, [shouldPlay, loaded, id, pauseOthers]);
  const toggle = () => {
    if (playing) { setPaused(true); setManual(false); player.current?.pause(); }
    else {
      if (failed) { setFailed(false); player.current?.load(); }
      setLoaded(true); setPaused(false); setManual(true); activate(id); pauseOthers(id);
      // Retry inside the user gesture even when the autoplay predicate was already true.
      if (player.current) void player.current.play().catch(() => {});
    }
  };
  const label = failed ? t('retry', { name }) : playing ? t('pause', { name }) : t('play', { name });
  return <figure className="home-project-demo">
    <div ref={root} className={`home-project-media${logo ? ' home-project-media-logo' : ''}`}>
      {poster && <Image src={poster} alt={t('poster', { name })} fill sizes="(max-width: 900px) 100vw, 60vw" className="home-project-poster" />}
      {video && loaded && <video ref={player} src={video.src} poster={video.poster} autoPlay={shouldPlay} muted loop playsInline preload="metadata" aria-label={t('recording', { name })} className={ready && !failed ? 'is-ready' : ''} onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />}
      {video && <button type="button" className="home-video-toggle" onClick={toggle} aria-label={label} title={label} aria-pressed={playing}>{failed ? <RotateCcw size={17} /> : playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button>}
    </div>
    <figcaption>{failed ? <span role="status">{t('error')}</span> : note}</figcaption>
  </figure>;
}
