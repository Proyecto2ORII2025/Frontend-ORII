"use client"

import * as React from "react"
import {
    Globe,
    Home,
    ChartColumnIncreasing,
    PlaneTakeoff,
    UserRoundPlus
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
    user: {
        name: "Mario Perdomo",
        email: "cmperdomo@unicauca.edu.co",
        avatar: "/img/user.png",
    },
    navMain: [
        {
            title: "Inicio",
            url: "/dashboard/home",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "Acerca de ORII",
                    url: "/dashboard/home",
                },
            ],
        },
        {
            title: "Convenios",
            url: "/dashboard/agreements",
            icon: Globe,
            items: [
                {
                    title: "Listar convenios",
                    url: "/dashboard/agreements",
                },
                {
                    title: "Crear convenio",
                    url: "/dashboard/agreements/create",
                },
            ],
        },
        {
            title: "Movilidad",
            url: "/dashboard/movility",
            icon: PlaneTakeoff,
            items: [
                {
                    title: "Listar movilidades",
                    url: "/dashboard/movility",
                },
                {
                    title: "Crear movilidad",
                    url: "/dashboard/movility/create",
                },
            ],
        },
        {
            title: "Estadisticas",
            url: "/dashboard/statistics",
            icon: ChartColumnIncreasing,
            items: [
                {
                    title: "Reportes",
                    url: "#",
                },
                {
                    title: "Gráficos",
                    url: "#",
                },
            ],
        },
        {
            title: "Registrar usuarios",
            url: "#",
            icon: UserRoundPlus,
            items: [
                {
                    title: "Crear usuario",
                    url: "#",
                },
            ],
        }
    ]
}

export const AppSidebar = React.memo(function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <Image
                    src={"/logos/ORII.webp"}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="group-data-[collapsible=icon]:w-0 orii-logo"
                    priority
                />
            </SidebarHeader>
            <SidebarContent className="bg-blueDark text-white pt-8">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-blueDark text-white">
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
});