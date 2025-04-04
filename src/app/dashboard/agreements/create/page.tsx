"use client";
import Title from "@/components/ui/typography/title";
import AgreementForm from "@/components/agreement/agreementForm";

export default function CreateAgreement() {
  return (
    <>
      <div className="mb-8">
        <Title title="Crear convenio" />
        <p className="text-muted-foreground mt-2">
          A continuación podrá crear un convenio. Por favor verifique que la
          información ingresada es correcta e ingrese todos los campos.
        </p>
      </div>
      <AgreementForm />
    </>
  );
}
