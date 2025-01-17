import React from 'react'
import {SidebarTrigger} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Slash} from "lucide-react";
import DataTable from "@/app/(protected)/employees/_components/DataTable";

const CompanyEmployee= () => {
    return (
        <div className="w-full h-full p-4">
            <div className="flex items-center gap-x-3 mb-3">
                <div>
                    <SidebarTrigger/>
                </div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Employees</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            {/*table*/}
            <div>
                <DataTable/>
            </div>
        </div>
    )
}

export default CompanyEmployee;