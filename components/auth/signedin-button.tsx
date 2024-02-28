'use client';

import { useSession } from "next-auth/react";

const SignedInButton = ({ children } : { children: React.ReactNode }) => {
  const { status } = useSession()
  
  if(status === "unauthenticated") return null;

  return (
    <div className="">
        {children}
    </div>
  )
}
export default SignedInButton