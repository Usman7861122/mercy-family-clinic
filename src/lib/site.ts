// All clinic content lives here so it is easy to edit in one place.

import { services } from "./services";
export * from "./services";

export const site = {
  name: "Mercy Family Clinic",
  tagline: "When you look good, you feel good",
  description:
    "Family medicine and medical weight loss clinic in Dallas, TX, led by Dr. Ebere Israel Azubuike (Dr. Izzy).",
  phone: "214-942-2377",
  phoneHref: "tel:+12149422377",
  fax: "214-484-5034",
  address: {
    street: "1114 N. Bishop Avenue",
    city: "Dallas",
    state: "TX",
    zip: "75208",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  // WordPress site used for the blog (and anything else we pull later)
  wordpress: "https://wordpress-1621972-6540288.cloudwaysapps.com",
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `Mercy Family Clinic, ${fullAddress}`,
)}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  fullAddress,
)}`;

/** Unsplash image helper. Pass the photo id (the part after "photo-"). */
export const unsplash = (id: string, width = 900, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${width}${
    height ? `&h=${height}` : ""
  }`;

export const images = {
  hero: "1531983412531-1f49a365ffed", // mother and child at the beach
  parallax: "1470071459604-3b5ec3a7fe05", // misty green hills
};

// Dr. Izzy photo and the clinic logo live in /public/images
export const doctorImage = "/images/Doctor.png";
export const logoImage = "/images/logo-teal.png"; // official logo recolored to the brand teal (original: logo.png)

// Weight loss model (transparent PNG). It uses /public/images/weight-loss.png when that file
// exists, and falls back to the copy on the WordPress site.
export const weightLossImage = {
  local: "/images/weight-loss.png",
  remote: `${site.wordpress}/wp-content/uploads/2026/07/3556-Photoroom.png`,
};

export interface NavChild {
  label: string;
  href: string;
  icon?: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

// Same order as the current website's Services menu
const menuOrder = [
  "medical-weight-loss",
  "family-medicine",
  "diabetes",
  "physical-exams",
  "immunizations",
  "hypertension",
  "pediatrics",
  "in-office-diagnostic-testing",
  "womens-health",
];
export const menuServices: NavChild[] = menuOrder.map((slug) => {
  const sv = services.find((x) => x.slug === slug)!;
  return { label: sv.title, href: `/services/${sv.slug}`, icon: sv.icon };
});

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", icon: "users" },
      { label: "Meet Dr. Izzy", href: "/about/meet-dr-izzy", icon: "stethoscope" },
    ],
  },
  { label: "Services", href: "/services", children: menuServices },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Accessibility", href: "/accessibility" },
];



export const timeline = [
  {
    year: "2005",
    icon: "graduation",
    title: "Trained at UTMB",
    text: "Dr. Izzy graduates from the University of Texas Medical Branch.",
  },
  {
    year: "2008",
    icon: "hospital",
    title: "Residency in Dallas",
    text: "He completes his residency at Methodist Health System Dallas.",
  },
  {
    year: "2010",
    icon: "clinic",
    title: "Mercy Family Clinic opens",
    text: "The clinic is founded on one idea: life-long relationships with every member of the family.",
  },
  {
    year: "Today",
    icon: "users",
    title: "Care for every age",
    text: "Family medicine, pediatrics, women's health, diabetes care and more, all in one place.",
  },
  {
    year: "Now",
    icon: "scale",
    title: "Medical weight loss",
    text: "Supervised programs with GLP-1 medications and lifestyle support for lasting results.",
  },
];

export const whyPoints = [
  { text: "Personalized care for chronic conditions", icon: "heart-pulse" },
  { text: "Top-tier preventive medicine", icon: "shield" },
  { text: "On-site diagnostic testing", icon: "flask" },
];

export interface Review {
  name: string;
  text: string;
}

// Static reviews copied from the current website.
// Add or replace these with real Google reviews whenever you like.
export const reviews: Review[] = [
  { name: "Sèkou", text: "Dr. Izzy is excellent at his craft, he is patient and thorough with diagnosing his clients." },
  { name: "Jane", text: "Dr. Izzy is the epitome of what a doctor should be, he has a very good bedside manner..." },
  { name: "Larry B.", text: "He has been my doctor for over 5 years and he has gotten my sugar under control..." },
  { name: "Rosa Q.", text: "My mother who is in her 90s has been coming to Dr. Izzy for about 10 yrs. He listens to us..." },
  { name: "S. Brown", text: "From the front desk to the back door, this clinic cares about the patient." },
  { name: "Ifeanyi O.", text: "Very professional." },
];

export const googleReviewsUrl =
  "https://www.google.com/search?q=Mercy+Family+Clinic+Dallas+reviews";
