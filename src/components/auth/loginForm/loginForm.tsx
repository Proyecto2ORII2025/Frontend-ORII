"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import LabeledInput from "@/components/ui/labeledInput";
import LoginHeader from "./header/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validations/userSchema";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";

export default function LoginForm() {
    const router = useRouter();
    
    // Usar el contexto de autenticación
    const { singin, user, loginError } = useContext(AuthContext);
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onSubmit"
    });

    // Redireccionar según el rol del usuario
    useEffect(() => {
        if (!user) return;

        if (user.role === "ADMIN") {
            router.push("/admin");
            return;
        }

        if (user.role === "USER") {
            router.push("/dashboard/home");
            return;
        }
    }, [user, router]);

    type FormData = {
        email: string;
        password: string;
    }

    const onSubmit = async (data: FormData) => {
        console.log("Datos enviados:", data);
        
        // Usar la función de autenticación del contexto
        await singin(data);
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <div className="w-full p-2">
                <LoginHeader />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-10 md:py-0">
                <div className="flex flex-col items-start w-1/2">
                    <h1 className="text-2xl md:text-3xl text-blue font-bold">
                        Inicio de sesión
                    </h1>
                </div>
                <form className="flex flex-col gap-3 w-1/2 py-10" onSubmit={handleSubmit(onSubmit)}>
                    <LabeledInput
                        label="Correo institucional"
                        id="email"
                        type="email"
                        placeholder="Correo institucional"
                        required={true}
                        {...register("email")}
                    />
                    {errors.email && <span className="text-error text-[12px] md:text-sm">{errors.email.message}</span>}

                    <LabeledInput
                        label="Contraseña"
                        id="password"
                        placeholder="Contraseña"
                        type="password"
                        required={true}
                        {...register("password")}
                    />
                    {errors.password && <span className="text-error text-[12px] md:text-sm">{errors.password.message}</span>}
                    
                    {loginError && (
                        <span className="text-error text-[12px] md:text-sm">
                            Usuario o contraseña incorrectos
                        </span>
                    )}
                    
                    <div className="flex items-center space-x-2 pb-2">
                        <Checkbox id="terms"/>
                        <label
                            htmlFor="terms"
                            className="text-[12px] md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Recordar por 30 días
                        </label>
                    </div>
                    
                    <Button type="submit" className="w-full">
                        Iniciar sesión
                    </Button>
                    
                    <span className="text-gray-700 text-center">ó</span>
                    
                    <Button variant="secondary" type="button" className="w-full">
                        <Image src="/google.svg" alt="Google" height={20} width={20} className="block group-hover:hidden" />
                        <Image src="/googlewhite.svg" alt="Google" height={20} width={20} className="hidden group-hover:block" />
                        <span className="text-[12px] md:text-sm">Iniciar sesión con Google</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}