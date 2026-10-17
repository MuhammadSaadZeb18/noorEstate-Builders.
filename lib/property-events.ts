import type { Transaction } from "@/types/property";

export const PROPERTY_SEARCH_EVENT = "forma:property-search";
export interface PropertySearchSelection { location?: string; transaction?: Transaction }

export function choosePropertySearch(selection: PropertySearchSelection) {
  window.dispatchEvent(new CustomEvent<PropertySearchSelection>(PROPERTY_SEARCH_EVENT, { detail: selection }));
}
