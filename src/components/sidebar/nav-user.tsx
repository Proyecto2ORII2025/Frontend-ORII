"use client"

import {
    ChevronsUpDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/navigation/sidebar"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";
import { useAuthStore } from "@/store/auth"
import { UserRole } from "@/types/userType";
import { Badge } from "../ui/typography/badge"

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole) || 'USER';

    const handleLogout = useCallback(async () => {
        try {
            setIsLoading(true);
            await logout();

            onClose();

            router.push('/');

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            onClose();
            router.push('/');
        } finally {
            setIsLoading(false);
        }
    }, [logout, onClose, router]);

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <span className="truncate text-xs">{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <span className="pl-2 font-bold text-blue">
                                    Rol:
                                </span>
                                <Badge
                                    className="mx-2 mb-2 mt-1"
                                    variant={
                                        role === "SU" ? "su" :
                                            role === "ADMIN" ? "admin" :
                                                "user"
                                    }
                                >
                                    {role === "SU" ? "Super Usuario" : role === "ADMIN" ? "Administrador" : "Usuario"}
                                </Badge>

                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={(e) => {
                                e.preventDefault();
                                onOpen();
                            }}>
                                <LogOut />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "z-50",
                    base: "z-50",
                    wrapper: "z-50"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Cerrar sesión
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Confirma que quiere cerrar sesión?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="secondaryWithoutHover"
                                    onClick={() => onClose()}
                                    className="relative z-50 cursor-pointer pointer-events-auto"
                                >
                                    No
                                </Button>
                                <Button
                                    variant="delete"
                                    onClick={handleLogout}
                                    disabled={isLoading}
                                    className="relative z-50 cursor-pointer pointer-events-auto"
                                >
                                    {isLoading ? "Cerrando..." : "Si"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}