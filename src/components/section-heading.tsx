export function SectionHeading({ label, title, description, children }: { label: string; title: string; description?: string; children?: React.ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{children}</div>;
}
