import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

// Self-hosted (OFL-licensed) so there's no third-party font request at build or run time.
const youngSerif = localFont({
  src: "../fonts/young-serif.woff2",
  variable: "--font-young-serif",
  display: "swap",
});

const hanken = localFont({
  src: "../fonts/hanken-grotesk-var.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

const martian = localFont({
  src: "../fonts/martian-mono-var.woff2",
  variable: "--font-martian",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelana · A travel passport that lives in your wallet",
  description:
    "Check in at partner stays across Bali, collect stamps, and turn slow travel into free nights. A Web3 concept by Iman Rafief.",
};

export const viewport: Viewport = {
  themeColor: "#f8f3ec",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${hanken.variable} ${martian.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
