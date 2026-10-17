export type Transaction = "sale" | "rent";
export type PropertyType = "Apartment" | "Townhouse" | "House" | "Loft";

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Property {
  id: string;
  title: string;
  locationId: string;
  neighborhood: string;
  transaction: Transaction;
  type: PropertyType;
  price: number;
  currency: "USD";
  bedrooms: number;
  bathrooms: number;
  area: number;
  listedAt: string;
  featured: boolean;
  description: string;
  amenities: string[];
  images: PropertyImage[];
}

export interface PropertyFilters {
  transaction: Transaction;
  location: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}

export type PropertySort = "featured" | "price-asc" | "price-desc" | "newest";
