import Navbar from "@/components/shared/navbar";
import Banner from "@/components/banner/banner";

export default function MarketingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="">{children}</div>
    </main>
  );
}
