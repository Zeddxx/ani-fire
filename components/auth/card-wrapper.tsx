import { ReactNode } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Header from "./header"
import Social from "./social"
import BackButton from "./back-button"


type CardWrapperProps = {
    children: ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}


const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
  return (
    <Card className="max-w-sm w-full z-10 mx-auto xs:shadow-sm">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          />
        </CardFooter>
    </Card>
  )
}
export default CardWrapper