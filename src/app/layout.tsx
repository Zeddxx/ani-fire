import AppProvider from "@/providers/app-provider";
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
  metadataBase: new URL("http://ani-fire.vercel.app"),
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
      <body className={`${poppins.className} antialiased`}>
        <AppProvider>
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
