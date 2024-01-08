import MainNavbar from "@/components/shared/main-navbar"

const MainLayout = ({ children } : { children : React.ReactNode }) => {
  return (
    <main className="w-full relative">
        <div className="bg-gradient-to-b from-rose-900/40 h-96 -z-10 w-full to-transparent absolute top-0"></div>
        <MainNavbar />
        <section className="w-full">
            {children}
        </section>
    </main>
  )
}
export default MainLayout