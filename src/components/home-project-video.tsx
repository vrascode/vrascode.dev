'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function HomeProjectFrame({ children, slug }: { children: ReactNode; slug: string }) {
  const reduced = useReducedMotion();
  return <motion.article className="home-project-section" data-home-project={slug} initial={{ opacity: .98, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: reduced ? 0 : .45 }}>{children}</motion.article>;
}
