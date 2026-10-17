import { faqs } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";

export function FAQs() {
  return <section id="faqs" className="faq-section page-section" tabIndex={-1} aria-labelledby="faq-title">
    <SectionLabel label="A little clarity" number="10" />
    <div className="faq-layout"><div><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2><p>A few things you might be wondering, before you take the next step.</p></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} name="homepage-faq"><summary><span className="faq-number">0{index + 1}</span><span>{faq.question}</span><span className="faq-symbol" aria-hidden="true">+</span></summary><div className="faq-answer"><p>{faq.answer}</p></div></details>)}</div></div>
  </section>;
}
