"use client";

import { useRef, useState } from "react";
import { testimonialContent, testimonials } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";
import { gsap, useGSAP } from "@/components/motion/gsap";
import "./Testimonials.css";

function StoryContent({ story }: { story: (typeof testimonials)[number] }) {
  return <><p className="eyebrow">Illustrative testimonial &middot; {story.context}</p><blockquote>{story.quote}</blockquote><p className="story-attribution">{story.attribution}</p></>;
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const storyElement = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);
  const pending = useRef<{ direction: number } | null>(null);
  const { contextSafe } = useGSAP(() => {
    const element = storyElement.current;
    const transition = pending.current;
    if (!element || !transition) return;
    pending.current = null;
    gsap.fromTo(element,
      { opacity: 0, x: transition.direction * 14 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity,transform", onComplete: () => { transitioning.current = false; } },
    );
  }, { scope: storyElement, dependencies: [index] });
  const story = testimonials[index];
  const move = (direction: number) => contextSafe(() => {
    if (transitioning.current) return;
    const element = storyElement.current;
    const changeStory = () => setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      changeStory();
      return;
    }
    transitioning.current = true;
    pending.current = { direction };
    gsap.to(element, { opacity: 0, x: -direction * 14, duration: 0.22, ease: "power2.in", onComplete: changeStory });
  })();
  return <section id="testimonials" className="testimonials-section page-section" style={{ background: "#20271f", color: "#e3e8de" }} tabIndex={-1} aria-labelledby="testimonials-title">
    <SectionLabel label={testimonialContent.eyebrow} number="09" />
    <h2 id="testimonials-title" className="sr-only">{testimonialContent.title}</h2>
    <div className="testimonial-layout">
      <span className="quote-mark" aria-hidden="true">&ldquo;</span>
      <div className="testimonial-stage">
        {testimonials.map((item, itemIndex) => <div className="testimonial-story testimonial-measure" key={itemIndex} aria-hidden="true"><StoryContent story={item} /></div>)}
        <div ref={storyElement} className="testimonial-story" aria-live="polite" aria-atomic="true"><StoryContent story={story} /></div>
      </div>
    </div>
    <div className="testimonial-bottom"><p className="content-disclosure">{testimonialContent.disclosure}</p><div className="testimonial-controls"><button type="button" className="round-arrow" onClick={() => move(-1)} aria-label="Previous testimonial">←</button><span aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}>0{index + 1} / 0{testimonials.length}</span><button type="button" className="round-arrow" onClick={() => move(1)} aria-label="Next testimonial">→</button></div></div>
  </section>;
}
