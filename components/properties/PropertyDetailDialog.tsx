"use client";

import { useEffect, useRef } from "react";
import type { Property } from "@/types/property";
import { bedroomLabel, formatPrice } from "@/lib/formatters";
import { PropertyGallery } from "./PropertyGallery";

export function PropertyDetailDialog({ property, trigger, onClose }: { property: Property; trigger: HTMLButtonElement | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const overlay = dialog.current;
    overlay?.showModal();
    return () => {
      overlay?.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  return (
    <dialog ref={dialog} id="property-details" className="property-dialog" aria-labelledby="property-dialog-title" aria-describedby="property-demo-note" data-lenis-prevent onClose={(event) => { if (!event.currentTarget.open) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="property-dialog-content">
        <div className="property-dialog-top"><span className="eyebrow">A closer look · {property.id}</span><button autoFocus type="button" className="property-close" aria-label="Close property details" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></div>
        <div className="property-detail-heading"><p className="eyebrow">{property.neighborhood} · {property.transaction === "sale" ? "For sale" : "To rent"}</p><h2 id="property-dialog-title">{property.title}</h2><p className="property-detail-price">{formatPrice(property)} <span>USD</span></p></div>
        <PropertyGallery images={property.images} title={property.title} />
        <dl className="property-detail-facts"><div><dt>Bedrooms</dt><dd>{bedroomLabel(property.bedrooms)}</dd></div><div><dt>Bathrooms</dt><dd>{property.bathrooms}</dd></div><div><dt>Interior</dt><dd>{property.area.toLocaleString("en-US")} sq ft</dd></div><div><dt>Property type</dt><dd>{property.type}</dd></div></dl>
        <div className="property-detail-description"><p className="eyebrow">The feeling of home</p><p>{property.description}</p></div>
        <div className="property-amenities"><h3>The thoughtful details</h3><ul>{property.amenities.map((amenity) => <li key={amenity}><span aria-hidden="true">↗</span>{amenity}</li>)}</ul></div>
        <p id="property-demo-note" className="property-demo-note">Demonstration property. This is sample inventory, not a live offer. Photographs illustrate a style and do not represent a verified address. {property.transaction === "rent" ? "The sample price is monthly rent; additional costs are not included." : "The sample price is an asking price; additional costs are not included."}</p>
      </div>
    </dialog>
  );
}
