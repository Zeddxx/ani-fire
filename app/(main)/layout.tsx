import MainFooter from "@/components/main-footer";
import MainNavbar from "@/components/shared/main-navbar";
import { Suspense } from "react";

function SearchBarFallback() {
  return <>placeholder</>
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full relative">
      <>
      <MainNavbar />
      <div className="h-8 flex items-center justify-center max-w-screen-2xl px-2 bg-primary">
        <p className="text-white text-sm">Streaming servers are down right now! 🥲🦛</p>
      </div>
      </>

      <section className="w-full">{children}</section>

      <footer className="max-w-screen-2xl mx-auto px-4 xl:px-0">
        <Suspense fallback={<SearchBarFallback />}>
          <MainFooter />
        </Suspense>
      </footer>
    </main>
  );
};
export default MainLayout;
