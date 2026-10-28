'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function updateProgress() {
  const root = document.documentElement;
  const maximum = root.scrollHeight - window.innerHeight;
  const progress = maximum > 0 ? window.scrollY / maximum : 0;
  root.style.setProperty('--scroll-progress', String(Math.min(1, Math.max(0, progress))));
}

export function SmoothScroll() {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let onScroll: (() => void) | undefined;
    let progressFrame = 0;
    const scheduleProgress = () => {
      if (progressFrame) return;
      progressFrame = requestAnimationFrame(() => {
        progressFrame = 0;
        updateProgress();
      });
    };

    const start = (): (() => void) | undefined => {
      lenis?.destroy();
      lenis = undefined;
      if (motionQuery.matches) {
        root.dataset.scrollEngine = 'native';
        updateProgress();
        return;
      }

      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const lowPowerDevice = (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) || connection?.saveData;
      if (lowPowerDevice) {
        root.dataset.scrollEngine = 'native';
        updateProgress();
        return;
      }

      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -96 },
        lerp: 0.09
      });
      root.dataset.scrollEngine = 'lenis';
      onScroll = () => { ScrollTrigger.update(); scheduleProgress(); };
      lenis.on('scroll', onScroll);

      const tick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        if (onScroll) lenis?.off('scroll', onScroll);
        lenis?.destroy();
        lenis = undefined;
      };
    };

    let stop = start();
    const handleMotionChange = () => {
      stop?.();
      stop = start();
    };
    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress, { passive: true });
    updateProgress();

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
      if (progressFrame) cancelAnimationFrame(progressFrame);
      stop?.();
      delete root.dataset.scrollEngine;
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      updateProgress();
    });
    return () => cancelAnimationFrame(frame);
  }, [locale, pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
