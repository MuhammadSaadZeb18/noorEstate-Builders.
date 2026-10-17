import type { Property } from "../types/property";

export function formatPrice(property: Pick<Property, "price" | "currency" | "transaction">) {
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: property.currency, maximumFractionDigits: 0 }).format(property.price);
  return property.transaction === "rent" ? `${amount} / month` : amount;
}

export function bedroomLabel(bedrooms: number) {
  return bedrooms === 0 ? "Studio" : `${bedrooms} bed${bedrooms === 1 ? "" : "s"}`;
}
