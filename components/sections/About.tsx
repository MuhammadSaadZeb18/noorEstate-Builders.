import Image from "next/image";
import { aboutContent } from "@/data/homepage";

export function About() {
  return <section id="about" className="about about-story" tabIndex={-1} aria-labelledby="about-title">
    <h2 id="about-title" className="about-story-title">
      {aboutContent.headingLead}{" "}<span data-about-heading>{aboutContent.headingRest}</span>
    </h2>
    <div className="about-chevrons">
      {aboutContent.images.map((image) => <div className="about-chevron" key={image.src}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 32vw, (max-width: 1400px) 25vw, 350px" />
      </div>)}
    </div>
    <p className="about-story-caption">
      {aboutContent.caption.map((line, index) => <span className="about-caption-line" key={index}>
        {line.split(" ").map((word, wordIndex) => <span data-about-word key={wordIndex}>{word}{" "}</span>)}
      </span>)}
    </p>
  </section>;
}
