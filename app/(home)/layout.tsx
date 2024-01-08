import HomeMenu from "@/components/shared/home-menu";

const HomeLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    // background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(100,43,115,1) 0%, rgba(4,0,4,1) 90% );
    <main className="relative h-full w-full">
      <div className="absolute top-0 -z-10 w-full h-96 bg-gradient-to-b from-[rgba(100,43,115,1)0%] to-[rgba(4,0,4,1)90%]"></div>
      <HomeMenu />

      <section className="w-full max-w-[1420px] mx-auto h-auto xl:px-0 px-4 dark:bg-stone-900">
        {children}
      </section>
    </main>
  );
};
export default HomeLayout;
