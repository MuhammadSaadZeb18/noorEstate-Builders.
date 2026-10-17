import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { properties, defaultFilters } from "../data/properties.ts";
import { filterProperties, sortProperties, priceRangeError } from "../lib/property-filters.ts";
import { bedroomLabel, formatPrice } from "../lib/formatters.ts";

const filters = (overrides = {}) => ({ ...defaultFilters, ...overrides });

test("sale and rent remain separate price markets", () => {
  assert.deepEqual(filterProperties(properties, filters()).map(p => p.id), ["FM-001", "FM-002", "FM-003", "FM-004"]);
  const rentals = filterProperties(properties, filters({ transaction: "rent" }));
  assert.equal(rentals.length, 4);
  assert.ok(rentals.every(p => p.transaction === "rent"));
});

test("all filter criteria combine rather than overwrite one another", () => {
  const result = filterProperties(properties, filters({ transaction: "rent", location: "brooklyn", type: "Apartment", minPrice: "4000", maxPrice: "4500", bedrooms: "2" }));
  assert.deepEqual(result.map(p => p.id), ["FM-005"]);
  assert.equal(filterProperties(properties, filters({ transaction: "rent", location: "brooklyn", type: "House" })).length, 0);
});

test("price boundaries include exact matches and zero is a real maximum", () => {
  assert.deepEqual(filterProperties(properties, filters({ minPrice: "1250000", maxPrice: "1250000" })).map(p => p.id), ["FM-003"]);
  assert.equal(filterProperties(properties, filters({ maxPrice: "0" })).length, 0);
  assert.equal(filterProperties(properties, filters({ minPrice: "0" })).length, 4);
});

test("studios match zero bedrooms exactly; numbered choices mean at least", () => {
  assert.deepEqual(filterProperties(properties, filters({ bedrooms: "0" })).map(p => p.id), ["FM-004"]);
  assert.deepEqual(filterProperties(properties, filters({ bedrooms: "4" })).map(p => p.id), ["FM-001", "FM-002"]);
  assert.equal(filterProperties(properties, filters({ bedrooms: "6" })).length, 0);
});

test("invalid and reversed price ranges fail clearly", () => {
  for (const values of [{ minPrice: "-1" }, { maxPrice: "Infinity" }, { minPrice: "not a number" }, { minPrice: "5", maxPrice: "4" }]) {
    assert.ok(priceRangeError(filters(values)));
    assert.deepEqual(filterProperties(properties, filters(values)), []);
  }
  assert.equal(priceRangeError(filters()), null);
  assert.equal(priceRangeError(filters({ minPrice: "0", maxPrice: "0" })), null);
});

test("price, newest, and featured sorting have deterministic ordering", () => {
  const sale = filterProperties(properties, filters());
  assert.deepEqual(sortProperties(sale, "price-asc").map(p => p.id), ["FM-004", "FM-003", "FM-001", "FM-002"]);
  assert.deepEqual(sortProperties(sale, "price-desc").map(p => p.id), ["FM-002", "FM-001", "FM-003", "FM-004"]);
  assert.deepEqual(sortProperties(sale, "newest").map(p => p.id), ["FM-003", "FM-001", "FM-002", "FM-004"]);
  assert.deepEqual(sortProperties(sale, "featured").map(p => p.id), ["FM-001", "FM-003", "FM-002", "FM-004"]);
});

test("filtering and sorting do not mutate the source inventory", () => {
  const original = structuredClone(properties);
  sortProperties(properties, "price-desc");
  filterProperties(properties, filters({ location: "queens" }));
  assert.deepEqual(properties, original);
});

test("equal sort values use stable property identifiers", () => {
  const records = [{ ...properties[0], id: "B", price: 100 }, { ...properties[0], id: "A", price: 100 }];
  assert.deepEqual(sortProperties(records, "price-asc").map(p => p.id), ["A", "B"]);
});

test("prices distinguish asking price and monthly rent; studios are labelled", () => {
  assert.equal(formatPrice(properties[0]), "$1,850,000");
  assert.equal(formatPrice(properties[4]), "$4,200 / month");
  assert.equal(bedroomLabel(0), "Studio");
  assert.equal(bedroomLabel(1), "1 bed");
  assert.equal(bedroomLabel(2), "2 beds");
});

test("inventory has unique identifiers, valid dates, and gallery assets", () => {
  assert.equal(new Set(properties.map(p => p.id)).size, properties.length);
  for (const property of properties) {
    assert.ok(Number.isFinite(Date.parse(property.listedAt)));
    assert.ok(property.images.length >= 3);
    assert.ok(property.images.every(image => image.src.startsWith("/images/") && image.alt));
    assert.ok(property.images.every(image => existsSync(new URL(`../public${image.src}`, import.meta.url))));
  }
});
