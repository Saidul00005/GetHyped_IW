import type { Metadata } from "next";

import {
  brandMarqueeData,
  expertiseData,
  heroData,
  statementData,
  workData,
} from "@/lib/data/homepage-data";
import {
  companyDisplayName,
  contactInfo,
  defaultSeoImagePath,
  siteUrl,
} from "@/lib/data/site-data";

const homepagePath = "/";
const homepageUrl = new URL(homepagePath, siteUrl).toString();
const defaultSeoImageUrl = new URL(defaultSeoImagePath, siteUrl).toString();

const expertiseSummary = expertiseData.map((item) => item.name).join(", ");
const featuredBrandsSummary = brandMarqueeData.brands.slice(0, 4).join(", ");
const workSummary = workData.items.map((item) => item.client).join(", ");

const homepageTitle = `${companyDisplayName} | Social Strategy, Content Creation, Activation & Data`;
const homepageDescription = `${heroData.subheadline} ${statementData.body} ${companyDisplayName} helps brands grow with ${expertiseSummary.toLowerCase()} and campaigns that deliver measurable results.`;

const keywords = [
  companyDisplayName,
  "social strategy",
  "content creation",
  "activation",
  "data driven marketing",
  "creative campaigns",
  "organic views",
  "measurable content",
  "Get Hyped",
];

export function getHomepageMetadata(): Metadata {
  return {
    title: homepageTitle,
    description: homepageDescription,
    keywords,
    alternates: {
      canonical: homepagePath,
    },
    openGraph: {
      title: homepageTitle,
      description: homepageDescription,
      url: homepagePath,
      siteName: companyDisplayName,
      locale: "nl_NL",
      type: "website",
      images: [
        {
          url: defaultSeoImagePath,
          alt: `${companyDisplayName} homepage preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: homepageTitle,
      description: homepageDescription,
      images: [defaultSeoImageUrl],
    },
  };
}

export function getHomepageJsonLd() {
  const organizationId = `${homepageUrl}#organization`;
  const websiteId = `${homepageUrl}#website`;
  const webpageId = `${homepageUrl}#webpage`;
  const servicesId = `${homepageUrl}#services`;
  const workId = `${homepageUrl}#work`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": organizationId,
        name: companyDisplayName,
        url: homepageUrl,
        image: defaultSeoImageUrl,
        email: contactInfo.email,
        telephone: contactInfo.phoneNumber,
        address: {
          "@type": "PostalAddress",
          streetAddress: contactInfo.streetAddress,
          postalCode: contactInfo.postalCode,
          addressLocality: contactInfo.addressLocality,
          addressCountry: contactInfo.addressCountry,
        },
        areaServed: contactInfo.addressCountry,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: contactInfo.email,
            telephone: contactInfo.phoneNumber,
            areaServed: contactInfo.addressCountry,
            availableLanguage: ["nl", "en"],
          },
        ],
        hasMap: contactInfo.mapHref,
        slogan: heroData.headlineLines.join(" "),
        description: `${statementData.title} ${statementData.body}`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homepageUrl,
        name: companyDisplayName,
        publisher: {
          "@id": organizationId,
        },
        description: homepageDescription,
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: homepageUrl,
        name: homepageTitle,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": organizationId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: defaultSeoImageUrl,
        },
        description: `${homepageDescription} Featured work includes ${workSummary}. Trusted by brands such as ${featuredBrandsSummary}.`,
        inLanguage: "nl",
        mentions: brandMarqueeData.brands.map((brand) => ({
          "@type": "Organization",
          name: brand,
        })),
      },
      {
        "@type": "OfferCatalog",
        "@id": servicesId,
        name: `${companyDisplayName} services`,
        itemListElement: expertiseData.map((item, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: item.name,
            description: `${item.title} ${item.desc}`,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": workId,
        name: `${companyDisplayName} featured work`,
        itemListElement: workData.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: item.title,
            about: item.client,
            description: workData.body,
          },
        })),
      },
    ],
  };
}

export function getHomepageJsonLdString() {
  return JSON.stringify(getHomepageJsonLd()).replace(/</g, "\\u003c");
}
