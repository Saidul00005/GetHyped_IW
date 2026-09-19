export const companyName = "GETHYPED";
export const companyDisplayName = "Get Hyped";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://replace-with-production-url.example";

export const defaultSeoImagePath = "/images/Homepage/Statement/Image1.jpg";

export const navLinks = [
  { label: "Expertises", href: "/expertises" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactInfo = {
  email: "hello@example.com",
  emailHref: "mailto:hello@example.com",
  phoneDisplay: "+1 (555) 010-2000",
  phoneHref: "tel:+15550102000",
  phoneNumber: "+15550102000",
  addressLines: ["123 Creative Avenue,", "Suite 400, Amsterdam 1012 AB"] as const,
  streetAddress: "123 Creative Avenue, Suite 400",
  postalCode: "1012 AB",
  addressLocality: "Amsterdam",
  addressCountry: "NL",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=123+Creative+Avenue,+Amsterdam+1012+AB",
} as const;

export const footerMeta = {
  copyrightLabel: "\u00a9 2025 Get Hyped",
  designCreditLabel: "\u00a9 Design by Mohammad Sayadul Hoque",
  designCreditHref: "https://personal-website.sh-resource.cloud/",
} as const;

/** Official brand SVGs from the Simple Icons npm package (jsDelivr). */
const socialIconsCdnBase =
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons";

export function getSocialIconSrc(iconSlug: string) {
  return `${socialIconsCdnBase}/${iconSlug}.svg`;
}

export const socialLinks = [
  { label: "LinkedIn", href: "#", iconSlug: "linkedin" },
  { label: "TikTok", href: "#", iconSlug: "tiktok" },
  { label: "Instagram", href: "#", iconSlug: "instagram" },
  { label: "YouTube", href: "#", iconSlug: "youtube" },
] as const;
