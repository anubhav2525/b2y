import React from 'react'
import {SidebarTrigger} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Slash} from "lucide-react";
import VacancyAddForm from "@/app/(protected)/vacancies/_components/VacancyAddForm";

const CreateNewVacancy = () => {
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
                                <BreadcrumbLink href="/vacancies">Vacancies</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                Post a Job
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="max-w-5xl w-full mx-auto rounded-md border p-4">
                <VacancyAddForm/>
            </div>
        </div>
    )
}
export default CreateNewVacancy
