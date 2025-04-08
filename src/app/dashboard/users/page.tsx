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

export default function UsersPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
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
        console.log("Formulario enviado:", values);
        
        try {
            await createUser(values)
            toast.success("Usuario creado correctamente")
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
                                <div className="flex flex-col space-y-1.5">
                                    <Label required htmlFor="role" className="text-blueDark font-bold">
                                        Rol
                                    </Label>
                                    <Select onValueChange={(value) => setValue("role", value)} defaultValue={watch("role")}>
                                        <SelectTrigger
                                            id="role"
                                            className="border-blue/20 focus:ring-blueLight bg-white/50 hover:bg-white transition-colors h-10"
                                        >
                                            <SelectValue placeholder="Seleccione un rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Administrador</SelectItem>
                                            <SelectItem value="USER">Usuario</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {errors.role && errors.role.message !== "" && (
                                    <span className="text-xs md:text-sm text-error font-medium mt-1 block">{errors.role.message}</span>
                                )}
                            </div>

                            <div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label required htmlFor="faculty" className="text-blueDark font-bold">
                                        Facultad
                                    </Label>
                                    <Select onValueChange={(value) => setValue("faculty", value)} defaultValue={watch("faculty")}>
                                        <SelectTrigger
                                            id="faculty"
                                            className="border-blue/20 focus:ring-blueLight bg-white/50 hover:bg-white transition-colors h-10"
                                        >
                                            <SelectValue placeholder="Seleccione una facultad" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-80">
                                            <SelectItem value="FIET">Facultad de Ingeniería Electrónica y Telecomunicaciones</SelectItem>
                                            <SelectItem value="FIC">Facultad de Ingeniería Civil</SelectItem>
                                            <SelectItem value="FCS">Facultad de Ciencias de la Salud</SelectItem>
                                            <SelectItem value="FDCPS">Facultad de Derecho y Ciencias Políticas y Sociales</SelectItem>
                                            <SelectItem value="FACNED">Facultad de Ciencias Naturales, Exactas y de la Educación</SelectItem>
                                            <SelectItem value="FCH">Facultad de Ciencias Humanas</SelectItem>
                                            <SelectItem value="FA">Facultad de Artes</SelectItem>
                                            <SelectItem value="FCA">Facultad de Ciencias Agropecuarias</SelectItem>
                                            <SelectItem value="FCCEA">Facultad de Ciencias Contables, Económicas y Administrativas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {errors.faculty && errors.faculty.message !== "" && (
                                    <span className="text-xs md:text-sm text-error font-medium mt-1 block">{errors.faculty.message}</span>
                                )}
                            </div>
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
