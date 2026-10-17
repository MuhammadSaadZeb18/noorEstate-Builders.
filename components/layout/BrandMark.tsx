import { site } from "@/data/site";

export function BrandMark() {
  return <span className="brand-mark"><strong>{site.shortName}</strong><span>Estate &amp; Builders</span></span>;
}
