import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import CompanyInfoTab from "@/components/company/settings/CompanyInfoTab";
import CompanyBasicInfo from "@/components/company/settings/CompanyBasicInfo";
import CompanySocialTab from "@/components/company/settings/CompanySocialTab";
import CompanyContactTab from "@/components/company/settings/CompanyContactTab";
import {CircleUser, Phone, Globe, User, Slash} from 'lucide-react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import DocumentFileTab from "@/components/company/settings/DocumentFileTab";

const CompanyProfilePage = () => {
    return (
        <div className="w-full h-full p-4">
            <div className="flex items-center gap-2 mb-3">
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
                                <BreadcrumbPage>Profile</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            {/*tab list*/}
            <div className="w-full max-w-5xl mx-auto">
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="info" className="px-4 py-2 flex gap-2 items-center">
                            <span><CircleUser className="text-blue-600 md:h-5 md:w-5 h-4 w-4"/></span>
                            <span className="text-xs lg:text-sm">Company</span>
                        </TabsTrigger>
                        <TabsTrigger value="basic" className="px-4 py-2 flex gap-2 items-center">
                            <span><User className="text-blue-600 md:h-5 md:w-5 h-4 w-4"/></span>
                            <span className="text-xs lg:text-sm">Basic</span>
                        </TabsTrigger>
                        <TabsTrigger value="social" className="px-4 py-2 flex gap-2 items-center">
                            <span><Globe className="text-blue-600 md:h-5 md:w-5 h-4 w-4"/></span>
                            <span className="text-xs lg:text-sm">Socials</span>
                        </TabsTrigger>
                        <TabsTrigger value="contact" className="px-4 py-2 flex gap-2 items-center">
                            <span><Phone className="text-blue-600 md:h-5 md:w-5 h-4 w-4"/></span>
                            <span className="text-xs lg:text-sm">Contact</span>
                        </TabsTrigger>
                        <TabsTrigger value="document" className="px-4 py-2 flex gap-2 items-center">
                            <span><Phone className="text-blue-600 md:h-5 md:w-5 h-4 w-4"/></span>
                            <span className="text-xs lg:text-sm">Documents</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="info"><CompanyInfoTab/></TabsContent>
                    <TabsContent value="basic"><CompanyBasicInfo/> </TabsContent>
                    <TabsContent value="social"><CompanySocialTab/></TabsContent>
                    <TabsContent value="contact"><CompanyContactTab/></TabsContent>
                    <TabsContent value="document"><DocumentFileTab/></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
export default CompanyProfilePage;

/*
registration number
documents-> certificate
 */