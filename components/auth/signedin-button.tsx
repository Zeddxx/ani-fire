'use client';

import { useSession } from "next-auth/react";
import { UserLoading } from "../loaders/user-loading";

const SignedInButton = ({ children } : { children: React.ReactNode }) => {
  const { status } = useSession()
  
  if(status === "unauthenticated") return null;
  if(status === "loading") return <UserLoading />

  return (
    <div className="">
        {children}
    </div>
  )
}
export default SignedInButton