'use client'

import MaxWidthContainer from "@/components/container/max-width-container"
import { useSession } from "next-auth/react"

const Dashboard = () => {
  const { data } = useSession()

  return (
    <MaxWidthContainer>
      <div className="px-4">
        <p>Underconstruction</p>
      </div>
    </MaxWidthContainer>
  )
}
export default Dashboard