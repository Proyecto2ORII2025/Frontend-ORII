"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { updatePasswordUser } from "@/actions/userAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/buttons/button"
import Header from "@/components/auth/layout/header"

// Validation schema
const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "La contraseña actual es obligatoria"),
        newPassword: z
            .string()
            .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
            .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
            .regex(/\d/, "Debe contener al menos un número"),
        confirmPassword: z.string().min(1, "La confirmación es obligatoria"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

type ChangePasswordForm = z.infer<typeof passwordSchema>

export default function ChangePasswordPage() {
    // Estado independiente para cada campo de contraseña
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()
    const { userSession } = useAuthStore()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = async (data: ChangePasswordForm) => {
        setIsPending(true)

        try {
            let userId = userSession?.userId || userSession?.sub

            // Si no hay sesión, hacer login transparente con contraseña temporal
            if (!userId) {
                const email = localStorage.getItem("recover-email") // o pásalo como prop/query
                if (!email) {
                    toast.error("No se encontró el correo del usuario")
                    return
                }

                await login({ email, password: data.currentPassword })

                // después de login, tomar el nuevo userId desde Zustand
                const refreshedUser = useAuthStore.getState().userSession
                userId = refreshedUser?.userId || refreshedUser?.sub

                if (!userId) {
                    toast.error("No se pudo obtener la información del usuario")
                    return
                }
            }

            const result = await updatePasswordUser({
                userId: Number.parseInt(userId),
                actualPassword: data.currentPassword,
                newPassword: data.newPassword,
            })

            if (result.success) {
                toast.success("Contraseña actualizada correctamente")
                reset()
                router.push("/")
            } else {
                toast.error(result.error || "Error al actualizar la contraseña")
            }
        } catch (error) {
            toast.error("Error al procesar la solicitud")
            console.error("Error al actualizar la contraseña:", error)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <div className="w-full p-2">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-10 md:py-0">
                <div className="flex flex-col items-start w-[70%] md:w-[50%]">
                    <h1 className="text-2xl md:text-3xl text-blue font-bold">Actualizar Contraseña</h1>
                </div>
                <form className="flex flex-col gap-3 w-[70%] md:w-[50%] py-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="temporalPassword" className="text-sm font-medium">
                            Contraseña temporal
                        </label>
                        <div
                            className={`flex items-center border rounded-md overflow-hidden ${errors.currentPassword ? "border-error" : "border-input"}`}
                        >
                            <input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full py-2 px-3 outline-none"
                                placeholder="Contraseña temporal"
                                {...register("currentPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="p-2 text-gray-500 hover:text-gray-700"
                            >
                                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <span className="text-xs md:text-sm text-error font-medium">{errors.currentPassword.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="text-sm font-medium">
                            Nueva contraseña
                        </label>
                        <div
                            className={`flex items-center border rounded-md overflow-hidden ${errors.newPassword ? "border-error" : "border-input"}`}
                        >
                            <input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                className="w-full py-2 px-3 outline-none"
                                placeholder="Nueva contraseña"
                                {...register("newPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="p-2 text-gray-500 hover:text-gray-700"
                            >
                                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <span className="text-xs md:text-sm text-error font-medium">{errors.newPassword.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirmar nueva contraseña
                        </label>
                        <div
                            className={`flex items-center border rounded-md overflow-hidden ${errors.confirmPassword ? "border-error" : "border-input"}`}
                        >
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full py-2 px-3 outline-none"
                                placeholder="Confirmar nueva contraseña"
                                {...register("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="p-2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-xs md:text-sm text-error font-medium">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full mt-4">
                        {isPending ? "Actualizando..." : "Actualizar contraseña"}
                    </Button>
                </form>
            </div>
        </div>
    )
}