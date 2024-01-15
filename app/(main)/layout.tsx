import MainFooter from "@/components/main-footer";
import MainNavbar from "@/components/shared/main-navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full relative">
      <MainNavbar />

      <section className="w-full">{children}</section>

      <footer className="max-w-screen-2xl mx-auto px-4 xl:px-0">
        <MainFooter />
      </footer>
    </main>
  );
};
export default MainLayout;
