export function Brand() {
  return <span className="brand"><span className="brand-mark" aria-hidden="true">v<span>/</span></span><span>VRAS<span className="brand-code"> CODE</span></span><span className="brand-dot" aria-hidden="true" /></span>;
}

export function Monogram({ compact = false }: { compact?: boolean }) {
  return <div className={`monogram ${compact ? 'monogram-compact' : ''}`} aria-hidden="true">
    <div className="monogram-orbit orbit-one" /><div className="monogram-orbit orbit-two" />
    <svg viewBox="0 0 240 240" fill="none"><path d="M37 64H77L120 148L164 64H204L120 212L37 64Z" stroke="currentColor" strokeWidth="2" /><path d="M77 28L120 110L164 28" stroke="currentColor" strokeWidth="2" /><path d="M37 64L120 212L204 64" stroke="currentColor" strokeWidth="7" /><path d="M77 64L120 148L164 64" stroke="currentColor" strokeWidth="14" /></svg>
    <span className="monogram-caption">VRAS CODE / MS</span>
  </div>;
}
