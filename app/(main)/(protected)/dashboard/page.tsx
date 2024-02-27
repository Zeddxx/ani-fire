'use client'

import { logout } from "@/actions/logout"
import { useSession } from "next-auth/react"

const Dashboard = () => {
  const { data } = useSession()

  const onClick = () => {
    logout()
  }
  return (
    <div className="dark:text-white">
        {JSON.stringify(data, null, 2)}
        <form>
            <button onClick={onClick} type="submit">
                Sign out
            </button>
        </form>
    </div>
  )
}
export default Dashboard