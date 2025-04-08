"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { updatePasswordUser } from "@/actions/userAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/buttons/button"
import Header from "@/components/auth/layout/header"
import { changePasswordSchema } from "@/validations/changePasswordSchema"
import { ChangePasswordForm } from "@/types/passwordType"

import LabeledInput from "@/components/ui/form/labeledInput"

export default function ChangePasswordPage() {

    const [isPending, setIsPending] = useState(false)
    const router = useRouter()
    const { userSession } = useAuthStore()
    const { login } = useAuth()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        mode: "onSubmit"
    });

    const onSubmit = async (data: ChangePasswordForm) => {
        setIsPending(true)

        try {
            let userId = userSession?.userId || userSession?.sub

            // Si no hay sesión, hacer login transparente con contraseña temporal
            if (!userId) {
                const email = localStorage.getItem("recover-email")
                if (!email) {
                    toast.error("No se encontró el correo del usuario")
                    return
                }

                if (!data.currentPassword) {
                    throw new Error("La contraseña actual es requerida");
                }

                console.log("Email:", email)
                console.log("Contraseña actual:", data.currentPassword);
                if (!email) {
                    toast.error("No se encontró el correo del usuario")
                    return
                }
                await login({ email, password: data.currentPassword });

                // después de login, tomar el nuevo userId desde Zustand
                const refreshedUser = useAuthStore.getState().userSession
                userId = refreshedUser?.userId || refreshedUser?.sub

                console.log("Nuevo userId:", userId);
                
                
                if (!userId) {
                    toast.error("No se pudo obtener la información del usuario")
                    return
                }
            }

            const result = await updatePasswordUser({
                userId: Number.parseInt(userId),
                actualPassword: data.currentPassword || "",
                newPassword: data.newPassword || "",
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
                        <LabeledInput
                            label="Contraseña temporal"
                            id="currentPassword"
                            placeholder="Ingresa la contraseña temporal enviada a tu correo"
                            type="password"
                            required={true}
                            className={errors.currentPassword ? "border-error" : ""}
                            {...register("currentPassword")}
                        />
                        {errors.currentPassword && (
                            <span className="text-xs md:text-sm text-error font-medium">{errors.currentPassword.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <LabeledInput
                            label="Nueva contraseña"
                            id="newPassword"
                            placeholder="Ingresa tu nueva contraseña"
                            type="password"
                            required={true}
                            className={errors.newPassword ? "border-error" : ""}
                            {...register("newPassword")}
                        />
                        {errors.newPassword && (
                            <span className="text-xs md:text-sm text-error font-medium">{errors.newPassword.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <LabeledInput
                            label="Confirma tu contraseña"
                            id="confirmPassword"
                            placeholder="Confirma tu nueva contraseña"
                            type="password"
                            required={true}
                            className={errors.confirmPassword ? "border-error" : ""}
                            {...register("confirmPassword")}
                        />
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