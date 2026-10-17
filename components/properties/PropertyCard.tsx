import Image from "next/image";
import type { Property } from "@/types/property";
import { bedroomLabel, formatPrice } from "@/lib/formatters";

export function PropertyCard({ property, onOpen }: { property: Property; onOpen: (property: Property, trigger: HTMLButtonElement) => void }) {
  return (
    <article className="property-card" data-property-id={property.id}>
      <div className="property-cover">
        <Image src={property.images[0].src} alt={property.images[0].alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
        <span className="property-tag">{property.type}</span>
        {property.featured && <span className="property-featured">Selected by Noor</span>}
      </div>
      <div className="property-card-meta"><p>{property.neighborhood}</p><p>{formatPrice(property)}</p></div>
      <h3><button type="button" className="property-open" aria-haspopup="dialog" aria-controls="property-details" aria-describedby={`facts-${property.id}`} onClick={(event) => onOpen(property, event.currentTarget)}>{property.title}<span className="property-open-arrow" aria-hidden="true">↗</span></button></h3>
      <p className="property-facts" id={`facts-${property.id}`}>{bedroomLabel(property.bedrooms)}<span aria-hidden="true">·</span>{property.bathrooms} bath{property.bathrooms === 1 ? "" : "s"}<span aria-hidden="true">·</span>{property.area.toLocaleString("en-US")} sq ft</p>
    </article>
  );
}
