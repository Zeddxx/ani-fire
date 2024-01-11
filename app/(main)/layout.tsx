import MainNavbar from "@/components/shared/main-navbar"

const MainLayout = ({ children } : { children : React.ReactNode }) => {
  return (
    <main className="w-full relative">
        <MainNavbar />
        <section className="w-full">
            {children}
        </section>
    </main>
  )
}
export default MainLayout