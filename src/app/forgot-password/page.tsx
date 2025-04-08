"use client";

import { forgotPasswordUser } from "@/actions/userAction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/buttons/button";
import Header from "@/components/auth/layout/header";
import LabeledInput from "@/components/ui/form/labeledInput";

interface ForgotPasswordForm {
    email: string;
}

export default function ForgotPasswordPage() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>();

    const onSubmit = async (data: ForgotPasswordForm) => {
        setIsPending(true);

        try {
            const response = await forgotPasswordUser(data.email);
            localStorage.setItem("recover-email", data.email);

            if (response.success) {
                toast.success("Correo enviado. Revisa tu bandeja.");
                router.push("/change-password");
            } else {
                toast.error(response.error || "Error al enviar correo.");
            }
        } catch (error) {
            toast.error("Error al procesar la solicitud");
            console.error("Error al recuperar contraseña:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <div className="w-full p-2">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-10 md:py-0">
                <div className="flex flex-col items-start w-[70%] md:w-[50%]">
                    <h1 className="text-2xl md:text-3xl text-blue font-bold">Recuperar Contraseña</h1>
                </div>
                <form className="flex flex-col gap-3 w-[70%] md:w-[50%] py-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1 w-full">
                        <LabeledInput
                            label="Correo institucional"
                            id="email"
                            type="email"
                            placeholder="Correo institucional"
                            required={true}
                            className={errors.email ? "border-error" : ""}
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <span className="text-xs md:text-sm text-error font-medium">{errors.email.message}</span>
                    )}

                    <Button type="submit" disabled={isPending} className="w-full mt-4">
                        {isPending ? "Enviando..." : "Enviar enlace de recuperación"}
                    </Button>
                </form>
            </div>
        </div>
    );
}