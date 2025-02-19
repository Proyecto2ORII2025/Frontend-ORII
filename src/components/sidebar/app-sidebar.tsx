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
import Link from "next/link"
import Image from "next/image"

const data = {
    user: {
        name: "Mario Perdomo",
        email: "cmperdomo@unicauca.edu.co",
        avatar: "/user.png",
    },
    navMain: [
        {
            title: "Inicio",
            url: "#",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "Acerca de ORII",
                    url: "#",
                },
            ],
        },
        {
            title: "Convenios",
            url: "#",
            icon: Globe,
            items: [
                {
                    title: "Crear convenio",
                    url: "#",
                },
            ],
        },
        {
            title: "Movilidad",
            url: "#",
            icon: PlaneTakeoff,
            items: [
                {
                    title: "Solicitudes",
                    url: "#",
                },
                {
                    title: "Estudiantes",
                    url: "#",
                },
            ],
        },
        {
            title: "Estadisticas",
            url: "#",
            icon: ChartColumnIncreasing,
            items: [
                {
                    title: "Reportes",
                    url: "#",
                },
                {
                    title: "Estadisticas",
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
                    title: "Estudiantes",
                    url: "#",
                },
            ],
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <Link href={"/"}>
                    <Image
                        src={"/ORII.webp"}
                        alt="Logo"
                        width={180}
                        height={180}
                        className="group-data-[collapsible=icon]:w-0"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-blueDark text-white pt-10">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-blueDark text-white">
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
