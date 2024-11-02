import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app-provider";
import Banner from "@/components/banner/banner";
import Navbar from "@/components/shared/navbar";

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
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased dark:bg-black`}>
        <AppProvider>
          <div className="">
            <Banner />
          </div>
          <Navbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
