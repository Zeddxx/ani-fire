'use client';

import { useSession } from "next-auth/react";

const SignedOutButton = ({ children } : { children: React.ReactNode }) => {
    const { status } = useSession()
    
    if(status === "authenticated") return null;
  
    return (
      <div className="">
          {children}
      </div>
    )
  }
export default SignedOutButton