"use client";

import Image from "next/image";
import { servicesContent } from "@/data/homepage";
import { choosePropertySearch } from "@/lib/property-events";
import { useSectionScroll } from "@/components/motion/MotionProvider";

function ServiceArrow({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M8 50h80M55 16l34 34-34 34" stroke="currentColor" strokeWidth="6" /></svg>;
}

export function Services() {
  const scrollTo = useSectionScroll();
  return <section id="services" className="services-section services-showcase" tabIndex={-1} aria-labelledby="services-title">
    <div className="services-showcase-heading">
      <p className="services-label">{servicesContent.eyebrow}</p>
      <h2 id="services-title">{servicesContent.title[0]}<br /><span>{servicesContent.title[1]}</span></h2>
    </div>
    <div className="services-options">{servicesContent.items.map((service, index) => <a
      className="service-option" key={service.id}
      href={service.id === "sell" ? "#contact" : "#properties"}
      aria-label={service.cta}
      onClick={(event) => {
        if (service.id === "sell") return;
        event.preventDefault();
        choosePropertySearch({ transaction: service.id === "rent" ? "rent" : "sale" });
        requestAnimationFrame(() => scrollTo("#properties"));
      }}
    >
      <div className="service-option-media" aria-hidden="true"><Image src={service.image} alt="" fill sizes="100vw" /></div>
      <div className="service-option-content">
        <span className="service-option-number" aria-hidden="true">{index + 1}</span>
        <p className="service-option-description">{service.description}</p>
        <h3 className="service-option-title"><span>{service.label}</span></h3>
        <ServiceArrow className="service-option-arrow" />
      </div>
    </a>)}</div>
    <div className="services-showcase-footer">
      <p>{servicesContent.closingLead}{" "}<span>{servicesContent.closingRest}</span></p>
      <a href="#contact">{servicesContent.closingCta}<ServiceArrow /></a>
    </div>
  </section>;
}
