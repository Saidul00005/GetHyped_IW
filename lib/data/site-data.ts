export const companyName = "GETHYPED";
export const companyDisplayName = "Get Hyped";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://replace-with-production-url.example";

export const defaultSeoImagePath = "/images/Homepage/Statement/Image1.jpg";

export const navLinks = [
  { label: "Expertises", href: "#expertises" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const contactInfo = {
  email: "info@gethyped.nl",
  emailHref: "mailto:info@gethyped.nl",
  phoneDisplay: "+31 6 1533 7496",
  phoneHref: "tel:+31615337496",
  phoneNumber: "+31615337496",
  addressLines: ["Beltrumsestraat 6,", "7141 AL Groenlo"] as const,
  streetAddress: "Beltrumsestraat 6",
  postalCode: "7141 AL",
  addressLocality: "Groenlo",
  addressCountry: "NL",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Beltrumsestraat+6,+7141+AL+Groenlo",
} as const;

export const footerMeta = {
  copyrightLabel: "\u00a9 2025 Get Hyped",
  designCreditLabel: "\u00a9 Design by Mohammad Sayadul Hoque",
  designCreditHref: "https://personal-website.sh-resource.cloud/",
} as const;
