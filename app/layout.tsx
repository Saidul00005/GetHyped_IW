import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { companyDisplayName, siteUrl } from "@/lib/data/site-data";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: companyDisplayName,
    template: `%s | ${companyDisplayName}`,
  },
  description:
    "Get Hyped helps brands grow with social strategy, content creation, activation, and data-driven campaigns.",
  applicationName: companyDisplayName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
