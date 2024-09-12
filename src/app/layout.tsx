import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const openSans = Roboto({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
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
      <body className={`${openSans.className} antialiased`}>{children}</body>
    </html>
  );
}
