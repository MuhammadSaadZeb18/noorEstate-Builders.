export const site = {
    name: "Noor Estate & Builders",
    shortName: "NOOR",
    socialLinks: [
        { label: "Facebook", href: "https://www.facebook.com/noorestateandbuilders1" },
        { label: "TikTok", href: "https://www.tiktok.com/@noor_estates" },
        { label: "Instagram", href: "https://www.instagram.com/noorestateandbuilders1" },
        { label: "YouTube", href: "https://www.youtube.com/@noorestateandbuilders" },
    ],
    navigation: [{ label: "Search", href: "#properties" }, { label: "Projects", href: "#projects" }, { label: "Agents", href: "#team" }, { label: "Services", href: "#services" }, { label: "Properties", href: "#properties" }, { label: "About", href: "#about" }],
    hero: {
        headline: "A PLACE TO CALL HOME",
        lead: "Expert agents. Real guidance.",
        support: "A clear path to find what’s next.",
        eyebrow: "A new perspective on real estate",
        title: ["A place for", "what’s next."],
        description: "More than a new address. A new way to live. Thoughtful spaces, personal guidance, and a little room to dream.",
        image: "/images/hero/modern-house.webp",
    },
    about: {
        description: "A first set of keys. A little more space. A completely fresh start. Whatever comes next, we believe finding your place should feel personal.",
        detail: "We bring a considered eye and a human approach to real estate. Taking the time to understand your world, so you can find a place that feels like you.",
        principles: [
            { number: "01", title: "People before property", text: "Your story is where we start." },
            { number: "02", title: "A considered perspective", text: "An eye for the details that matter." },
            { number: "03", title: "Clarity at every step", text: "Good advice. An easier way forward." },
        ],
    },
} as const;
