import { Download } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { useState } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { AgreementProps } from "@/types/agreementType";

interface Props {
  agreements: AgreementProps[];
}

export default function ExportButton({ agreements }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    const libro = utils.book_new();
    const hoja = utils.json_to_sheet(agreements);

    utils.book_append_sheet(libro, hoja, "Convenios");

    setTimeout(() => {
      writeFileXLSX(libro, "convenios.xlsx");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!loading ? (
        <Button
          variant="outline"
          className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
          disabled
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      )}
    </>
  );
}
