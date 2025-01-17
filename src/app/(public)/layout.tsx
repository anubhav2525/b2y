import React from 'react'
import Navbar from "@/components/Navbar/Navbar";

const PublicLayout = ({children}: { children: React.ReactElement }) => {
    return (
        <>
            <Navbar/>
            <main className="min-h-screen w-full h-full">{children}</main>
        </>
    )
}
export default PublicLayout
