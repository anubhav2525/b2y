import React from 'react'
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";

const CompanyLayout = ({children}: { children: React.ReactNode }) => {
    const userRole = "company";
    return (
        <SidebarProvider>
            <AppSidebar userRole={userRole}/>
            <SidebarInset>
                <div>{children}</div>
            </SidebarInset>
        </SidebarProvider>

    )
}
export default CompanyLayout
