import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DealForge — AI Services Deal Management",
    template: "%s | DealForge",
  },
  description:
    "Package your AI expertise, generate proposals in 60 seconds, and close more deals. DealForge turns AI builders into deal closers.",
  keywords: [
    "AI services",
    "deal management",
    "proposal generator",
    "AI agency",
    "consulting",
    "pipeline management",
  ],
  openGraph: {
    title: "DealForge — AI Services Deal Management",
    description:
      "Package your AI expertise, generate proposals in 60 seconds, and close more deals.",
    url: "https://dealforge-xi.vercel.app",
    siteName: "DealForge",
    type: "website",
    images: [
      {
        url: "https://dealforge-xi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "DealForge — AI Services Deal Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DealForge — AI Services Deal Management",
    description:
      "Package your AI expertise, generate proposals in 60 seconds, and close more deals.",
    images: ["https://dealforge-xi.vercel.app/og-image.png"],
  },
  metadataBase: new URL("https://dealforge-xi.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
