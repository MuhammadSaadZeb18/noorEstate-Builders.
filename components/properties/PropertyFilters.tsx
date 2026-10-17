import type { PropertyFilters as Filters } from "@/types/property";
import { locations, propertyTypes } from "@/data/properties";

interface Props {
  filters: Filters;
  error: string | null;
  onChange: (key: keyof Filters, value: string) => void;
  onReset: () => void;
}

export function PropertyFilters({ filters, error, onChange, onReset }: Props) {
  const priceLabel = filters.transaction === "rent" ? "Monthly rent" : "Purchase price";
  return (
    <form className="property-filters" onSubmit={(event) => event.preventDefault()} aria-label="Filter properties">
      <div className="filter-topline">
        <fieldset className="transaction-switch">
          <legend className="sr-only">Sale or rent</legend>
          {(["sale", "rent"] as const).map((value) => (
            <label key={value}>
              <input type="radio" name="transaction" value={value} checked={filters.transaction === value} onChange={() => onChange("transaction", value)} />
              <span>{value === "sale" ? "For sale" : "To rent"}</span>
            </label>
          ))}
        </fieldset>
        <p>{priceLabel} in USD{filters.transaction === "rent" ? " / month" : ""}</p>
        <button type="button" className="reset-filters" onClick={onReset}>Reset filters <span aria-hidden="true">↺</span></button>
      </div>
      <div className="filter-fields">
        <label>Location<select name="location" value={filters.location} onChange={(event) => onChange("location", event.target.value)}><option value="">All locations</option>{locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}</select></label>
        <label>Property type<select name="type" value={filters.type} onChange={(event) => onChange("type", event.target.value)}><option value="">All types</option>{propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
        <label>Min. price ($)<input name="minPrice" type="number" inputMode="numeric" min="0" step="any" placeholder="No minimum" value={filters.minPrice} aria-invalid={!!error} aria-describedby={error ? "price-error" : undefined} onChange={(event) => onChange("minPrice", event.target.value)} /></label>
        <label>Max. price ($)<input name="maxPrice" type="number" inputMode="numeric" min="0" step="any" placeholder="No maximum" value={filters.maxPrice} aria-invalid={!!error} aria-describedby={error ? "price-error" : undefined} onChange={(event) => onChange("maxPrice", event.target.value)} /></label>
        <label>Bedrooms<select name="bedrooms" value={filters.bedrooms} onChange={(event) => onChange("bedrooms", event.target.value)}><option value="">Any bedrooms</option><option value="0">Studio only</option>{[1, 2, 3, 4, 5].map((count) => <option value={count} key={count}>{count}+ bedrooms</option>)}</select></label>
      </div>
      {error && <p className="filter-error" id="price-error" role="alert">{error}</p>}
    </form>
  );
}
