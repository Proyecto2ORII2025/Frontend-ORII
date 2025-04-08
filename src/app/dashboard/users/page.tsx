"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/card"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select"
import { Label } from "@/components/ui/typography/label"
import LabeledInput from "@/components/ui/form/labeledInput"
import { UserPlus } from "lucide-react"
import { formSchema, type FormValues } from "@/validations/formSchema"
import { createUser } from "@/actions/userAction"
import { toast } from "sonner"
import { SelectField } from "@/components/ui/form/selectField"

export default function UsersPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            faculty: "",
            role: "",
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            await createUser(values)
            toast.success("Usuario creado correctamente")
            
            // Limpia todos los campos del formulario
            reset()
        } catch (error) {
            console.error("Error creating user:", error)
            toast.error("Error creando usuario")
        }
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
                                    autoFocus
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
                                name="email"
                                type="email"
                                placeholder="Ingresa el email"
                                required
                            />
                            {errors.email && errors.email.message !== "" && (
                                <span className="text-xs md:text-sm text-error font-medium mt-1 block">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
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
                                    error={errors.role?.message}
                                    className="text-blueDark/80"
                                    placeholder="Seleccione un rol"
                                />
                            </div>

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
                                onValueChange={(value) => setValue("faculty", value)}
                                error={errors.faculty?.message}
                                className="text-blueDark/80"
                                placeholder="Seleccione una facultad"
                            />
                        </div>
                        
                        <div className="pt-4 flex justify-center">
                            <Button
                                type="submit"
                                className="bg-blue hover:bg-blueLight text-white transition-colors shadow-sm hover:shadow"
                            >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Crear enlace
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
