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
            url: "/home",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "Acerca de ORII",
                    url: "/home",
                },
            ],
        },
        {
            title: "Convenios",
            url: "/agreements",
            icon: Globe,
            items: [
                {
                    title: "Listar convenios",
                    url: "/agreements",
                },
                {
                    title: "Crear convenio",
                    url: "/agreements/create",
                },
            ],
        },
        {
            title: "Movilidad",
            url: "/movility",
            icon: PlaneTakeoff,
            items: [
                {
                    title: "Listar movilidades",
                    url: "/movility",
                },
                {
                    title: "Crear movilidad",
                    url: "/movility/create",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-blueDark text-white p-4 items-start">
                <Link href={"/"}>
                    <Image
                        src={"/ORII.webp"}
                        alt="Logo"
                        width={150}
                        height={150}
                        className="group-data-[collapsible=icon]:w-0"
                    />
                </Link>
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
}
