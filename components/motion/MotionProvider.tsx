"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";

const ScrollContext = createContext<(hash: string) => void>(() => {});

export function useSectionScroll() {
  return useContext(ScrollContext);
}

function sectionFromHash(hash: string) {
  try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
  catch { return null; }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const smoothScroll = useRef<Lenis | null>(null);
  const scrollToSection = useCallback((hash: string) => {
    const target = sectionFromHash(hash);
    if (!target) return;

    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    target.focus({ preventScroll: true });
    if (smoothScroll.current) {
      // Lenis reads scroll-padding-top itself for element targets.
      smoothScroll.current.scrollTo(target);
    } else {
      target.scrollIntoView();
    }
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    let interacted = false;
    const initialHash = window.location.hash;
    const onInteract = () => { interacted = true; };
    const interactionEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    interactionEvents.forEach((name) => window.addEventListener(name, onInteract, { passive: true, once: true }));
    // Touch scrolling and reduced-motion scrolling remain native.
    media.add("(min-width: 701px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let lenis: Lenis | undefined;
      let tick: ((time: number) => void) | undefined;
      let observer: MutationObserver | undefined;
      try {
        lenis = new Lenis({
          autoRaf: false,
          lerp: 0.085,
          syncTouch: false,
          prevent: (node) => node.closest("dialog, [data-lenis-prevent]") !== null,
        });
        smoothScroll.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        const syncOverlay = () => {
          if (document.querySelector("dialog[open]")) lenis?.stop();
          else lenis?.start();
        };
        observer = new MutationObserver(syncOverlay);
        observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
        syncOverlay();
      } catch (error) {
        console.warn("Smooth scrolling unavailable; using native scrolling.", error);
        if (tick) gsap.ticker.remove(tick);
        observer?.disconnect();
        lenis?.destroy();
        smoothScroll.current = null;
      }
      return () => {
        if (tick) gsap.ticker.remove(tick);
        observer?.disconnect();
        lenis?.destroy();
        smoothScroll.current = null;
      };
    });

    const onAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#" || link?.hasAttribute("download") || link?.target === "_blank") return;
      if (!sectionFromHash(hash)) return;
      event.preventDefault();
      scrollToSection(hash);
    };
    const onHistory = () => {
      smoothScroll.current?.resize();
      // Native hash/history navigation owns position; discard any pending inertia.
      smoothScroll.current?.scrollTo(window.scrollY, { immediate: true });
      ScrollTrigger.update();
    };
    document.addEventListener("click", onAnchor);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("hashchange", onHistory);
    // A direct hash visit must account for the enhanced hero's longer scroll area.
    const imagesReady = [...document.images].filter((image) => image.loading !== "lazy").map((image) => image.decode().catch(() => {}));
    void Promise.all([document.fonts.ready, ...imagesReady]).then(() => {
      if (disposed || interacted || !initialHash || window.location.hash !== initialHash) return;
      const target = sectionFromHash(initialHash);
      if (!target) return;
      ScrollTrigger.refresh();
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || "0");
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "instant" });
      smoothScroll.current?.scrollTo(top, { immediate: true });
      target.focus({ preventScroll: true });
    });
    return () => {
      disposed = true;
      interactionEvents.forEach((name) => window.removeEventListener(name, onInteract));
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("hashchange", onHistory);
      media.revert();
    };
  }, { dependencies: [scrollToSection] });

  return <ScrollContext.Provider value={scrollToSection}>{children}</ScrollContext.Provider>;
}
