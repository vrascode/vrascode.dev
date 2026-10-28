'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Play, RotateCcw, X, ZoomIn } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import type { Project } from '@/lib/projects';
import { ProjectVisual } from './project-card';

type Props = { project: Project; locale: Locale; detail?: boolean; labels: ShowcaseLabels };
export type ShowcaseLabels = {
  zoom: string; close: string; previous: string; next: string; sample: string;
  demoTitle: string; demoIntro: string; orders: string; payments: string; deposits: string;
  discrepancies: string; results: string; run: string; reset: string; order: string;
  amount: string; state: string; matched: string; pending: string; difference: string;
  demoNotice: string; slide: string;
};

const reconciliationSample = {
  orders: [
    { id: 'ORD-2041', amount: 'R$ 142,90', state: 'ready' },
    { id: 'ORD-2042', amount: 'R$ 89,00', state: 'ready' },
    { id: 'ORD-2043', amount: 'R$ 210,00', state: 'ready' }
  ],
  payments: [
    { id: 'PAY-7781', amount: 'R$ 142,90', state: 'ready' },
    { id: 'PAY-7782', amount: 'R$ 85,00', state: 'ready' },
    { id: 'PAY-7783', amount: 'R$ 210,00', state: 'ready' }
  ],
  deposits: [
    { id: 'DEP-3301', amount: 'R$ 142,90', state: 'ready' },
    { id: 'DEP-3302', amount: 'R$ 85,00', state: 'ready' },
    { id: 'DEP-3303', amount: 'R$ 210,00', state: 'ready' }
  ]
} as const;
type SampleTab = keyof typeof reconciliationSample | 'discrepancies' | 'results';

export function ProjectInteractiveShowcase({ project, locale, detail = false, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<SampleTab>('orders');
  const [hasRun, setHasRun] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const showcase = project.showcase;
  const gallery = showcase.mode === 'gallery' ? showcase.images : [];
  const imagePath = gallery[activeImage]?.src ?? project.image;
  const imageAlt = gallery[activeImage]?.alt[locale] ?? project.content[locale].imageCaption;
  const runDemo = () => { setHasRun(true); setActiveTab('results'); };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isZoomed && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!isZoomed && dialog.open) dialog.close();
  }, [isZoomed]);

  return <div className={`interactive-showcase ${detail ? 'interactive-showcase-detail' : ''}`} data-showcase-mode={showcase.mode}>
    {showcase.mode === 'gallery' ? <div className="showcase-gallery">
      <div className="showcase-gallery-media">
        <Image src={imagePath!} alt={imageAlt} fill sizes={detail ? '(max-width: 800px) 100vw, 1080px' : '(max-width: 800px) 100vw, 58vw'} className="showcase-gallery-image" priority={detail} />
        <button type="button" className="showcase-zoom" onClick={() => setIsZoomed(true)} aria-label={labels.zoom}><ZoomIn size={17} /></button>
      </div>
      <div className="showcase-controls">
        <button type="button" className="showcase-icon-button" aria-label={labels.previous} onClick={() => setActiveImage((activeImage + gallery.length - 1) % gallery.length)}><ArrowLeft size={17} /></button>
        <span className="mono">{activeImage + 1} {labels.slide} {gallery.length}</span>
        <button type="button" className="showcase-icon-button" aria-label={labels.next} onClick={() => setActiveImage((activeImage + 1) % gallery.length)}><ArrowRight size={17} /></button>
      </div>
    </div> : showcase.mode === 'video' ? <div className="showcase-video">
      <video controls playsInline preload="metadata" poster={showcase.poster} aria-label={showcase.alt[locale]}><source src={showcase.src} type="video/mp4" /></video>
    </div> : showcase.mode === 'comparison' ? <div className="showcase-comparison">
      {[showcase.before, showcase.after].map((item, index) => <figure key={item.src}><Image src={item.src} alt={item.alt[locale]} width={1200} height={675} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>{index === 0 ? labels.previous : labels.next}</figcaption></figure>)}
    </div> : <>
        <div className="showcase-image-wrap">
        <ProjectVisual project={{ ...project, image: imagePath }} locale={locale} detail={detail} />
          {imagePath && project.imagePresentation !== 'icon' && <button type="button" className="showcase-zoom" onClick={() => setIsZoomed(true)} aria-label={labels.zoom}><ZoomIn size={17} /></button>}
      </div>
      {showcase.mode === 'demo' && showcase.demoId === 'clearledger' && <section className="reconciliation-demo" aria-label={labels.demoTitle}>
        <div className="reconciliation-demo-heading"><div><span className="eyebrow">{labels.sample}</span><h3>{labels.demoTitle}</h3><p>{labels.demoIntro}</p></div><span className="demo-state"><span aria-hidden="true" />{hasRun ? labels.results : labels.pending}</span></div>
        <div className="demo-notice">{labels.demoNotice}</div>
        <div className="demo-tabs" role="tablist" aria-label={labels.demoTitle}>
          {(['orders', 'payments', 'deposits', 'discrepancies', 'results'] as const).map(tab => <button type="button" role="tab" aria-selected={activeTab === tab} key={tab} onClick={() => setActiveTab(tab)}>{labels[tab]}</button>)}
        </div>
        {activeTab === 'results' ? <div className="demo-result-panel" role="tabpanel" aria-live="polite">
          {hasRun ? <><div className="demo-result-icon"><Check size={18} /></div><div><strong>{locale === 'pt' ? '2 registros conciliados' : '2 records matched'}</strong><p>{locale === 'pt' ? '1 divergência identificada para análise' : '1 discrepancy identified for review'}</p></div><span className="demo-difference">− R$ 4,00</span></> : <><div className="demo-result-icon"><Play size={16} /></div><div><strong>{locale === 'pt' ? 'Aguardando execução' : 'Ready to run'}</strong><p>{locale === 'pt' ? 'Execute a amostra para visualizar o resultado.' : 'Run the sample to see its result.'}</p></div></>}
        </div> : activeTab === 'discrepancies' ? <div className="demo-result-panel" role="tabpanel"><div className="demo-difference-mark">!</div><div><strong>{locale === 'pt' ? 'ORD-2042 · valor divergente' : 'ORD-2042 · amount mismatch'}</strong><p>{locale === 'pt' ? 'Pedido: R$ 89,00 · pagamento: R$ 85,00' : 'Order: R$ 89.00 · payment: R$ 85.00'}</p></div><span className="demo-difference">− R$ 4,00</span></div> : <div className="demo-table" role="tabpanel"><div className="demo-table-head"><span>{labels.order}</span><span>{labels.amount}</span><span>{labels.state}</span></div>{reconciliationSample[activeTab].map(row => <div className="demo-table-row" key={row.id}><span>{row.id}</span><span>{row.amount}</span><span><i aria-hidden="true" />{labels.matched}</span></div>)}</div>}
        <div className="demo-actions"><span className="mono">{labels.sample}</span><button type="button" className="button button-secondary" onClick={hasRun ? () => { setHasRun(false); setActiveTab('orders'); } : runDemo}>{hasRun ? <RotateCcw size={15} /> : <Play size={15} />}{hasRun ? labels.reset : labels.run}</button></div>
      </section>}
    </>}

    {isZoomed && imagePath && project.imagePresentation !== 'icon' && <dialog ref={dialogRef} className="showcase-lightbox" aria-label={imageAlt} onClose={() => setIsZoomed(false)} onClick={event => { if (event.target === event.currentTarget) setIsZoomed(false); }}>
      <button ref={closeButtonRef} type="button" className="showcase-lightbox-close" aria-label={labels.close} onClick={() => setIsZoomed(false)}><X size={20} /></button>
      <div className="showcase-lightbox-image"><Image src={imagePath} alt={imageAlt} fill sizes="100vw" /></div>
    </dialog>}
  </div>;
}
