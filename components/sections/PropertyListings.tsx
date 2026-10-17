"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { defaultFilters, listingContent, properties } from "@/data/properties";
import type { Property, PropertyFilters as Filters, PropertySort } from "@/types/property";
import { filterProperties, priceRangeError, sortProperties } from "@/lib/property-filters";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyDetailDialog } from "@/components/properties/PropertyDetailDialog";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { PROPERTY_SEARCH_EVENT, type PropertySearchSelection } from "@/lib/property-events";
import { locations } from "@/data/properties";

export function PropertyListings() {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters });
  const [sort, setSort] = useState<PropertySort>("featured");
  const [selected, setSelected] = useState<{ property: Property; trigger: HTMLButtonElement } | null>(null);
  const section = useRef<HTMLElement>(null);
  const resultsElement = useRef<HTMLDivElement>(null);
  const error = priceRangeError(filters);
  const results = useMemo(() => sortProperties(filterProperties(properties, filters), sort), [filters, sort]);
  const reset = () => { setFilters({ ...defaultFilters }); setSort("featured"); };

  useGSAP(() => {
    const element = resultsElement.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = element.querySelectorAll(".property-card, .property-empty");
      gsap.fromTo(cards, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.065, ease: "power3.out",
        clearProps: "opacity,transform", onComplete: () => ScrollTrigger.refresh(),
      });
    });
    return () => media.revert();
  }, { scope: resultsElement, dependencies: [filters.transaction], revertOnUpdate: true });

  useEffect(() => {
    const onSelection = (event: Event) => {
      const selection = (event as CustomEvent<PropertySearchSelection>).detail;
      if (!selection) return;
      setFilters((current) => ({
        ...defaultFilters,
        transaction: selection.transaction === "sale" || selection.transaction === "rent" ? selection.transaction : current.transaction,
        location: locations.some((location) => location.id === selection.location) ? selection.location! : "",
      }));
      setSort("featured");
    };
    window.addEventListener(PROPERTY_SEARCH_EVENT, onSelection);
    return () => window.removeEventListener(PROPERTY_SEARCH_EVENT, onSelection);
  }, []);

  useEffect(() => {
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    if (section.current) observer.observe(section.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <section ref={section} id="properties" className="property-section" tabIndex={-1} aria-labelledby="properties-title">
      <div className="section-intro"><p className="eyebrow"><span className="section-dot" />{listingContent.eyebrow}</p><span className="section-number" aria-hidden="true">(04)</span></div>
      <div className="property-section-heading"><h2 id="properties-title">Find your<br /><span>kind of place.</span></h2><p>{listingContent.description}</p></div>
      <PropertyFilters filters={filters} error={error} onReset={reset} onChange={(key, value) => setFilters((current) => key === "transaction" ? { ...current, transaction: value as Filters["transaction"], minPrice: "", maxPrice: "" } : { ...current, [key]: value })} />
      <div className="property-results-toolbar"><p role="status" aria-live="polite" aria-atomic="true">{results.length} {results.length === 1 ? "place" : "places"} to {filters.transaction === "sale" ? "call your own" : "make yourself at home"}</p><label>Sort by<select name="sort" value={sort} onChange={(event) => setSort(event.target.value as PropertySort)}><option value="featured">Our selection</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="newest">Newest first</option></select></label></div>
      <div ref={resultsElement} className="property-results-transition">
      {results.length ? <div className="property-grid">{results.map((property) => <PropertyCard key={property.id} property={property} onOpen={(record, button) => setSelected({ property: record, trigger: button })} />)}</div> : <div className="property-empty"><span aria-hidden="true">↗</span><h3>A little more room to search.</h3><p>{error ? "Adjust your price range to keep exploring." : "No places match these filters. Try another location, a wider budget, or fewer bedrooms."}</p><button type="button" onClick={reset}>Reset filters</button></div>}
      </div>
      <p className="listing-disclosure">{listingContent.disclosure}</p>
      {selected && <PropertyDetailDialog key={selected.property.id} property={selected.property} trigger={selected.trigger} onClose={() => setSelected(null)} />}
    </section>
  );
}
