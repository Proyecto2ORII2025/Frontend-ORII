"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/basic-select";
import Title from "@/components/ui/title";
import { createMovilityAction } from "@/actions/movilityAction";

export default function CreateMovility() {
    const [entryDate, setEntryDate] = useState("");
    const [exitDate, setExitDate] = useState("");
    const [faculty, setFaculty] = useState("");
    const [movilityType, setMovilityType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [personType, setRole] = useState("");
    const [identificationType, setDocumentType] = useState("");
    const [identification, setDocumentNumber] = useState("");
    const [origin, setOriginUniversity] = useState("");
    const [destination, setDestinationUniversity] = useState("");
    const [originProgram, setOriginProgram] = useState("");
    const [destinationProgram, setDestinationProgram] = useState("");
    const [teacher, setTeacher] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [agreement, setAgreement] = useState("");
    const [numberAgreement, setNumberAgreement] = useState("");
    const [valorFinanciacion, setValorFinanciacion] = useState("");
    const [fundingSource, setFuenteFinanciacion] = useState("");
    const [stayDays, setStayDays] = useState(0);
    const [movilityYear, setMovilityYear] = useState("");
    const [eventTypeId, setEventType] = useState<number>(0);
    const [description, setEventDescription] = useState("");
    const [movilityScope, setMovilityScope] = useState("");
    const [email, setEmail] = useState("");

    const options = [
        { label: "Asistencia a evento", value: "1" },
        { label: "Misión", value: "2" },
        { label: "Curso corto", value: "3" },
        { label: "Estancia de investigación", value: "4" },
        { label: "Semestre académico de intercambio", value: "5" },
        { label: "Doble titulación", value: "6" },
        { label: "Pasantía o práctica", value: "7" },
        { label: "Rotación médica", value: "8" },
        { label: "Profesor visitante", value: "9" },
        { label: "Profesor de programa de pregrado", value: "10" },
        { label: "Profesor de programa de especialización", value: "11" },
        { label: "Profesor de programa de maestría", value: "12" },
        { label: "Profesor de programa de doctorado", value: "13" },
        { label: "Profesor de programa de postdoctorado", value: "14" },
        { label: "Estudios de maestría", value: "15" },
        { label: "Estudios de doctorado", value: "16" },
        { label: "Estudios de posdoctorado", value: "17" },
        { label: "Internacionalización en casa", value: "18" },
        { label: "Voluntariado", value: "19" },
    ];

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

    const handleCreateMovility = async () => {
        console.log("Agreement 11:", agreement);
        const data = {
            orii: true,
            direction: movilityType,
            gender,
            cta: 1, //Preguntar
            entryDate,
            exitDate,
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
            agreement: agreement === "Y" ? numberAgreement : null,
            event: {
                description,
                eventTypeId,
            },
            person: {
                identificationType,
                personType: personType,
                firstName,
                lastName,
                identification: identification,
                email,
            },
        };

        console.log("Agreement 2:", agreement);
        console.log("NumberAgreement:", numberAgreement);

        try {
            const result = await createMovilityAction(data);
            console.log("Result:  ", result)
            if (result.success) {
                alert("Movilidad creada exitosamente.");
                // Opcional: Resetea los campos del formulario
                resetForm();
            } else {
                alert("Error al crear la movilidad. Verifica los datos ingresados.");
            }
        } catch (error) {
            console.error("Error al crear la movilidad:", error);
            alert("Hubo un problema al guardar los datos.");
        }
    };

    // Función para resetear el formulario
    const resetForm = () => {
        setEntryDate("");
        setExitDate("");
        setFaculty("");
        setMovilityType("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setGender("");
        setRole("");
        setDocumentType("");
        setDocumentNumber("");
        setOriginUniversity("");
        setDestinationUniversity("");
        setCountry("");
        setCity("");
        setAgreement("");
        setNumberAgreement("");
        setValorFinanciacion("");
        setFuenteFinanciacion("");
        setStayDays(0);
        setMovilityYear("");
        setEventType(0);
        setEventDescription("");
        setMovilityScope("");
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
                                { label: "Femenino", value: "F" },
                                { label: "Masculino", value: "M" },
                                { label: "Otro", value: "O" },
                            ]}
                            placeholder="Seleccione el género"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de documento</label>
                        <Select
                            value={identificationType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            options={[
                                { label: "Cédula de Ciudadanía", value: "CC" },
                                { label: "Cédula de Extranjería", value: "CE" },
                                { label: "Pasaporte", value: "PS" },
                                { label: "Documewnto extranjero", value: "DE" },
                                { label: "Visa", value: "V" },
                            ]}
                            placeholder="Seleccione el tipo de documento"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número de documento</label>
                        <Input type="text" value={identification} onChange={(e) => setDocumentNumber(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facultad</label>
                        <Select
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de evento</label>
                        <Select
                            value={eventTypeId ? eventTypeId.toString() : ""}
                            onChange={(e) => setEventType(Number(e.target.value))}
                            options={options}
                            placeholder="Seleccione el tipo de evento"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción del evento</label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setEventDescription(e.target.value)}
                            placeholder="Ingrese la descripción del evento"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ámbito</label>
                        <Select
                            value={movilityScope}
                            onChange={(e) => setMovilityScope(e.target.value)}
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
                            value={origin}
                            onChange={(e) => setOriginUniversity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Universidad de destino</label>
                        <Input
                            type="text"
                            value={destination}
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
                        <Input type="text" value={originProgram} onChange={(e) => setOriginProgram(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Programa de acogida</label>
                        <Input type="text" value={destinationProgram} onChange={(e) => setDestinationProgram(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tutor académico</label>
                        <Input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
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
                            value={agreement}
                            onChange={(e) => setAgreement(e.target.value)}
                            options={[
                                { label: "Sí", value: "Y" },
                                { label: "No", value: "N" },
                            ]}
                            placeholder="Seleccione una opción"
                        />
                    </div>
                    {agreement === "Y" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número de convenio</label>
                            <Input
                                type="text"
                                value={numberAgreement}
                                onChange={(e) => setNumberAgreement(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Valor de la financiación en pesos</label>
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
                            value={fundingSource}
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
                            value={movilityYear}
                            onChange={(e) => setMovilityYear(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <Button onClick={handleCreateMovility}>
                    Generar Reporte
                </Button>
                <Button variant="outline" onClick={resetForm}>
                    Cancelar
                </Button>
            </div>
        </div>
    );
}