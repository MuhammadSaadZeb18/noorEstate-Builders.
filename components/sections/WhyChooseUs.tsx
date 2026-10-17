import { whyContent } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";

export function WhyChooseUs() {
  return <section id="why-us" className="why-section page-section" tabIndex={-1} aria-labelledby="why-title">
    <SectionLabel label={whyContent.eyebrow} number="02" />
    <h2 id="why-title" className="why-statement" data-reveal-words>{whyContent.title.split(" ").map((word, index) => <span data-word key={index}>{word}{" "}</span>)}</h2>
    <div className="why-bottom">
      <video
        aria-label="Margalla Enclave Underpass — Noor Estate & Builders"
        style={{ display: "block", width: "100%", aspectRatio: "16 / 9", background: "#20271f", objectFit: "contain" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={whyContent.videoSrc} type="video/mp4" />
        <a href={whyContent.videoSrc}>Watch the Margalla Enclave Underpass video</a>
      </video>
    </div>
  </section>;
}
