import Title from "@/components/ui/title";
import { AgreementForm } from "./agreement-form";
import { Agreement } from "../types/agreementsTypes";
import { getAgreement } from "@/services/agreement.service";

interface Props {
  params: Promise<{
    agreementId: string;
  }>;
}

export default async function CreateAgreement({ params }: Props) {
  const agreementId = (await params)?.agreementId;

  let data: Agreement | undefined;

  if (agreementId) {
    data = await getAgreement(Number(agreementId));
  }

  return (
    <>
      <div className="mb-8">
        <Title title={(await params)?.agreementId ? "Editar convenio": "Crear convenio"} />
        <p className="text-muted-foreground mt-2">
          A continuación podrá crear un convenio. Por favor verifique que la
          información ingresada es correcta e ingrese todos los campos.
        </p>
      </div>
      <AgreementForm agreement={data}/>
    </>
  );
}
