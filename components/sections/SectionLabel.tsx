export function SectionLabel({ label, number }: { label: string; number: string }) {
  return <div className="section-intro"><p className="eyebrow"><span className="section-dot" />{label}</p><span className="section-number" aria-hidden="true">({number})</span></div>;
}
