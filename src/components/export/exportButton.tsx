import { Download, Loader2 } from "lucide-react";

import { saveAs } from "file-saver";
import { Button } from "../ui/buttons/button";
import { useState } from "react";

interface Props {
  blob: Blob | null;
  filename: string;
  errorText?: string;
  disable: boolean;
}

export default function ExportButton({
  blob,
  filename,
  errorText,
  disable,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    if (!blob || isLoading) return;
    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      saveAs(blob, `${filename}.xlsx`);
    } catch (error) {
      console.error(errorText, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={
        "bg-green-100 text-green-700 border-green-300 " +
        (disable
          ? "hover:bg-green-100 hover:text-green-700"
          : "hover:bg-green-200")
      }
      onClick={handleDownload}
      type="button"
      disabled={disable}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </>
      )}
    </Button>
  );
}