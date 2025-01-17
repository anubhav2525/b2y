import React from 'react'

const AuthLayout = ({children}: { children: React.ReactElement }) => {
    return (
        <main className="min-h-screen w-full h-full">{children}</main>
    )
}
export default AuthLayout
