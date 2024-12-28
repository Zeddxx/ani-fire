import MainWrapper from "./_components/shared/layout/main-wrapper";
import Navbar from "./_components/shared/navbar";

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainWrapper>
      <Navbar />
      {children}
    </MainWrapper>
  );
}
