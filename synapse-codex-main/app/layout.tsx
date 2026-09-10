import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://synapsecodex.vn"),
  title: {
    default: "Synapse Codex — Giải pháp số cho doanh nghiệp và tổ chức",
    template: "%s | Synapse Codex",
  },
  description:
    "Synapse Codex cung cấp phần mềm quản lý doanh nghiệp, website, hạ tầng số, Google Workspace, Google Ads và đào tạo AI.",
  keywords: [
    "phát triển phần mềm",
    "phần mềm quản lý doanh nghiệp",
    "lập trình website",
    "hosting server domain",
    "Google Workspace",
    "Gmail doanh nghiệp",
    "Google Ads",
    "đào tạo AI",
    "Cần Thơ",
  ],
  authors: [{ name: "Synapse Codex" }],
  creator: "Synapse Codex",
  publisher: "Synapse Codex",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://synapsecodex.vn",
    siteName: "Synapse Codex",
    title: "Synapse Codex — Giải pháp số cho doanh nghiệp và tổ chức",
    description:
      "Synapse Codex cung cấp phần mềm quản lý doanh nghiệp, website, hạ tầng số, Google Workspace, Google Ads và đào tạo AI.",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Synapse Codex - Đối tác công nghệ cho doanh nghiệp Việt Nam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synapse Codex — Giải pháp số cho doanh nghiệp và tổ chức",
    description:
      "Synapse Codex cung cấp phần mềm quản lý doanh nghiệp, website, hạ tầng số, Google Workspace, Google Ads và đào tạo AI.",
    images: ["/images/og-image.svg"],
    creator: "@synapsecodex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/synapse-icon.svg",
    shortcut: "/icons/synapse-icon.svg",
    apple: "/icons/synapse-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
