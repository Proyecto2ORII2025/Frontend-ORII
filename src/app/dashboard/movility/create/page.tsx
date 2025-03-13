"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/basic-select";
import Title from "@/components/ui/title";

/**const programsByFaculty = {
    artes: [{ label: "Música", value: "musica" }],
    ciencias_agrarias: [{ label: "Agronomía", value: "agronomia" }],
    ciencias_salud: [{ label: "Enfermería", value: "enfermeria" }],
    contables_economicas: [{ label: "Administración", value: "administracion" }],
    humanas_sociales: [{ label: "Filosofía", value: "filosofía" }],
    naturales_exactas: [{ label: "Matemáticas", value: "matematicas" }],
    derecho_politicas: [{ label: "Derecho", value: "derecho" }],
    ingenieria_civil: [{ label: "Ingeniería Civil", value: "ingenieria_civil" }],
    ingenieria_telecomunicaciones: [{ label: "Ingeniería de Sistemas", value: "sistemas" }],
};

const programsByFaculty: Record<string, { label: string; value: string }[]> = {
    artes: [{ label: "Música", value: "musica" }],
    ciencias_agrarias: [{ label: "Agronomía", value: "agronomia" }],
    // Agregar más facultades...
};*/


export default function CreateMovility() {
    const [entryDate, setEntryDate] = useState("");
    const [exitDate, setExitDate] = useState("");
    const [faculty, setFaculty] = useState("");
    const [program, setProgram] = useState("");
    const [mobilityType, setMobilityType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [originUniversity, setOriginUniversity] = useState("");
    const [destinationUniversity, setDestinationUniversity] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [convenio, setConvenio] = useState("");
    const [numeroConvenio, setNumeroConvenio] = useState("");
    const [valorFinanciacion, setValorFinanciacion] = useState("");
    const [fuenteFinanciacion, setFuenteFinanciacion] = useState("");
    const [stayDays, setStayDays] = useState(0);
    const [mobilityYear, setMobilityYear] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [mobilityScope, setMobilityScope] = useState("");

    const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFaculty(e.target.value);
        setProgram(""); 
    };

    const handleExitDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newExitDate = e.target.value;
        setExitDate(newExitDate);
    
        if (entryDate && newExitDate) {
            const start = new Date(entryDate).getTime();
            const end = new Date(newExitDate).getTime();
    
            if (end > start) {
                const diffTime = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                setStayDays(diffTime);
            } else {
                setStayDays(0);
            }
        }
    };
      
    

    return (
        <div className="p-6">
            <Title title="Crear movilidad" />
            <p className="text-gray-600">
                A continuación, podrá crear una movilidad. Por favor, verifique que la información ingresada es correcta e ingrese todos los campos requeridos.
            </p>

            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Información de la movilidad</h2>
                <p className="text-sm text-gray-600">
                    Complete todos los campos requeridos para crear el reporte de movilidad.
                </p>
            </div>

            {/* Datos de la persona movilizada */}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Datos de la persona movilizada</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre(s)</label>
                        <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                        <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Género</label>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            options={[
                                { label: "Femenino", value: "femenino" },
                                { label: "Masculino", value: "masculino" },
                            ]}
                            placeholder="Seleccione el género"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            options={[
                                { label: "Estudiante", value: "estudiante" },
                                { label: "Docente", value: "docente" },
                            ]}
                            placeholder="Seleccione el rol"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de documento</label>
                        <Select
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            options={[
                                { label: "Cédula de Ciudadanía", value: "cc" },
                                { label: "Cédula de Extranjería", value: "ce" },
                                { label: "Pasaporte", value: "pasaporte" },
                            ]}
                            placeholder="Seleccione el tipo de documento"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número de documento</label>
                        <Input type="text" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Datos generales de la movilidad */}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Información general de la movilidad</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de movilidad</label>
                        <Select
                            value={mobilityType}
                            onChange={(e) => setMobilityType(e.target.value)}
                            options={[
                                { label: "Entrada", value: "entrada" },
                                { label: "Salida", value: "salida" },
                            ]}
                            placeholder="Seleccione el tipo de movilidad"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facultad</label>
                        <Select
                            value={faculty}
                            onChange={handleFacultyChange}
                            options={[
                                { label: "Facultad de Artes", value: "artes" },
                                { label: "Facultad de Ciencias Agrarias", value: "ciencias_agrarias" },
                                { label: "Facultad de Ciencias de la Salud", value: "ciencias_salud" },
                                { label: "Facultad de Ciencias Contables, Económicas y Administrativas", value: "contables_economicas" },
                                { label: "Facultad de Ciencias Humanas y Sociales", value: "humanas_sociales" },
                                { label: "Facultad de Ciencias Naturales, Exactas y de la Educación", value: "naturales_exactas" },
                                { label: "Facultad de Derecho, Ciencias Políticas y Sociales", value: "derecho_politicas" },
                                { label: "Facultad de Ingeniería Civil", value: "ingenieria_civil" },
                                { label: "Facultad de Ingeniería Electrónica y Telecomunicaciones", value: "ingenieria_telecomunicaciones" },
                            ]}
                            placeholder="Seleccione una facultad"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de evento</label>
                        <Select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            options={[
                                { label: "Asistencia a eventos", value: "asistencia_eventos" },
                            ]}
                            placeholder="Seleccione el tipo de evento"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción del evento</label>
                        <Input
                            type="text"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            placeholder="Ingrese la descripción del evento"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ámbito</label>
                        <Select
                            value={mobilityScope}
                            onChange={(e) => setMobilityScope(e.target.value)}
                            options={[
                                { label: "Nacional", value: "ambito_nacional" },
                                { label: "Internacional", value: "ambito_internacional" },
                            ]}
                            placeholder="Seleccione el ámbito"
                        />
                    </div>
                </div>
            </div>

            {/* Detalles de la movilidad */}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Detalles de la movilidad</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Universidad de origen</label>
                        <Input
                            type="text"
                            value={originUniversity}
                            onChange={(e) => setOriginUniversity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Universidad de destino</label>
                        <Input
                            type="text"
                            value={destinationUniversity}
                            onChange={(e) => setDestinationUniversity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">País</label>
                        <Input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <Input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Detalles académicos */}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Detalles académicos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Programa de origen</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Programa de acogida</label>
                        <Input type="text" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tutor académico</label>
                        <Input type="text" />
                    </div>
                </div>
            </div>

            {/* Convenios y patrocinios */}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Convenios y patrocinios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700">¿Existe convenio?</label>
                        <Select
                            value={convenio}
                            onChange={(e) => setConvenio(e.target.value)}
                            options={[
                                { label: "Sí", value: "si" },
                                { label: "No", value: "no" },
                            ]}
                            placeholder="Seleccione una opción"
                        />
                    </div>
                    {convenio === "si" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número de convenio</label>
                            <Input
                                type="text"
                                value={numeroConvenio}
                                onChange={(e) => setNumeroConvenio(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Valor de la financiación</label>
                        <Input
                            type="text"
                            value={valorFinanciacion}
                            onChange={(e) => setValorFinanciacion(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fuente de la financiación</label>
                        <Input
                            type="text"
                            value={fuenteFinanciacion}
                            onChange={(e) => setFuenteFinanciacion(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Detalles académicos */}
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-lg font-semibold">Tiempo de la estancia</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de entrada</label>
                        <Input
                            type="date"
                            value={entryDate}
                            onChange={(e) => setEntryDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de salida</label>
                        <Input
                            type="date"
                            value={exitDate}
                            onChange={handleExitDateChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Días de estancia</label>
                        <Input 
                            type="text" 
                            value={stayDays} 
                            disabled 
                            onChange={(e) => setStayDays(Number(e.target.value) || 0)}
                            />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Año de movilidad</label>
                        <Input 
                            type="text" 
                            value={mobilityYear} 
                            disabled 
                            onChange={(e) => setMobilityYear(e.target.value)}
                            />

                    </div>
                </div>
            </div>


            <div className="flex gap-4 mt-6">
                <Button onClick={() => console.log({ entryDate, exitDate, faculty, program, mobilityType, firstName, lastName, gender, role, documentType, documentNumber })}>
                    Generar Reporte
                </Button>
                <Button variant="outline">Cancelar</Button>
            </div>
        </div>
    );
}