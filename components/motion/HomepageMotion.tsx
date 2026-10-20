"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";

export function HomepageMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const root = container.current;
    if (!root) return;
    const media = gsap.matchMedia();
    let disposed = false;
    try {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const about = root.querySelector(".about-story");
        if (about) {
          const chevrons = about.querySelectorAll(".about-chevron");
          const story = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: about.querySelector(".about-chevrons"), start: "top 90%", end: "center 45%", scrub: true, invalidateOnRefresh: true },
          });
          // Sweep across the four photos in reading order, controlled entirely by scroll.
          story.fromTo(chevrons, { opacity: 0.08, xPercent: -12 }, { opacity: 1, xPercent: 0, stagger: 0.3, duration: 0.5 }, 0);
          gsap.fromTo(about.querySelector("[data-about-heading]"), { color: "#b4b4b4" }, {
            color: "#080808", ease: "none",
            scrollTrigger: { trigger: about, start: "top 15%", end: "top -20%", scrub: true },
          });
          gsap.fromTo(about.querySelectorAll("[data-about-word]"), { color: "#b4b4b4" }, {
            color: "#080808", stagger: 0.12, ease: "none",
            scrollTrigger: { trigger: ".about-story-caption", start: "top 95%", end: "bottom 65%", scrub: true },
          });
        }
        root.querySelectorAll<HTMLElement>("[data-reveal-words]").forEach((heading) => {
          gsap.fromTo(heading.querySelectorAll("[data-word]"), { color: "#8f8f8f" }, { color: "#171717", stagger: 0.15, ease: "none", scrollTrigger: { trigger: heading, start: "top 85%", end: "bottom 45%", scrub: true } });
        });
        root.querySelectorAll<HTMLElement>("[data-uncover]").forEach((image) => {
          gsap.fromTo(image, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: image, start: "top 90%", once: true } });
        });
        const steps = root.querySelectorAll(".process-step");
        gsap.fromTo(steps, { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.16, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: ".process-steps", start: "top 85%", once: true } });
        root.querySelectorAll<HTMLElement>("[data-rule]").forEach((rule) => {
          gsap.fromTo(rule, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: rule, start: "top 90%", once: true } });
        });
        const banner = root.querySelector("[data-banner]");
        gsap.fromTo(banner, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: ".closing-title", start: "top 90%", end: "bottom 65%", scrub: true } });
      });
    } catch (error) {
      media.revert();
      console.warn("Section motion unavailable; keeping content readable.", error);
    }
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(root);
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); media.revert(); };
  }, { scope: container });
  return <div ref={container} className="homepage-content">{children}</div>;
}
