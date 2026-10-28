'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = '', stagger = false }: { children: React.ReactNode; className?: string; stagger?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = stagger ? element.querySelectorAll<HTMLElement>('[data-gsap-item]') : element;
    if (stagger && element.querySelectorAll('[data-gsap-item]').length === 0) return;

    const context = gsap.context(() => {
      gsap.fromTo(targets,
        { opacity: 0.98, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        }
      );
    }, element);

    return () => context.revert();
  }, [stagger]);

  return <div ref={root} className={className}>{children}</div>;
}

export function HeroEntrance({ children, className = '', ...sectionProps }: React.ComponentPropsWithoutRef<'section'>) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const items = element.querySelectorAll('.hero-top, .hero-greeting, .hero-heading, .hero-description, .hero-actions, .hero-socials, .hero-art');
      gsap.fromTo(items, { opacity: 0.98, y: 16 }, { opacity: 1, y: 0, duration: 0.72, ease: 'power2.out', stagger: 0.09, delay: 0.08 });
      const art = element.querySelector('.hero-art');
      if (art && window.innerWidth > 760) {
        gsap.to(art, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: element, start: 'top top', end: 'bottom top', scrub: 0.6 } });
      }
    }, element);

    return () => context.revert();
  }, []);

  return <section ref={root} className={className} {...sectionProps}>{children}</section>;
}
