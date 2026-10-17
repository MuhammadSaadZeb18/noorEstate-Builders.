// Editorial demonstration copy. Replace sample people and reviews before launch.
export const aboutContent = {
  headingLead: "This isn’t just",
  headingRest: "about real estate.",
  caption: [
    "It’s about identity. Progress. Getting unstuck.",
    "You’re not just looking for a place. You’re looking",
    "for alignment. That’s what we help you find.",
  ],
  images: [
    { src: "/images/about/chevron-1.jpg", alt: "Woman looking ahead on a city street" },
    { src: "/images/about/chevron-2.jpg", alt: "Bedroom with soft daylight and a city view" },
    { src: "/images/about/chevron-3.jpg", alt: "Contemporary dining space beside tall windows" },
    { src: "/images/about/chevron-4.jpg", alt: "Man looking ahead outside a city building" },
  ],
};

export const whyContent = {
  eyebrow: "Why Noor",
  videoSrc: `/${encodeURIComponent("Margalla Enclave Underpass #margallaenclave #dhaislamabad.mp4")}`,
  title: "Your life’s changing. Don’t just find a place — find what’s next. We help you move forward with clarity, confidence, and the right guidance by your side.",
  description: "Less noise. More understanding. We make space for what matters to you, then help you see what’s possible.",
  reasons: [
    { title: "A conversation first.", text: "Your everyday life, your next chapter, your non-negotiables. A good search starts with listening." },
    { title: "A thoughtful shortlist.", text: "Spaces chosen with intention, with a clear view of the details that make a place work for you." },
    { title: "A human at every step.", text: "Straightforward explanations and a considered perspective, from the first question to the next decision." },
  ],
};

export const servicesContent = {
  eyebrow: "Services",
  title: ["How Noor", "Can Help You"],
  closingLead: "Personal guidance through every stage of real estate,",
  closingRest: "with a clear perspective and support for your next move.",
  closingCta: "Get Started with Noor",
  description: "Different chapters call for different things. Start wherever you are.",
  items: [
    { id: "buy", number: "01", title: "Find a place to call your own.", label: "Buy", description: "Explore spaces around the way you want to live. Compare the possibilities, understand the details, and build a clearer picture of home.", cta: "Explore homes for sale", image: "/images/properties/garden-house.jpg", alt: "Contemporary home with garden-facing windows" },
    { id: "sell", number: "02", title: "Make room for what comes next.", label: "Sell", description: "A fresh perspective on your property, from thoughtful presentation to the questions that shape your next move. Tell us what you have in mind.", cta: "Plan your next chapter", image: "/images/properties/living-room.jpg", alt: "Bright living room with considered natural furnishings" },
    { id: "rent", number: "03", title: "Settle in. Stay open to possibility.", label: "Rent", description: "A new neighborhood, a little more space, or a change of pace. Find a rental that makes everyday life feel a little more like you.", cta: "Explore places to rent", image: "/images/properties/city-apartment.jpg", alt: "Open living space with contemporary architectural details" },
  ],
};

export const processContent = {
  eyebrow: "A clear way forward",
  title: ["Big changes.", "Simple steps."],
  description: "You don’t need to have it all figured out. Start with a conversation, and take it one considered step at a time.",
  steps: [
    { number: "01", title: "Tell us your story.", text: "Share what’s changing, what’s important, and how you’d like your next chapter to feel." },
    { number: "02", title: "Explore with intention.", text: "Bring your priorities into focus. Compare spaces, ask questions, and discover what feels right." },
    { number: "03", title: "Make your next move.", text: "Understand your options and the steps ahead, so the next decision feels a little clearer." },
  ],
};

export const neighborhoods = [
  { id: "brooklyn", name: "Brooklyn", note: "Character on every corner.", image: "/images/locations/brooklyn.jpg", alt: "Illustrative New York city streetscape" },
  { id: "manhattan", name: "Manhattan", note: "A rhythm all its own.", image: "/images/locations/manhattan.jpg", alt: "Illustrative Manhattan skyline and city lights" },
  { id: "queens", name: "Queens", note: "A world of possibilities.", image: "/images/locations/queens.jpg", alt: "Illustrative New York urban architecture" },
  { id: "hudson-valley", name: "Hudson Valley", note: "A little closer to nature.", image: "/images/locations/hudson-valley.jpg", alt: "Illustrative woodland landscape with tall trees" },
] as const;

export const locationsContent = { eyebrow: "Find your surroundings", title: ["A place.", "A sense of belonging."], description: "The morning walk. The corner café. The way a neighborhood makes you feel. There’s more to an address than a pin on a map.", disclosure: "Sample service areas. Neighborhood photography is illustrative." };

export const teamContent = {
  eyebrow: "People make the difference", title: ["Good people.", "In your corner."],
  description: "A personal approach starts with a person. Meet the kind of team we’re building around your next chapter.",
  disclosure: "Demonstration team profiles. Names, roles, and stock portraits are illustrative.",
};
export const agents = [
  { id: "alex", name: "Alex Morgan", role: "Buyer guidance", image: "/images/team/alex.jpg", bio: "A thoughtful eye for spaces, and a little extra time for the questions that matter." },
  { id: "jamie", name: "Jamie Ellis", role: "Seller perspective", image: "/images/team/jamie.jpg", bio: "A considered approach to presentation, possibility, and planning the next move." },
  { id: "sam", name: "Sam Rivera", role: "Rental discovery", image: "/images/team/sam.jpg", bio: "Connecting the small details of everyday life with the bigger picture of home." },
] as const;

export const testimonials = [
  { quote: "We came looking for more space. What we found was a clearer idea of how we wanted to live.", attribution: "A new chapter, thoughtfully imagined", context: "Sample buyer story" },
  { quote: "Having someone listen to the little things made the whole search feel a little less overwhelming.", attribution: "Space for the questions that matter", context: "Sample rental story" },
  { quote: "The next move felt less like a leap, and more like a step we were ready to take.", attribution: "A fresh perspective on moving forward", context: "Sample seller story" },
] as const;
export const testimonialContent = { eyebrow: "The feeling we’re here for", title: "It starts with understanding.", disclosure: "Illustrative testimonials for layout review. These are sample stories, not verified client reviews." };

export const faqs = [
  { question: "Where should I start?", answer: "Start with what matters to you: your preferred areas, budget, and the way you want to live. The collection lets you explore those priorities. You can also prepare an enquiry below to organize your thoughts before a conversation." },
  { question: "Can I search for both sale and rental properties?", answer: "Yes. Choose ‘For sale’ or ‘To rent’ in the collection. Each has a separate price scale, so switching between them clears the price range while keeping your other preferences. Rental prices are displayed per month in USD." },
  { question: "What does the bedroom filter mean?", answer: "‘Studio only’ shows properties with no separate bedroom. Numbered options mean that many bedrooms or more: for example, ‘2+ bedrooms’ includes two-, three-, and four-bedroom spaces." },
  { question: "Are these live listings and verified team profiles?", answer: "This website currently uses demonstration inventory, sample team profiles, and illustrative photography. Prices, availability, people, and client stories are not verified. They need to be replaced with approved business content before launch." },
  { question: "Can you help me think about selling?", answer: "The enquiry section includes a selling option. Use it to prepare the details you would like to discuss, including the property area, your plans, and your preferred timing. This demonstration does not provide valuations or arrange appointments." },
  { question: "What happens when I prepare an enquiry?", answer: "The enquiry tool prepares a message you can copy. If business contact details have been configured, you can open your email app or WhatsApp to send it yourself. Nothing is submitted or delivered by this website." },
] as const;

export const contactContent = {
  eyebrow: "Every next chapter starts somewhere",
  title: ["Let’s find", "what’s next."],
  description: "A thought, a question, a fresh start. Put it into words, and take the first small step.",
  notice: "Business contact details haven’t been added yet. You can prepare and copy an enquiry below. Nothing is sent from this website.",
};

export const contactDetails: { email: string | null; phone: string | null; whatsapp: string | null } = {
  email: "Info@realestatebuilders.com", phone: "+92 333 9663311", whatsapp: "+92 333 9663311",
};
