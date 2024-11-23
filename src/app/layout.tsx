import Navbar from "@/components/shared/navbar";
import AppProvider from "@/providers/app-provider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AniFire | Watch your favorite anime",
  description: "Watch your favorite anime for free without any ads & popups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} antialiased`}>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
