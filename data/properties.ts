import type { Property, PropertyFilters } from "@/types/property";

export const locations = [
  { id: "brooklyn", name: "Brooklyn" },
  { id: "manhattan", name: "Manhattan" },
  { id: "queens", name: "Queens" },
  { id: "hudson-valley", name: "Hudson Valley" },
] as const;

export const propertyTypes = ["Apartment", "Townhouse", "House", "Loft"] as const;

export const defaultFilters: PropertyFilters = {
  transaction: "sale", location: "", type: "", minPrice: "", maxPrice: "", bedrooms: "",
};

const gallery = (cover: string, coverAlt: string) => [
  { src: `/images/properties/${cover}.jpg`, alt: coverAlt },
  { src: "/images/properties/living-room.jpg", alt: "Illustrative living room with natural light and neutral furnishings" },
  { src: "/images/properties/kitchen.jpg", alt: "Illustrative contemporary kitchen with natural materials" },
];

// Demonstration records only. Photography illustrates the style, not an actual address.
export const properties: Property[] = [
  {
    id: "FM-001", title: "The Garden House", locationId: "hudson-valley", neighborhood: "Hudson Valley",
    transaction: "sale", type: "House", price: 1850000, currency: "USD", bedrooms: 4, bathrooms: 3, area: 2860,
    listedAt: "2026-10-12", featured: true,
    description: "Space to slow down, just beyond the city. This imagined retreat pairs generous glazing with a considered palette of stone, timber, and warm white walls. Open living spaces connect to a private garden, with room for quiet mornings and long evenings together.",
    amenities: ["Private garden", "Covered parking", "Open-plan living", "Home office", "Outdoor terrace", "Laundry room"],
    images: gallery("garden-house", "Illustrative contemporary house with a pool and garden"),
  },
  {
    id: "FM-002", title: "A Quiet Corner", locationId: "brooklyn", neighborhood: "Park Slope, Brooklyn",
    transaction: "sale", type: "Townhouse", price: 2450000, currency: "USD", bedrooms: 5, bathrooms: 3, area: 3240,
    listedAt: "2026-10-08", featured: false,
    description: "A generous family home imagined around everyday rituals: breakfast in the light, a favorite book by the window, and a garden that becomes another room. Flexible spaces make room for working, gathering, and finding a moment to yourself.",
    amenities: ["Private courtyard", "Flexible office", "Guest room", "Storage", "Laundry room"],
    images: gallery("courtyard-home", "Illustrative light-filled residence with an outdoor courtyard"),
  },
  {
    id: "FM-003", title: "Light on the Park", locationId: "manhattan", neighborhood: "Upper West Side, Manhattan",
    transaction: "sale", type: "Apartment", price: 1250000, currency: "USD", bedrooms: 2, bathrooms: 2, area: 1380,
    listedAt: "2026-10-14", featured: true,
    description: "A city apartment conceived as a calm place to come home to. Clean lines, soft textures, and a generous living area make this demonstration home equally suited to quiet evenings and a table full of friends.",
    amenities: ["Elevator", "Balcony", "Built-in storage", "Dishwasher", "In-unit laundry"],
    images: gallery("city-apartment", "Illustrative bright apartment with an open living and dining area"),
  },
  {
    id: "FM-004", title: "The Open Studio", locationId: "queens", neighborhood: "Astoria, Queens",
    transaction: "sale", type: "Loft", price: 625000, currency: "USD", bedrooms: 0, bathrooms: 1, area: 740,
    listedAt: "2026-10-05", featured: false,
    description: "A little less space, a little more possibility. This imagined open studio brings living, working, and unwinding together in one thoughtfully arranged space, with natural light and practical storage doing the heavy lifting.",
    amenities: ["Open floor plan", "Elevator", "Bike storage", "Shared roof terrace"],
    images: gallery("park-residence", "Illustrative architectural residence with glass and natural finishes"),
  },
  {
    id: "FM-005", title: "Sunday in the City", locationId: "brooklyn", neighborhood: "Williamsburg, Brooklyn",
    transaction: "rent", type: "Apartment", price: 4200, currency: "USD", bedrooms: 2, bathrooms: 1, area: 1120,
    listedAt: "2026-10-15", featured: true,
    description: "An easy city base imagined for a slower pace. Room to cook, host, and make yourself at home, with a simple material palette and a layout that keeps everyday living effortless. Demonstration rent is shown per month.",
    amenities: ["Balcony", "Elevator", "Dishwasher", "In-unit laundry", "Bike storage"],
    images: gallery("city-apartment", "Illustrative open-plan apartment with warm neutral furnishings"),
  },
  {
    id: "FM-006", title: "Room to Breathe", locationId: "hudson-valley", neighborhood: "Hudson Valley",
    transaction: "rent", type: "House", price: 6500, currency: "USD", bedrooms: 3, bathrooms: 2, area: 2100,
    listedAt: "2026-10-10", featured: false,
    description: "A countryside rental concept with room for a change of scenery. Generous communal spaces and a garden-facing living room create a comfortable base for a new chapter, with a dedicated space for working from home.",
    amenities: ["Private garden", "Driveway", "Home office", "Patio", "Laundry room"],
    images: gallery("garden-house", "Illustrative garden home with expansive windows"),
  },
  {
    id: "FM-007", title: "The Little Loft", locationId: "queens", neighborhood: "Long Island City, Queens",
    transaction: "rent", type: "Loft", price: 2800, currency: "USD", bedrooms: 0, bathrooms: 1, area: 610,
    listedAt: "2026-10-09", featured: true,
    description: "A compact loft concept with a thoughtful place for everything. Open living space, soft light, and a simple finish palette make an inviting starting point for personal touches. A studio layout with no separate bedroom.",
    amenities: ["Open floor plan", "Elevator", "Shared laundry", "Bike storage"],
    images: gallery("park-residence", "Illustrative modern residence with a restrained material palette"),
  },
  {
    id: "FM-008", title: "Above It All", locationId: "manhattan", neighborhood: "Chelsea, Manhattan",
    transaction: "rent", type: "Apartment", price: 3600, currency: "USD", bedrooms: 1, bathrooms: 1, area: 820,
    listedAt: "2026-10-13", featured: false,
    description: "A one-bedroom apartment imagined as a quiet retreat above the city. An open living space and a separate bedroom offer a comfortable balance of connection and privacy, with considered details throughout.",
    amenities: ["Elevator", "Built-in storage", "Dishwasher", "Shared roof terrace"],
    images: gallery("courtyard-home", "Illustrative contemporary home with clean architectural lines"),
  },
];

export const listingContent = {
  eyebrow: "Places with possibility",
  title: "Find your kind of place.",
  description: "Room for a new chapter. Explore a considered selection of spaces, and find the one that feels like you.",
  disclosure: "Demonstration listings · Prices and details are sample data. Photography is illustrative and may be shared between listings.",
};
