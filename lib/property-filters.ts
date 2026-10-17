import type { Property, PropertyFilters, PropertySort } from "../types/property";

export function priceRangeError(filters: PropertyFilters): string | null {
  const { minPrice, maxPrice } = filters;
  if ([minPrice, maxPrice].some((value) => value !== "" && (!Number.isFinite(Number(value)) || Number(value) < 0))) {
    return "Enter a valid price of zero or more.";
  }
  if (minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice)) {
    return "Minimum price must be less than or equal to maximum price.";
  }
  return null;
}

export function filterProperties(records: readonly Property[], filters: PropertyFilters): Property[] {
  if (priceRangeError(filters)) return [];
  return records.filter((property) => (
    property.transaction === filters.transaction
    && (!filters.location || property.locationId === filters.location)
    && (!filters.type || property.type === filters.type)
    && (filters.minPrice === "" || property.price >= Number(filters.minPrice))
    && (filters.maxPrice === "" || property.price <= Number(filters.maxPrice))
    && (filters.bedrooms === "" || (filters.bedrooms === "0" ? property.bedrooms === 0 : property.bedrooms >= Number(filters.bedrooms)))
  ));
}

export function sortProperties(records: readonly Property[], sort: PropertySort): Property[] {
  return [...records].sort((a, b) => {
    let difference = 0;
    if (sort === "price-asc") difference = a.price - b.price;
    if (sort === "price-desc") difference = b.price - a.price;
    if (sort === "newest") difference = b.listedAt.localeCompare(a.listedAt);
    if (sort === "featured") difference = Number(b.featured) - Number(a.featured);
    return difference || a.id.localeCompare(b.id);
  });
}
