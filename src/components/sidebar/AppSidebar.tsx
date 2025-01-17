"use client";

import {usePathname} from "next/navigation";
import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {NavUser} from "./nav-user";
import {ChartPie, CreditCard, GalleryVerticalEnd, Settings, Users} from 'lucide-react';
import Link from "next/link";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    userRole: string;
}

interface NavLinkProps {
    title: string;
    url: string;
    items: LinkProps[];
}

interface LinkProps {
    title: string;
    url: string;
    icon: React.ReactNode;
}

const AppSidebar: React.FC<AppSidebarProps> = ({userRole, ...props}: AppSidebarProps) => {
    const pathname = usePathname();

    const companyLinks = [
        {
            title: "Overview",
            url: "#",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: <ChartPie size={18}/>,
                },
                {
                    title: "Vacancies",
                    url: "/vacancies",
                    icon: <CreditCard size={18}/>,
                },
                {
                    title: "Employees",
                    url: "/employees",
                    icon: <Users size={18}/>,
                },
                {
                    title: "Profile",
                    url: "/profile/company@gmail.com",
                    icon: <Settings size={18}/>
                }
            ],
        },
    ]

    const hrLinks = [
        {
            title: "Overview",
            url: "#",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: <ChartPie size={18}/>,
                },
                {
                    title: "Loan",
                    url: "/loans",
                    icon: <CreditCard size={18}/>,
                },
                {
                    title: "Customers",
                    url: "/customers",
                    icon: <Users size={18}/>,
                },
                {
                    title: "Settings",
                    url: "/settings",
                    icon: <Settings size={18}/>
                }
            ],
        },
    ]


    const navLinks = userRole === "company" ? companyLinks : hrLinks;
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div
                                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4"/>
                                </div>
                                <div className="flex flex-col gap-2 leading-none">
                                    <span className="font-semibold">B2Y</span>
                                    <span className="">{userRole === "company" ? "Company" : "Human Resource"}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navLinks.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items
                                    .map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={pathname === item.url}>
                                                <Link href={item.url} className="flex items-center gap-2">
                                                    <span>{item.icon}</span>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}

export default AppSidebar

