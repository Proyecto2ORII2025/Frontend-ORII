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
};*/

const programsByFaculty: Record<string, { label: string; value: string }[]> = {
    artes: [{ label: "Música", value: "musica" }],
    ciencias_agrarias: [{ label: "Agronomía", value: "agronomia" }],
    // Agregar más facultades...
};


export default function CreateMovility() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [faculty, setFaculty] = useState("");
    const [program, setProgram] = useState("");
    const [mobilityType, setMobilityType] = useState("");
    const [mobilityScope, setMobilityScope] = useState("");

    const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFaculty(e.target.value);
        setProgram(""); 
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700">Programa</label>
                    <Select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        options={faculty ? programsByFaculty[faculty] || [] : []}
                        placeholder="Seleccione un programa"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de movilidad</label>
                    <Select
                        value={mobilityType}
                        onChange={(e) => setMobilityType(e.target.value)}
                        options={[
                            { label: "Entrada", value: "entrada" },
                            { label: "Salida", value: "salida" },
                        ]}
                        placeholder="Tipo de movilidad"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ámbito de movilidad</label>
                    <Select
                        value={mobilityScope}
                        onChange={(e) => setMobilityScope(e.target.value)}
                        options={[
                            { label: "Nacional", value: "nacional" },
                            { label: "Internacional", value: "internacional" },
                        ]}
                        placeholder="Ámbito de movilidad"
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                <Button onClick={() => console.log({ startDate, endDate, faculty, program, mobilityType, mobilityScope })}>
                    Generar Reporte
                </Button>
                <Button variant="outline">Cancelar</Button>
            </div>
        </div>
    );
}
