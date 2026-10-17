import { processContent } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";

export function Process() {
  return <section id="process" className="process-section page-section" tabIndex={-1} aria-labelledby="process-title">
    <SectionLabel label={processContent.eyebrow} number="06" />
    <div className="process-layout"><div className="process-intro"><h2 id="process-title">{processContent.title[0]}<br /><span>{processContent.title[1]}</span></h2><p>{processContent.description}</p><a href="#contact" className="editorial-link">Start with a conversation<span aria-hidden="true">↗</span></a></div>
      <ol className="process-steps">{processContent.steps.map((step) => <li className="process-step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    </div>
  </section>;
}
