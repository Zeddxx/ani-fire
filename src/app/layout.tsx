import AppProvider from "@/providers/app-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ani-fire.vercel.app"),
  title: "AniFire | Watch your favorite anime",
  description: "Watch your favorite anime for free without any ads & popups.",
  openGraph: {
    images: "/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} antialiased`}>
        <AppProvider>
          <main>{children}</main>
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}
