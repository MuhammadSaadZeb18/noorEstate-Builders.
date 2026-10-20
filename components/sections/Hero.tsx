"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

const sky = "/images/hero/reference-sky.webp";
const house = "/images/hero/reference-house.webp";
const cloud = "/images/hero/reference-cloud.webp";
const smoke = "/images/hero/reference-smoke.webp";

function LogoText({ outline = false }: { outline?: boolean }) {
  return <g data-hero-logo textAnchor="middle" fontFamily="var(--font-instrument-sans), Arial, sans-serif" fontWeight="700" fill={outline ? "none" : "black"} stroke={outline ? "white" : "none"} strokeWidth="1.5">
    <text className="hero-logo-main" x="50%" y="56%">{site.shortName}</text>
    <text className="hero-logo-tagline" x="50%" y="66%" lengthAdjust="spacingAndGlyphs">Estate &amp; Builders</text>
  </g>;
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const maskId = useId().replaceAll(":", "");

  useGSAP(() => {
    const root = section.current;
    if (!root) return;
    const media = gsap.matchMedia();
    let disposed = false;
    const fitLogoLines = () => {
      root.querySelectorAll("[data-hero-logo]").forEach((logo) => {
        const main = logo.querySelector<SVGTextElement>(".hero-logo-main");
        const tagline = logo.querySelector<SVGTextElement>(".hero-logo-tagline");
        if (!main || !tagline) return;
        // Match both lines exactly, including after font loading and viewport changes.
        tagline.setAttribute("textLength", String(main.getComputedTextLength()));
        const fontSize = parseFloat(getComputedStyle(tagline).fontSize);
        tagline.setAttribute("y", String(main.y.baseVal.getItem(0).value + fontSize * 1.02));
      });
    };
    fitLogoLines();
    window.addEventListener("resize", fitLogoLines);
    try {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate the copy's children on arrival; scrolling owns the parent transform.
        if (window.scrollY > window.innerHeight * 0.25 || (window.location.hash && window.location.hash !== "#home")) return;
        gsap.fromTo(root.querySelectorAll(".hero-copy > *"),
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity" },
        );
        // The image enters inside its wrapper so the scroll timeline can move the wrapper independently.
        gsap.fromTo(root.querySelector(".hero-house img"),
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3, ease: "power3.out", clearProps: "transform,opacity" },
        );
      });
      media.add({ desktop: "(min-width: 701px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
        if (!context.conditions?.motion) return;
        const desktop = context.conditions.desktop;
        root.dataset.motion = "sequence";
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { id: "hero-scene", trigger: root, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
        });

        // All stages are keyed to scroll progress, with no autoplay or delayed scrub.
        timeline
          .to(".hero-copy", { yPercent: 12, scale: 0.97, autoAlpha: 0, duration: 0.23 }, 0.025)
          .to(".hero-house", { y: () => -window.innerHeight * (desktop ? 0.84 : 0.54), scale: desktop ? 1.14 : 1.12, duration: 0.45 }, 0)
          .to(".hero-cloud-back", { xPercent: desktop ? 55 : 30, duration: 0.8 }, 0)
          .to(".hero-cloud-front", { xPercent: desktop ? -45 : -30, yPercent: -18, duration: 0.85 }, 0)
          .to(".hero-smoke", { yPercent: -15, scale: 1.1, duration: 0.65 }, 0)
          .fromTo(".hero-logo-outline", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.26)
          .fromTo(".hero-logo-mask", { opacity: 0 }, { opacity: 1, duration: 0.16 }, 0.43)
          .to(".hero-logo-outline", { opacity: 0, duration: 0.1 }, 0.48)
          .to(".hero-house", { y: () => -window.innerHeight * (desktop ? 1.08 : 0.77), scale: desktop ? 1.22 : 1.18, duration: 0.35 }, 0.45)
          // Keep a low cloud bank in frame while the logo forms, then lift it over the letters.
          .fromTo(".hero-whiteout", { yPercent: 42 }, { yPercent: 34, duration: 0.6 }, 0)
          .to(".hero-whiteout", { yPercent: -65, duration: 0.4 }, 0.6)
          .fromTo(".hero-final-white", { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.98);
        return () => { delete root.dataset.motion; };
      });
    } catch (error) {
      media.revert();
      delete root.dataset.motion;
      console.warn("Hero motion unavailable; showing the static composition.", error);
    }
    const imagesReady = [...root.querySelectorAll("img")].filter(image => image.loading !== "lazy").map(image => image.decode().catch(() => {}));
    void Promise.all([document.fonts.ready, ...imagesReady]).then(() => {
      if (!disposed) { fitLogoLines(); ScrollTrigger.refresh(); }
    });
    return () => { disposed = true; window.removeEventListener("resize", fitLogoLines); media.revert(); delete root.dataset.motion; };
  }, { scope: section });

  return <section ref={section} id="home" className="hero" tabIndex={-1} aria-labelledby="hero-title">
    <div className="hero-scene">
      <div className="hero-sky"><Image src={sky} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" unoptimized /></div>
      <div className="hero-cloud hero-cloud-back" aria-hidden="true"><Image src={cloud} alt="" fill sizes="70vw" loading="eager" /></div>
      <div className="hero-copy">
        <h1 id="hero-title">{site.hero.headline.split(" ").map((word, index) => <span key={index} style={{ color: word === "PLACE" ? "#dc2626" : "#111111" }}>{index > 0 ? " " : ""}{word}</span>)}</h1>
        <p className="hero-subtitle"><span>{site.hero.lead}</span> {site.hero.support}</p>
        <a className="hero-search" href="#properties">Find Properties <span aria-hidden="true">→</span></a>
      </div>
      <div className="hero-house"><Image src={house} alt="A contemporary brick residence with tall windows, planted terraces, and warm evening light" width={2200} height={1957} sizes="(max-width: 700px) 230vw, (max-width: 1000px) 155vw, 105vw" loading="eager" fetchPriority="high" /></div>
      <div className="hero-smoke" aria-hidden="true"><Image src={smoke} alt="" fill sizes="100vw" loading="eager" /></div>
      <div className="hero-cloud hero-cloud-front" aria-hidden="true"><Image src={cloud} alt="" fill sizes="85vw" loading="eager" /></div>
      <svg className="hero-logo-outline" aria-hidden="true"><LogoText outline /></svg>
      <svg className="hero-logo-mask" aria-hidden="true">
        <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%"><rect width="100%" height="100%" fill="white" /><LogoText /></mask></defs>
        <image href={sky} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask={`url(#${maskId})`} />
      </svg>
      <div className="hero-whiteout" aria-hidden="true" /><div className="hero-final-white" aria-hidden="true" />
    </div>
  </section>;
}
