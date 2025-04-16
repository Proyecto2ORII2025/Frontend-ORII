import { useState } from "react";
import { createMovilityAction, editMovilityAction } from "@/actions/movilityAction";
import { toast } from "sonner";
import { handleExitDateChange, handleEntryDateChange, formatDateToInput } from "@/utils/movilityUtils";
import { validateFields } from "@/utils/validationForm"
import { Movility, MovilityCrear } from "@/types/movilityType";

export function useMovilityForm(initialValues?: Partial<MovilityCrear>) {

  // Estados para Datos de la persona movilizada
  const [firstName, setFirstName] = useState(initialValues?.person?.firstName || "");
  const [lastName, setLastName] = useState(initialValues?.person?.lastName || "");
  const [gender, setGender] = useState(initialValues?.gender || "");
  const [personType, setRole] = useState(initialValues?.person?.personType || "");
  const [identificationType, setDocumentType] = useState(initialValues?.person?.identificationType || "");
  const [identification, setDocumentNumber] = useState(initialValues?.person?.identification || "");
  const [email, setEmail] = useState(initialValues?.person?.email || "");

  // Estados para Datos generales de la movilidad
  const [direction, setDirection] = useState(initialValues?.direction || "");
  const [faculty, setFaculty] = useState(initialValues?.faculty || "");
  const [eventTypeId, setEventType] = useState<number>(initialValues?.event?.eventTypeId || 0);
  const [description, setEventDescription] = useState(initialValues?.event?.description || "");
  const [cta, setCta] = useState<number>(initialValues?.cta || 0);

  // Estados para Detalles de la movilidad
  const [origin, setOriginUniversity] = useState(initialValues?.origin || "");
  const [destination, setDestinationUniversity] = useState(initialValues?.destination || "");
  const [country, setCountry] = useState(initialValues?.country || "");
  const [city, setCity] = useState(initialValues?.city || "");

  // Estados para Detalles académicos
  const [originProgram, setOriginProgram] = useState(initialValues?.originProgram || "");
  const [destinationProgram, setDestinationProgram] = useState(initialValues?.destinationProgram || "");
  const [teacher, setTeacher] = useState(initialValues?.teacher || "");

  // Estados para Convenios y patrocinios
  const [agreementId, setAgreementId] = useState<number>(initialValues?.agreementId || 0);
  const [agreement, setAgreement] = useState<string>(
    initialValues?.agreementId && initialValues.agreementId !== 0 ? "Y" : "F"
  );
  const [funding, setfunding] = useState(initialValues?.funding || "");
  const [fundingSource, setFuenteFinanciacion] = useState(initialValues?.fundingSource || "");

  // Estados para Tiempo de la estancia
  const [entryDate, setEntryDate] = useState(initialValues?.entryDate || "");
  const [exitDate, setExitDate] = useState(initialValues?.exitDate || "");
  const [stayDays, setStayDays] = useState(Number(exitDate) - Number(entryDate) || 0);
  const [movilityYear, setMovilityYear] = useState(initialValues?.entryDate ? new Date(initialValues.entryDate).getFullYear().toString() : "");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  const initializeForm = (values: Partial<Movility>) => {
    setFirstName(values.person?.firstName || "");
    setLastName(values.person?.lastName || "");
    setGender(values.gender || "");
    setRole(values.person?.personType || "");
    setDocumentType(values.person?.identificationType || "");
    setDocumentNumber(values.person?.identification || "");
    setEmail(values.person?.email || "");
    setDirection(values.direction || "");
    setFaculty(values.faculty || "");
    setEventType(values.event?.eventType.eventTypeId || 0);
    setEventDescription(values.event?.description || "");
    setCta(values.cta || 0);
    setOriginUniversity(values.origin || "");
    setDestinationUniversity(values.destination || "");
    setCountry(values.country || "");
    setCity(values.city || "");
    setOriginProgram(values.originProgram || "");
    setDestinationProgram(values.destinationProgram || "");
    setTeacher(values.teacher || "");
    setAgreement(values.agreement ? "Y" : "N");
    setAgreementId(values.agreement?.agreementId || 0);
    setfunding(values.funding || "");
    setFuenteFinanciacion(values.fundingSource || "");
    setEntryDate(values?.entryDate || "");
    setExitDate(values?.exitDate || "");
    setStayDays(Number(values.exitDate) - Number(values.entryDate) || 0);
    setMovilityYear(values.entryDate ? values.entryDate.split('-')[2] : "");
    setIsDirty(false);
  };

  const createDirtySetter = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => {
    return (value: T) => {
      setter(value);
      setIsDirty(true);
    };
  };

  const handleSubmit = async (e: React.FormEvent, isEditing: boolean = false, movilityId?: number) => {
    e.preventDefault();
    const fields = {
      firstName,
      lastName,
      gender,
      cta,
      personType,
      identificationType,
      identification,
      email,
      direction,
      faculty,
      description,
      eventTypeId,
      origin,
      destination,
      country,
      city,
      originProgram,
      destinationProgram,
      teacher,
      agreement,
      agreementId,
      funding,
      fundingSource,
      entryDate,
      exitDate,
      stayDays,
      movilityYear,
    };

    const newErrors = validateFields(fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Por favor complete todos los campos obligatorios");
      return { success: false, errors: newErrors };
    }

    const data = {
      orii: true,
      direction: direction,
      gender,
      cta,
      entryDate,
      exitDate,
      originProgram,
      destinationProgram,
      city,
      country,
      teacher,
      faculty,
      funding,
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

    try {
      const loadingMessage = isEditing ? "Actualizando movilidad..." : "Creando movilidad...";
      toast.loading(loadingMessage, { id: "movility-action" });

      let result;
      if (isEditing && movilityId) {
        result = await editMovilityAction(data, movilityId);
      } else {
        result = await createMovilityAction(data);
      }

      if (result.success) {
        const successMessage = isEditing ? "Movilidad actualizada exitosamente" : "Movilidad creada exitosamente";
        toast.success(successMessage, { id: "movility-action" });

        if (!isEditing) resetForm();
        return { success: true, data: result.data };

      } else {
        toast.error(result.error || `Error al ${isEditing ? 'actualizar' : 'crear'} la movilidad`, {
          id: "movility-action",
          description: "Verifique los datos ingresados"
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} la movilidad:`, error);
      toast.error(`Error inesperado al ${isEditing ? 'actualizar' : 'crear'} movilidad`, {
        id: "movility-action",
        description: "Por favor intente nuevamente"
      });
      return { success: false, error: "Hubo un problema al guardar los datos." };
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
    setDirection("");
    setFaculty("");
    setEventType(0);
    setEventDescription("");
    setCta(0);
    setOriginUniversity("");
    setDestinationUniversity("");
    setCountry("");
    setCity("");
    setOriginProgram("");
    setDestinationProgram("");
    setTeacher("");
    setAgreement("");
    setAgreementId(0);
    setfunding("0");
    setFuenteFinanciacion("");
    setEntryDate("");
    setExitDate("");
    setStayDays(0);
    setMovilityYear("");
    setErrors({});
  };

  return {
    // Estados
    firstName,
    lastName,
    gender,
    personType,
    identificationType,
    identification,
    email,
    direction,
    faculty,
    eventTypeId,
    description,
    cta,
    origin,
    destination,
    country,
    city,
    originProgram,
    destinationProgram,
    teacher,
    agreement,
    agreementId,
    funding,
    fundingSource,
    entryDate,
    exitDate,
    stayDays,
    movilityYear,
    errors,
    isDirty,
    //setIsDirty,

    // Setters
    setFirstName: createDirtySetter(setFirstName),
    setLastName: createDirtySetter(setLastName),
    setGender: createDirtySetter(setGender),
    setRole: createDirtySetter(setRole),
    setDocumentType: createDirtySetter(setDocumentType),
    setDocumentNumber: createDirtySetter(setDocumentNumber),
    setEmail: createDirtySetter(setEmail),
    setDirection: createDirtySetter(setDirection),
    setFaculty: createDirtySetter(setFaculty),
    setEventType: createDirtySetter(setEventType),
    setEventDescription: createDirtySetter(setEventDescription),
    setCta: createDirtySetter(setCta),
    setOriginUniversity: createDirtySetter(setOriginUniversity),
    setDestinationUniversity: createDirtySetter(setDestinationUniversity),
    setCountry: createDirtySetter(setCountry),
    setCity: createDirtySetter(setCity),
    setOriginProgram: createDirtySetter(setOriginProgram),
    setDestinationProgram: createDirtySetter(setDestinationProgram),
    setTeacher: createDirtySetter(setTeacher),
    setAgreement: createDirtySetter(setAgreement),
    setAgreementId: createDirtySetter(setAgreementId),
    setfunding: createDirtySetter(setfunding),
    setFuenteFinanciacion: createDirtySetter(setFuenteFinanciacion),
    setEntryDate: createDirtySetter(setEntryDate),
    setExitDate: createDirtySetter(setExitDate),
    setStayDays: createDirtySetter(setStayDays),
    setMovilityYear: createDirtySetter(setMovilityYear),

    // Funciones
    initializeForm,
    handleSubmit,
    resetForm,
    handleEntryDateChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleEntryDateChange(e, setEntryDate, exitDate, setExitDate, setStayDays, setMovilityYear),
    handleExitDateChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleExitDateChange(e, entryDate, setExitDate, setStayDays),
    formatDateToInput
  };
}
