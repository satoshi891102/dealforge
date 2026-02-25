import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealForge — Package Your AI Expertise & Close More Deals",
  description:
    "The platform for AI consultants and agencies. Package services, generate proposals in 60 seconds, track pipeline, and close deals faster. Built for the new era of AI business.",
  openGraph: {
    title: "DealForge — Package Your AI Expertise & Close More Deals",
    description:
      "The platform for AI consultants and agencies. Package services, generate proposals in 60 seconds, track pipeline, and close deals faster.",
    url: "https://dealforge-xi.vercel.app",
    siteName: "DealForge",
    type: "website",
    images: [
      {
        url: "https://dealforge-xi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "DealForge Landing Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DealForge — Package Your AI Expertise & Close More Deals",
    description:
      "The platform for AI consultants and agencies. Generate proposals in 60 seconds, close more deals.",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
