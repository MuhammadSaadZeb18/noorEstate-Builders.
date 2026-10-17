"use client";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { BrandMark } from "./BrandMark";
import { useSectionScroll } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/components/motion/gsap";
import "./MobileMenu.css";
export function Header() {
    const scrollToSection = useSectionScroll();
    const dialog = useRef<HTMLDialogElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const header = useRef<HTMLElement>(null);
    const menuAnimation = useRef<gsap.core.Timeline | null>(null);
    const closing = useRef(false);
    const { contextSafe } = useGSAP(() => {}, { scope: dialog });

    const openMenu = () => contextSafe(() => {
      const element = dialog.current;
      if (!element || element.open) return;
      menuAnimation.current?.kill();
      closing.current = false;
      element.returnValue = "";
      element.dataset.phase = "open";
      element.showModal();
      trigger.current?.setAttribute("aria-expanded", "true");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const links = element.querySelectorAll("nav a");
      menuAnimation.current = gsap.timeline()
        .fromTo(element, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", clearProps: "transform,opacity" })
        .fromTo(links, { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.055, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }, 0.12);
    })();

    const closeMenu = (anchor = "") => contextSafe(() => {
      const element = dialog.current;
      if (!element?.open || closing.current) return;
      closing.current = true;
      menuAnimation.current?.kill();
      element.dataset.phase = "closing";
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.close(anchor);
        return;
      }
      menuAnimation.current = gsap.timeline({ onComplete: () => element.close(anchor) })
        .to(element.querySelectorAll("nav a"), { y: -8, opacity: 0, stagger: 0.025, duration: 0.18, ease: "power2.in" }, 0)
        .to(element, { y: -20, opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0.06);
    })();

    useEffect(() => {
      const element = header.current;
      if (!element) return;
      let previousY = Math.max(0, window.scrollY);
      let direction = 0;
      let distance = 0;
      let frame = 0;
      const update = () => {
        frame = 0;
        const y = Math.max(0, window.scrollY);
        const delta = y - previousY;
        previousY = y;
        element.dataset.scrolled = String(y > 20);
        if (y <= element.offsetHeight || dialog.current?.open || element.contains(document.activeElement)) {
          element.dataset.hidden = "false";
          distance = 0;
          return;
        }
        if (delta === 0) return;
        const nextDirection = Math.sign(delta);
        distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
        direction = nextDirection;
        // Ignore tiny scroll jitter, while responding to a short upward gesture.
        if (distance >= 8) element.dataset.hidden = String(direction > 0);
      };
      const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.cancelAnimationFrame(frame);
      };
    }, []);

    return (<header ref={header} className="site-header">
      <a className="wordmark" href="#home" aria-label={`${site.name} home`}><BrandMark /></a>
      <nav className="desktop-navigation" aria-label="Main navigation">{site.navigation.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</nav>
      <a className="header-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
      <button ref={trigger} className="menu-toggle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobile-navigation" onClick={openMenu}>Menu <span aria-hidden="true">☰</span></button>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" aria-labelledby="menu-title" onClose={() => {
        closing.current = false;
        const element = dialog.current;
        if (element) [element, ...element.querySelectorAll<HTMLElement>("nav a")].forEach((item) => {
          item.style.removeProperty("opacity");
          item.style.removeProperty("transform");
        });
        trigger.current?.setAttribute("aria-expanded", "false");
        const anchor = dialog.current?.returnValue;
        if (anchor?.startsWith("#")) {
          scrollToSection(anchor);
        } else { trigger.current?.focus({ preventScroll: true }); }
      }} onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget)
        closeMenu(); }}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-top"><span id="menu-title" className="eyebrow">Explore Noor</span><button type="button" className="close-menu" onClick={() => closeMenu()}>Close <span aria-hidden="true">×</span></button></div>
          <nav aria-label="Mobile navigation">{site.navigation.map((link) => <a key={link.label} href={link.href} onClick={(event) => { event.preventDefault(); closeMenu(link.href); }}>{link.label}<span aria-hidden="true">↗</span></a>)}</nav>
          <p>Good places. New beginnings.</p>
        </div>
      </dialog>
    </header>);
}
