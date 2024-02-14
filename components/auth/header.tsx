import { cn } from "@/lib/utils"
import { Open_Sans } from "next/font/google"

type HeaderProps = {
    label: string
}

const font = Open_Sans({
    subsets: ['latin'],
    weight: ["700"]
})

const Header = ({ label } : HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-1 items-center justify-center">
        <h1 className={cn("text-5xl font-bold", font.className)}>
            Ani
            <span className="text-primary">Fire</span>
        </h1>
        <p>{label}</p>
    </div>
  )
}
export default Header