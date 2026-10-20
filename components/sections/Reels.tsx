"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { reels, reelsContent } from "@/data/reels";
import "./Reels.css";

export function Reels() {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const motion = useRef({ hover: false, playing: false, paused: false, selecting: false });
  const selectionTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const element = viewport.current;
    if (!element) return;
    let visible = false;
    let cycleWidth = 0;
    let stride = 0;
    let lastIndex = 0;
    const measure = () => {
      const items = element.querySelectorAll<HTMLElement>(".reel");
      if (items.length <= reels.length) return;
      cycleWidth = items[reels.length].offsetLeft - items[0].offsetLeft;
      stride = cycleWidth / reels.length;
    };
    const onScroll = () => {
      if (!stride) return;
      const index = Math.floor((element.scrollLeft + stride * 0.15) / stride) % reels.length;
      if (index !== lastIndex) { lastIndex = index; setCurrent(index); }
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersection.observe(element);
    element.addEventListener("scroll", onScroll, { passive: true });
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let remainder = 0;
      const tick = (_time: number, delta: number) => {
        const state = motion.current;
        if (!visible || !cycleWidth || state.hover || element.contains(document.activeElement) || state.playing || state.paused || state.selecting) return;
        // Native horizontal scrolling keeps touch scrolling and keyboard focus usable.
        remainder += Math.min(delta, 50) * 0.035;
        const step = Math.floor(remainder);
        remainder -= step;
        if (!step) return;
        element.scrollLeft += step;
        if (element.scrollLeft >= cycleWidth) element.scrollLeft -= cycleWidth;
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    });
    return () => {
      media.revert();
      resize.disconnect();
      intersection.disconnect();
      element.removeEventListener("scroll", onScroll);
      selectionTween.current?.kill();
    };
  }, { scope: viewport });

  const goTo = (index: number) => {
    const element = viewport.current;
    const items = element?.querySelectorAll<HTMLElement>(".reel");
    if (!element || !items?.length) return;
    selectionTween.current?.kill();
    setActive(null);
    motion.current.playing = false;
    const destination = items[index].offsetLeft - items[0].offsetLeft;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.scrollLeft = destination;
      return;
    }
    motion.current.selecting = true;
    selectionTween.current = gsap.to(element, { scrollLeft: destination, duration: 0.65, ease: "power3.inOut", onComplete: () => { motion.current.selecting = false; } });
  };

  return <section id="reels" className="reels-section page-section" style={{ background: "#111111", color: "#f5f5f5" }} tabIndex={-1} aria-labelledby="reels-title">
    <div className="reels-heading-row"><h2 id="reels-title" className="reels-heading">{reelsContent.title}</h2><button className="reels-motion-toggle" type="button" aria-pressed={paused} onClick={() => { motion.current.paused = !paused; setPaused(!paused); }}>{paused ? "Resume motion" : "Pause motion"}</button></div>
    <div ref={viewport} className="reels-viewport"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") motion.current.hover = true; }}
      onPointerLeave={() => { motion.current.hover = false; }}
      onTouchStart={() => { motion.current.selecting = true; }}
      onTouchEnd={() => { motion.current.selecting = false; }}
      onTouchCancel={() => { motion.current.selecting = false; }}>
      <ul className="reels-track" aria-label="Looping YouTube Shorts from Noor Estate & Builders">{[0, 1].flatMap((copy) => reels.map((reel) => {
        const key = `${reel.id}-${copy}`;
        return <li className="reel" key={key}>
          <div className="reel-screen">
            {active === key ? <>
              <iframe className="reel-player" src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&playsinline=1&controls=0&iv_load_policy=3&rel=0`} title={reel.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              <button className="reel-close-video" type="button" onClick={() => { setActive(null); motion.current.playing = false; }}>Close video &#215;</button>
            </> : <button className="reel-preview" type="button" onClick={() => { setActive(key); motion.current.playing = true; }} aria-label={`Play: ${reel.title}`}>
              <Image src={`/images/reels/${reel.id}-hd.jpg`} alt="" fill unoptimized />
              <span className="reel-play" aria-hidden="true"><svg viewBox="0 0 32 32" fill="currentColor"><path d="M11 7v18l15-9z" /></svg></span>
            </button>}
          </div>
        </li>;
      }))}</ul>
    </div>
    <div className="reels-dots" role="group" aria-label="Choose a reel">{reels.map((reel, index) => <button key={reel.id} type="button" aria-label={`Show reel ${index + 1}: ${reel.title}`} aria-current={current === index ? "true" : undefined} onClick={() => goTo(index)}><span /></button>)}</div>
  </section>;
}
