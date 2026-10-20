import { BrandMark } from "./BrandMark";
import { site } from "@/data/site";
import { contactDetails } from "@/data/homepage";
import Image from "next/image";

const links = [
  { label: "Our approach", href: "#about" }, { label: "The collection", href: "#properties" },
  { label: "Our services", href: "#services" }, { label: "Our process", href: "#process" },
  { label: "Projects", href: "#projects" }, { label: "The team", href: "#team" },
  { label: "Questions", href: "#faqs" }, { label: "Get in touch", href: "#contact" },
];

export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><a className="wordmark" href="#home" aria-label={`${site.name} home`}>
    <Image src="/images/LL.png" alt="Noor Estate & Builders logo" width={200} height={50} />
    </a><p>Good places.<br />New beginnings.</p>{contactDetails.email && <a className="footer-email" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>}<div className="footer-socials" role="group" aria-label="Follow Noor on social media">{site.socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a>)}</div></div><nav aria-label="Footer navigation">{links.map((link) => <a key={link.href} href={link.href}>{link.label}<span aria-hidden="true">↗</span></a>)}</nav><a className="footer-back" href="#home"><span className="round-arrow" aria-hidden="true">↑</span>Back to top</a></div><div className="footer-bottom"><p>© 2026 Noor Estate & Builders. A considered perspective.</p><p>Demonstration website · Sample properties, people, and stories.</p></div></footer>;
}
