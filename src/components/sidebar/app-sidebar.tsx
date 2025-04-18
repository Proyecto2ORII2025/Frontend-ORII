"use client";

import * as React from "react";
import {
    Globe,
    Home,
    ChartColumnIncreasing,
    PlaneTakeoff,
    UserRoundPlus,
    LucideIcon,
    X,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { SidebarTrigger, useSidebar } from "@/components/ui/navigation/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/navigation/sidebar";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";
import SkeletonLoader from "@/components/ui/skeletons/sidebar-skeleton";

interface NavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items: Array<{ title: string; url: string }>;
    roles?: UserRole[];
}

const data = {
    navMain: [
        {
            title: "Inicio",
            url: "/dashboard/home",
            icon: Home,
            isActive: true,
            items: [{ title: "Acerca de ORII", url: "/dashboard/home" }],
            roles: ['SU', 'ADMIN', 'USER']
        },
        {
            title: "Convenios",
            url: "/dashboard/agreements",
            icon: Globe,
            items: [
                { title: "Listar convenios", url: "/dashboard/agreements" },
                { title: "Crear convenio", url: "/dashboard/agreements/create" },
            ],
            roles: ['ADMIN', 'USER']
        },
        {
            title: "Movilidad",
            url: "/dashboard/movility",
            icon: PlaneTakeoff,
            items: [
                { title: "Listar movilidades", url: "/dashboard/movility" },
                { title: "Crear movilidad", url: "/dashboard/movility/create" },
            ],
            roles: ['ADMIN', 'USER']
        },
        {
            title: "Estadisticas",
            url: "/dashboard/statistics",
            icon: ChartColumnIncreasing,
            items: [{ title: "Gráficos", url: "/dashboard/statistics" }],
            roles: ['ADMIN', 'USER']
        },
        {
            title: "Registrar enlace",
            url: "/dashboard/users",
            icon: UserRoundPlus,
            roles: ['SU']
        },
    ] as NavItem[],
};

export const AppSidebar = React.memo(function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {

    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = userSession?.role as UserRole;
    const { isMobile } = useSidebar();
    const { toggleSidebar } = useSidebar()

    const filteredNavMain = data.navMain.filter((item) => {
        return !item.roles || item.roles.includes(role);
    });

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <div className="flex justify-between w-full">
                    <Image
                        src={"/logos/ORII.webp"}
                        alt="Logo"
                        width={150}
                        height={150}
                        className="group-data-[collapsible=icon]:w-0 orii-logo"
                        priority
                    />
                    {isMobile ? (
                        <button onClick={toggleSidebar}>
                            <X className="text-white size-4 hover:bg-transparent hover:text-white" />
                        </button>
                    ) :
                        <SidebarTrigger className="text-white size-4 hover:bg-transparent hover:text-white" />
                    }
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-blueDark text-white pt-8">
                {!userSession ? (
                    <SkeletonLoader variant="main" count={4} />
                ) : (
                    <NavMain items={filteredNavMain} />
                )}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
});