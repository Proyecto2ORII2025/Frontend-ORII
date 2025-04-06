"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/basic-select";
import { Label } from "@/components/ui/typography/label";
import Title from "@/components/ui/typography/title";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { createMovilityAction } from "@/actions/movilityAction";
import { options, eventDescriptions, validateFields, handleExitDateChange, handleEntryDateChange } from "@/utils/movilityUtils";

export default function CreateMovility() {
    // Estados para Datos de la persona movilizada
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [personType, setRole] = useState("");
    const [identificationType, setDocumentType] = useState("");
    const [identification, setDocumentNumber] = useState("");
    const [email, setEmail] = useState("");
    // Estados para Datos generales de la movilidad
    const [movilityType, setMovilityType] = useState("");
    const [faculty, setFaculty] = useState("");
    const [eventTypeId, setEventType] = useState<number>(0);
    const [description, setEventDescription] = useState("");
    const [movilityScope, setMovilityScope] = useState("");
    // Estados para Detalles de la movilidad
    const [origin, setOriginUniversity] = useState("");
    const [destination, setDestinationUniversity] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    // Estados para Detalles académicos
    const [originProgram, setOriginProgram] = useState("");
    const [destinationProgram, setDestinationProgram] = useState("");
    const [teacher, setTeacher] = useState("");
    // Estados para Convenios y patrocinios
    const [agreement, setAgreement] = useState("");
    const [agreementId, setAgreementId] = useState<number>(0);
    const [valorFinanciacion, setValorFinanciacion] = useState("");
    const [fundingSource, setFuenteFinanciacion] = useState("");
    // Estados para Tiempo de la estancia
    const [entryDate, setEntryDate] = useState("");
    const [exitDate, setExitDate] = useState("");
    const [stayDays, setStayDays] = useState(0);
    const [movilityYear, setMovilityYear] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const formattedEntryDate = formatDate(entryDate);
        const formattedExitDate = formatDate(exitDate);

        const fields = {
            firstName,
            lastName,
            gender,
            personType,
            identificationType,
            identification,
            email,
            movilityType,
            faculty,
            eventTypeId,
            description,
            movilityScope,
            origin,
            destination,
            country,
            city,
            originProgram,
            destinationProgram,
            teacher,
            agreement,
            numberAgreement: agreementId,
            valorFinanciacion,
            fundingSource,
            entryDate: formattedEntryDate,
            exitDate: formattedExitDate,
            stayDays,
            movilityYear,
        };

        const newErrors = validateFields(fields);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const data = {
            orii: true,
            direction: movilityType,
            gender,
            cta: 1, // Preguntar
            entryDate: formattedEntryDate,
            exitDate: formattedExitDate,
            originProgram,
            destinationProgram,
            city,
            country,
            teacher,
            faculty,
            funding: parseFloat(valorFinanciacion) || 0,
            fundingSource,
            destination,
            origin,
            agreementId: agreement === "Y" ? agreementId : null,
            event: {
                description,
                eventTypeId,
            },
            person: {
                identificationType,
                personType,
                firstName,
                lastName,
                identification,
                email,
            },
        };

        console.log("Convenio 22: ", data.agreementId);
        console.log("Numero convenio 22: ", agreementId);

        try {
            const result = await createMovilityAction(data);
            if (result.success) {
                alert("Movilidad creada exitosamente.");
                resetForm();
            } else {
                alert("Error al crear la movilidad. Verifica los datos ingresados.");
            }
        } catch (error) {
            console.error("Error al crear la movilidad:", error);
            alert("Hubo un problema al guardar los datos.");
        }
    };
    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setGender("");
        setRole("");
        setDocumentType("");
        setDocumentNumber("");
        setEmail("");
        setMovilityType("");
        setFaculty("");
        setEventType(0);
        setEventDescription("");
        setMovilityScope("");
        setOriginUniversity("");
        setDestinationUniversity("");
        setCountry("");
        setCity("");
        setOriginProgram("");
        setDestinationProgram("");
        setTeacher("");
        setAgreement("");
        setAgreementId(0);
        setValorFinanciacion("");
        setFuenteFinanciacion("");
        setEntryDate("");
        setExitDate("");
        setStayDays(0);
        setMovilityYear("");
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <Title title="Crear movilidad"></Title>
                <p className="text-muted-foreground mt-2">
                    A continuación, podrá crear una movilidad. Por favor, verifique que la información ingresada es correcta.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Información de la movilidad</CardTitle>
                    <CardDescription>Complete todos los campos requeridos para crear el formulario de movilidad.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Datos de la persona movilizada */}
                        <div className="bg-gray-100 p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Datos de la persona movilizada</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="firstName">Nombre(s)</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombres de la persona, conforme está escrito en el documento de identificación</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="lastName">Apellidos</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Apellidos de la persona, conforme está escrito en el documento de identificación</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="gender">Género</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione el género de la persona</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        options={[
                                            { label: "Femenino", value: "F" },
                                            { label: "Masculino", value: "M" },
                                            { label: "Otro", value: "O" },
                                        ]}
                                        placeholder="Seleccione el género"
                                    />
                                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="personType">Rol</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione el rol de la persona</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        value={personType}
                                        onChange={(e) => setRole(e.target.value)}
                                        options={[
                                            { label: "Estudiante", value: "STUDENT" },
                                            { label: "Docente", value: "TEACHER" },
                                            { label: "Administrativo", value: "ADMIN" },
                                        ]}
                                        placeholder="Seleccione el rol"
                                    />
                                    {errors.personType && <p className="text-sm text-red-500">{errors.personType}</p>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="identificationType">Tipo de documento</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione el tipo de documento de identificación</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        value={identificationType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                        options={[
                                            { label: "Cédula de Ciudadanía", value: "CC" },
                                            { label: "Cédula de Extranjería", value: "CE" },
                                            { label: "Pasaporte", value: "PS" },
                                            { label: "Documento extranjero", value: "DE" },
                                            { label: "Visa", value: "V" },
                                        ]}
                                        placeholder="Seleccione el tipo de documento"
                                    />
                                    {errors.identificationType && <p className="text-sm text-red-500">{errors.identificationType}</p>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="identification">Número de documento</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Ingrese en forma correcta el número del documento sin puntos ni comas</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="identification"
                                        type="text"
                                        value={identification}
                                        onChange={(e) => setDocumentNumber(e.target.value)}
                                    />
                                    {errors.identification && <p className="text-sm text-red-500">{errors.identification}</p>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="email">Correo electrónico</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Correo electrónico de la persona</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Datos generales de la movilidad */}
                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <h2 className="text-lg font-semibold">Información general de la movilidad</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="movilityType">Tipo de movilidad</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione el tipo de movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        //id="movilityType"
                                        value={movilityType}
                                        onChange={(e) => setMovilityType(e.target.value)}
                                        options={[
                                            { label: "Entrante presencial", value: "INCOMING_IN_PERSON" },
                                            { label: "Saliente presencial", value: "OUTGOING_IN_PERSON" },
                                            { label: "Entrante virtual", value: "INCOMING_VIRTUAL" },
                                            { label: "Saliente virtual", value: "OUTGOING_VIRTUAL" },
                                        ]}
                                        placeholder="Seleccione el tipo de movilidad"
                                    />
                                    {errors.movilityType && <p className="text-sm text-red-500">{errors.movilityType}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="faculty">Facultad</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione la facultad a la que pertenece la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        //id="faculty"
                                        value={faculty}
                                        onChange={(e) => setFaculty(e.target.value)}
                                        options={[
                                            { label: "Facultad de Artes", value: "FA" },
                                            { label: "Facultad de Ciencias Agrarias", value: "FCA" },
                                            { label: "Facultad de Ciencias de la Salud", value: "FCS" },
                                            { label: "Facultad de Ciencias Contables, Económicas y Administrativas", value: "FCCEA" },
                                            { label: "Facultad de Ciencias Humanas", value: "FCH" },
                                            { label: "Facultad de Ciencias Naturales, Exactas y de la Educación", value: "FACNED" },
                                            { label: "Facultad de Derecho, Ciencias Políticas y Sociales", value: "FDCPS" },
                                            { label: "Facultad de Ingeniería Civil", value: "FIC" },
                                            { label: "Facultad de Ingeniería Electrónica y Telecomunicaciones", value: "FIET" },
                                        ]}
                                        placeholder="Seleccione una facultad"
                                    />
                                    {errors.faculty && <p className="text-sm text-red-500">{errors.faculty}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="eventTypeId">Tipo de evento</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione el tipo de evento asociado a la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        //id="eventTypeId"
                                        value={eventTypeId ? eventTypeId.toString() : ""}
                                        onChange={(e) => setEventType(Number(e.target.value))}
                                        options={options}
                                        placeholder="Seleccione el tipo de evento"
                                    />
                                    {errors.eventTypeId && <p className="text-sm text-red-500">{errors.eventTypeId}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="description">Descripción del evento</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{eventDescriptions[eventTypeId as keyof typeof eventDescriptions]}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="description"
                                        type="text"
                                        value={description}
                                        onChange={(e) => setEventDescription(e.target.value)}
                                        placeholder="Ingrese la descripción del evento"
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="movilityScope">Ámbito</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione el ámbito de la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        //id="movilityScope"
                                        value={movilityScope}
                                        onChange={(e) => setMovilityScope(e.target.value)}
                                        options={[
                                            { label: "Nacional", value: "ambito_nacional" },
                                            { label: "Internacional", value: "ambito_internacional" },
                                        ]}
                                        placeholder="Seleccione el ámbito"
                                    />
                                    {errors.movilityScope && <p className="text-sm text-red-500">{errors.movilityScope}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Detalles de la movilidad */}
                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <h2 className="text-lg font-semibold">Detalles de la movilidad</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="origin">Universidad de origen</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombre de la universidad de origen de la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="origin"
                                        type="text"
                                        value={origin}
                                        onChange={(e) => setOriginUniversity(e.target.value)}
                                    />
                                    {errors.origin && <p className="text-sm text-red-500">{errors.origin}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="destination">Universidad de destino</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombre de la universidad de destino de la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="destination"
                                        type="text"
                                        value={destination}
                                        onChange={(e) => setDestinationUniversity(e.target.value)}
                                    />
                                    {errors.destination && <p className="text-sm text-red-500">{errors.destination}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="country">País</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombre del país en donde realiza la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="country"
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="city">Ciudad</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombre de la ciudad en donde realiza la movilidad</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Detalles académicos */}
                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <h2 className="text-lg font-semibold">Detalles académicos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="originProgram">Programa de origen</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombre del programa del que es originario la persona</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="originProgram"
                                        type="text"
                                        value={originProgram}
                                        onChange={(e) => setOriginProgram(e.target.value)}
                                    />
                                    {errors.originProgram && <p className="text-sm text-red-500">{errors.originProgram}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="destinationProgram">Programa de acogida</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Nombre del programa que va a acoger a la persona</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="destinationProgram"
                                        type="text"
                                        value={destinationProgram}
                                        onChange={(e) => setDestinationProgram(e.target.value)}
                                    />
                                    {errors.destinationProgram && <p className="text-sm text-red-500">{errors.destinationProgram}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="teacher">Tutor académico</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Se habilita cuando se trate de estudiantes en Movilidad académica ENTRANTE (pasantía o estancia de investigación o intercambio)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="teacher"
                                        type="text"
                                        value={teacher}
                                        onChange={(e) => setTeacher(e.target.value)}
                                        disabled={!(
                                            (movilityType === "INCOMING_IN_PERSON" || movilityType === "INCOMING_VIRTUAL") &&
                                            personType === "STUDENT" &&
                                            [4, 5, 7].includes(eventTypeId) // Tipos de evento 4, 5 o 7
                                        )}
                                    />
                                    {errors.teacher && <p className="text-sm text-red-500">{errors.teacher}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Convenios y patrocinios */}
                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <h2 className="text-lg font-semibold">Convenios y patrocinios</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="agreement">¿Existe convenio?</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Puede verificar si existe convenio, en el apartado CONVENIOS de la página</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        //id="agreement"
                                        value={agreement}
                                        onChange={(e) => setAgreement(e.target.value)}
                                        options={[
                                            { label: "Sí", value: "Y" },
                                            { label: "No", value: "N" },
                                        ]}
                                        placeholder="Seleccione una opción"
                                    />
                                    {errors.agreement && <p className="text-sm text-red-500">{errors.agreement}</p>}
                                </div>

                                {agreement === "Y" && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="numberAgreement">Número de convenio</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>En el apartado CONVENIOS en la barra de navegación puede consultar los convenios existentes</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Input
                                            id="numberAgreement"
                                            type="number"
                                            value={agreementId}
                                            onChange={(e) => setAgreementId(Number(e.target.value))}
                                        />
                                        {errors.numberAgreement && <p className="text-sm text-red-500">{errors.numberAgreement}</p>}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="valorFinanciacion">Valor de la financiación en pesos</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Ingrese el valor en pesos colombianos, sin signo pesos, ni puntos ni comas</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="valorFinanciacion"
                                        type="text"
                                        value={valorFinanciacion}
                                        onChange={(e) => setValorFinanciacion(e.target.value)}
                                    />
                                    {errors.valorFinanciacion && <p className="text-sm text-red-500">{errors.valorFinanciacion}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="fundingSource">Fuente de la financiación</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Escriba aquí el nombre de la dependencia de la Universidad del Cauca y/o de otra institución que otorgó la financiación o la beca</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="fundingSource"
                                        type="text"
                                        value={fundingSource}
                                        onChange={(e) => setFuenteFinanciacion(e.target.value)}
                                    />
                                    {errors.fundingSource && <p className="text-sm text-red-500">{errors.fundingSource}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Tiempo de la estancia */}
                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <h2 className="text-lg font-semibold">Tiempo de la estancia</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="entryDate">Fecha de entrada</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione en el calendario o escriba la fecha de entrada</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="entryDate"
                                        type="date"
                                        value={entryDate}
                                        onChange={(e) => handleEntryDateChange(e, setEntryDate, exitDate, setExitDate, setStayDays, setMovilityYear)}
                                    />
                                    {errors.entryDate && <p className="text-sm text-red-500">{errors.entryDate}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="exitDate">Fecha de salida</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Seleccione en el calendario o escriba la fecha de salida</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="exitDate"
                                        type="date"
                                        value={exitDate}
                                        onChange={(e) => handleExitDateChange(e, entryDate, setExitDate, setStayDays)}
                                        min={entryDate} // Bloquear fechas anteriores a la fecha de entrada
                                    />
                                    {errors.exitDate && <p className="text-sm text-red-500">{errors.exitDate}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="stayDays">Días de estancia</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Se llena automáticamente una vez se haya ingresado la fecha de entrada y la de salida</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="stayDays"
                                        type="text"
                                        value={stayDays}
                                        disabled
                                        onChange={(e) => setStayDays(Number(e.target.value) || 0)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="movilityYear">Año de movilidad</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Año en el que se reporta la movilidad. Este campo se llena automáticamente</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="movilityYear"
                                        type="text"
                                        value={movilityYear}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-4 mt-6">
                            <Button className="w-1/4" type="submit">
                                Crear Movilidad
                            </Button>
                            <Button className="w-1/3 md:w-1/4 px-4" variant="secondary" type="button" onClick={resetForm}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}