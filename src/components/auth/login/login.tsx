"use client";

import { Button } from "@/components/ui/buttons/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import LabeledInput from "@/components/ui/form/labeledInput";
import Header from "../layout/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validations/userSchema";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadCredentials, saveCredentials, clearCredentials } from "@/lib/rememberMe";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LoginResponse } from "@/types/authType";

export default function Login() {
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);

    const {
        login,
        loading,
    } = useAuth();

    const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onSubmit"
    });

    // Cargar credenciales guardadas
    useEffect(() => {
        const savedCredentials = loadCredentials();
        if (savedCredentials) {
            setValue("email", savedCredentials.email);
            setValue("password", savedCredentials.password);
            setRememberMe(true);
        }
    }, [setValue]);

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            const res = await login(data);
            if (res.success) {
                handleSuccessfulLogin(data);
                return;
            }
            handleAuthError(res);
        } catch (error) {
            console.log(error);
            
            setError("email", { type: "server", message: "" });
            setError("password", { type: "server", message: "" });
            setError("root", {
                type: "server",
                message: "Error al iniciar sesión. Por favor, inténtalo nuevamente."
            });
            toast.error("Error al iniciar sesión. Por favor, inténtalo nuevamente.");
        }
    };

    const handleSuccessfulLogin = (data: { email: string; password: string }) => {
        if (rememberMe) {
            saveCredentials(data.email, data.password);
        } else {
            clearCredentials();
        }

        toast.success("¡Inicio de sesión exitoso!");
        router.push("/dashboard/home");
    };

    const handleAuthError = (result: LoginResponse) => {
        setError("email", { type: "server", message: "" });
        setError("password", { type: "server", message: "" });

        setError("root", { type: "server", message: result.error });
        toast.error(result.error);
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <div className="w-full p-2">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-10 md:py-0">
                <div className="flex flex-col items-start w-[70%] md:w-[50%]">
                    <h1 className="text-2xl md:text-3xl text-blue font-bold">Inicio de sesión</h1>
                </div>
                <form className="flex flex-col gap-3 w-[70%] md:w-[50%] py-10" onSubmit={handleSubmit(onSubmit)}>
                    <LabeledInput
                        label="Correo institucional"
                        id="email"
                        type="email"
                        placeholder="Correo institucional"
                        required={true}
                        className={errors.email ? "border-error" : ""}
                        {...register("email")}
                    />
                    {errors.email && errors.email.message !== "" && (
                        <span className="text-xs md:text-sm text-error font-medium">{errors.email.message}</span>
                    )}
                    <LabeledInput
                        label="Contraseña"
                        id="password"
                        placeholder="Contraseña"
                        type="password"
                        required={true}
                        className={errors.password ? "border-error" : ""}
                        {...register("password")}
                    />
                    {errors.password && errors.password.message !== "" && (
                        <span className="text-xs md:text-sm text-error font-medium">{errors.password.message}</span>
                    )}
                    {errors.root && <span className="text-error text-[12px] md:text-sm">{errors.root.message as string}</span>}
                    <div className="flex items-center space-x-2 pb-2">
                        <Checkbox
                            id="terms"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked === true)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-[12px] md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Recordar por 30 días
                        </label>
                    </div>
                    <Button
                        variant="default"
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>
                    <Link
                        href="/forgot-password"
                        className="text-[12px] md:text-sm text-blue/80 hover:text-blue font-medium text-center hover:underline cursor-pointer"
                    >
                        ¿Olvidó su contraseña?
                    </Link>
                </form>
            </div>
        </div>
    );
}