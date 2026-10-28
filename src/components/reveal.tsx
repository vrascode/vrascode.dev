'use client';

import { motion, useReducedMotion } from 'motion/react';

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [14, 0], opacity: [0.75, 1] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, ease: 'easeOut' }}>{children}</motion.div>;
}
