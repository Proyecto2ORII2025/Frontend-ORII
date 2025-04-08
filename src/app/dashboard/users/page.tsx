"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/card"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select"
import { Label } from "@/components/ui/typography/label"
import LabeledInput from "@/components/ui/form/labeledInput"
import { UserPlus, Trash2 } from "lucide-react"
import { formSchema, type UserFormValues } from "@/validations/formSchema"
import { createUser } from "@/actions/userAction"
import { toast } from "sonner"
import { SelectField } from "@/components/ui/form/selectField"
import { CreateUserResponse } from "@/types/userType"

export default function UsersPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        watch,
        reset,
    } = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            faculty: "",
            role: "",
        },
    })

    const onSubmit = async (data: UserFormValues) => {
        try {
            const res = await createUser(data)
            if (res.success) {
                handleSuccessfulCreateUser(data)
                return
            }
            handleCreateUserError(res)
        } catch (error) {
            console.error(error);
            handleCreateUserError({
                success: false,
                error: "Error inesperado",
                field: "root",
            })
        }
    }

    const handleSuccessfulCreateUser = (data: UserFormValues) => {
        toast.success("Usuario creado correctamente")
        reset()
    }

    const handleCreateUserError = (res: CreateUserResponse) => {
        setError("name", { type: "server", message: "" })
        setError("lastName", { type: "server", message: "" })
        setError("email", { type: "server", message: "" })
        setError("role", { type: "server", message: "" })
        setError("faculty", { type: "server", message: "" })
        setError("root", {
            type: "server",
            message: res.error,
        })
        toast.error(res.error)
    }

    return (
        <div className="container">
            <Card className="max-w-2xl border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue/10 to-transparent pb-6">
                    <div className="flex items-center gap-3">
                        <UserPlus className="h-6 w-6 text-blue" />
                        <CardTitle className="text-blueDark text-2xl">Registro de Enlace</CardTitle>
                    </div>
                    <CardDescription className="text-blueDark/70 mt-2">
                        Complete el formulario para crear un nuevo enlace
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 px-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <LabeledInput
                                    label="Nombre"
                                    {...register("name")}
                                    name="name"
                                    type="text"
                                    placeholder="Ingresa el nombre"
                                    required
                                    className={errors.name ? "border-error" : ""}
                                />
                                {errors.name && errors.name.message !== "" && (
                                    <span className="text-xs md:text-sm text-error font-medium mt-1 block">{errors.name.message}</span>
                                )}
                            </div>

                            <div>
                                <LabeledInput
                                    label="Apellido"
                                    {...register("lastName")}
                                    name="lastName"
                                    type="text"
                                    placeholder="Ingresa el apellido"
                                    required
                                    className={errors.lastName ? "border-error" : ""}
                                />
                                {errors.lastName && errors.lastName.message !== "" && (
                                    <span className="text-xs md:text-sm text-error font-medium mt-1 block">
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <LabeledInput
                                label="Email"
                                {...register("email")}
                                value={watch("email")}
                                name="email"
                                type="email"
                                placeholder="Ingresa el email"
                                required
                                className={errors.email ? "border-error" : ""}
                            />
                            {errors.email && errors.email.message !== "" && (
                                <span className="text-xs md:text-sm text-error font-medium mt-1 block">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                id="role"
                                label="Rol"
                                tooltipText="Seleccione el rol del usuario"
                                {...register("role")}
                                options={[
                                    { value: "ADMIN", label: "Administrador" },
                                    { value: "USER", label: "Usuario" },
                                ]}
                                defaultValue={watch("role")}
                                onValueChange={(value) => setValue("role", value)}
                                value={watch("role")}
                                error={errors.role?.message}
                                className={errors.role ? "border-error text-blueDark" : "text-blueDark"}
                                placeholder="Seleccione un rol"
                            />

                            <SelectField
                                id="faculty"
                                label="Facultad"
                                tooltipText="Seleccione la facultad del usuario"
                                {...register("faculty")}
                                options={[
                                    { value: "FIET", label: "Facultad de Ingeniería Electrónica y Telecomunicaciones" },
                                    { value: "FIC", label: "Facultad de Ingeniería Civil" },
                                    { value: "FCS", label: "Facultad de Ciencias de la Salud" },
                                    { value: "FDCPS", label: "Facultad de Derecho y Ciencias Políticas y Sociales" },
                                    { value: "FACNED", label: "Facultad de Ciencias Naturales, Exactas y de la Educación" },
                                    { value: "FCH", label: "Facultad de Ciencias Humanas" },
                                    { value: "FA", label: "Facultad de Artes" },
                                    { value: "FCA", label: "Facultad de Ciencias Agropecuarias" },
                                    { value: "FCCEA", label: "Facultad de Ciencias Contables, Económicas y Administrativas" },
                                ]}
                                defaultValue={watch("faculty")}
                                value={watch("faculty")}
                                onValueChange={(value) => setValue("faculty", value)}
                                error={errors.faculty?.message}
                                className={errors.faculty ? "border-error text-blueDark" : "text-blueDark"}
                                placeholder="Seleccione una facultad"
                            />
                        </div>

                        <div className="pt-4 flex gap-4 justify-center">
                            <Button
                                type="submit"
                                variant={"default"}
                            >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Crear enlace
                            </Button>

                            <Button
                                type="button"
                                variant={"delete"}
                                className="w-2/4"
                                onClick={() => {
                                    reset()
                                }}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Vaciar formulario
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
