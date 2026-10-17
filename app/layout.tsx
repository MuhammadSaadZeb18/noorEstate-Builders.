import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import "./hero.css";
import "./services.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.noorestatebuilders.com"),
  title: "Noor Estate & Builders — Find What Moves You",
  description: "Thoughtful spaces, personal guidance, and a new perspective on real estate. Find a place that feels like you.",
  applicationName: "Noor Estate & Builders",
  openGraph: {
    title: "Noor Estate & Builders — Find What Moves You",
    description: "Thoughtful spaces. Personal guidance. A considered perspective on real estate.",
    siteName: "Noor Estate & Builders",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={instrumentSans.variable}
    >
      <body>{children}</body>
    </html>
  );
}
