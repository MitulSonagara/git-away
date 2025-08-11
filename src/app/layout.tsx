import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitAway – Keep Your GitHub Streak Alive",
  description:
    "GitAway automatically keeps your GitHub contribution graph green while you're away. Smart commit scheduling, AI messages, and streak protection for developers on vacation.",
  keywords: [
    "GitAway",
    "GitHub streak",
    "GitHub streak saver",
    "GitHub automation",
    "fake commits",
    "keep GitHub streak",
    "GitHub commit scheduler",
    "developer productivity",
    "vacation commits",
    "GitHub streak protection",

    "GitHub streak keeper",
    "GitHub contribution graph automation",
    "automated GitHub commits",
    "GitHub streak saver",
    "keep GitHub streak alive",

    // Long-tail keywords
    "how to maintain GitHub streak while on vacation",
    "automated commit scheduler GitHub",
    "GitHub streak protection tool",
    "fake GitHub commits for streak",
    "GitHub contribution automation service",

    // Feature-based keywords
    "AI commit messages GitHub",
    "GitHub OAuth automation",
    "commit scheduling tool",
    "developer productivity GitHub",
    "GitHub streak statistics",

    // Problem-solving keywords
    "never lose GitHub streak",
    "GitHub streak during holidays",
    "maintain coding streak automatically",
  ],
  authors: [{ name: "GitAway Team", url: "https://gitaway.app" }],
  creator: "GitAway",
  publisher: "GitAway",
  metadataBase: new URL("https://gitaway.app"),
  openGraph: {
    title: "GitAway – Keep Your GitHub Streak Alive",
    description:
      "Your streak doesn't need a break, even if you do. GitAway makes commits for you while you're away, keeping your contribution graph green with smart scheduling and AI messages.",
    url: "https://gitaway.app",
    siteName: "GitAway",
    images: [
      {
        url: "/og-image.png", // recommended size: 1200x630
        width: 1200,
        height: 630,
        alt: "GitAway – GitHub Streak Saver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitAway – Keep Your GitHub Streak Alive",
    description:
      "Keep your GitHub contribution graph green even while you're on vacation. Smart commit scheduling, AI messages, and streak protection.",
    images: ["/og-image.png"],
    creator: "@MitulSongara",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
