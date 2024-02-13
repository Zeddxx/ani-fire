import React from "react"

const AuthLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-black bg-white">
        
        <section className="h-screen w-full flex justify-center items-center">
            {children}
        </section>
    </div>
  )
}
export default AuthLayout