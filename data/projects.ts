export const projectsContent = {
  eyebrow: "Our projects",
  title: "Explore our projects.",
  description: "Discover spaces for your next chapter. Explore the details or enquire about a tour.",
};

// Project details transcribed from the supplied reference. Images are illustrative local assets.
export const projects = [
  { id: "lunaya-terraces", name: "Lunaya Terraces Apartment", status: "Off-Plan", delivery: 2030, price: 97000, currency: "AED", location: "Dubai, Business Bay, Avarra by Palace", bedrooms: 2, bathrooms: 1, area: 900, image: "/images/properties/garden-house.jpg" },
  { id: "brooks-sanctuary-1", name: "The Brooks at Sobha Sanctuary", status: "Off-Plan", delivery: 2028, price: 90000, currency: "AED", location: "Dubai, Business Bay, Avarra by Palace", bedrooms: 2, bathrooms: 1, area: 900, image: "/images/properties/park-residence.jpg" },
  { id: "brooks-sanctuary-2", name: "The Brooks at Sobha Sanctuary", status: "Off-Plan", delivery: 2028, price: 90000, currency: "AED", location: "Dubai, Business Bay, Avarra by Palace", bedrooms: 2, bathrooms: 1, area: 900, image: "/images/properties/park-residence.jpg" },
] as const;

export type Project = (typeof projects)[number];
