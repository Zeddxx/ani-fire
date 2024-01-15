import { cn } from "@/lib/utils";
import { BsGithub } from "react-icons/bs";
import { buttonVariants } from "./ui/button";

const MainFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center py-4">
        <p className="text-sm text-muted-foreground">All right reservers to its corresponding developer</p>

        <div className="flex items-center gap-x-3">
            <a href="https://github.com/Zeddxx" target="_blank" className={cn(buttonVariants({ variant: "link" }))}>
               Github <BsGithub className="ml-4" />
            </a>
        </div>
    </div>
  )
}
export default MainFooter