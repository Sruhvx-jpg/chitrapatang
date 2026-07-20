import type { Metadata } from "next";
import { Geist, Geist_Mono, Yatra_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-yatra",
});

export const metadata: Metadata = {
  title: "Chitrapatang Terminal — AI-First Agile Scrum Management",
  description: "AI runs standups, auto-refines backlogs, predicts sprint risks, and resolves blockers before they happen. Experience the next evolution of agile scrum.",
  metadataBase: new URL("https://chitrapatang.com"), // placeholder for absolute URL resolution
  openGraph: {
    title: "Chitrapatang Terminal — AI-First Agile Scrum Management",
    description: "The first Scrum Master with a GPU. Predict risks, prevent blockers, and ship without friction.",
    url: "https://chitrapatang.com",
    siteName: "Chitrapatang Terminal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chitrapatang Terminal — AI-First Agile Scrum Management",
    description: "AI-first agile scrum management. The first Scrum Master with a GPU.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${yatraOne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-blue-600/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
