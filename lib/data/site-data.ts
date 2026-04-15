export const companyName = "GETHYPED";

export const navLinks = [
  { label: "Expertises", href: "#" },
  { label: "Work", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
] as const;

export const contactInfo = {
  email: "info@gethyped.nl",
  emailHref: "mailto:info@gethyped.nl",
  phoneDisplay: "+31 6 1533 7496",
  phoneHref: "tel:+31615337496",
  addressLines: ["Beltrumsestraat 6,", "7141 AL Groenlo"] as const,
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Beltrumsestraat+6,+7141+AL+Groenlo",
} as const;

export const footerMeta = {
  copyrightLabel: "\u00a9 2025 Get Hyped",
  designCreditLabel: "\u00a9 Design by Mohammad Sayadul Hoque",
  designCreditHref: "https://personal-website.sh-resource.cloud/",
} as const;
