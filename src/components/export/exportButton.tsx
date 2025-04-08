import { Download } from "lucide-react";
import { Button } from "../ui/buttons/button";
import { saveAs } from "file-saver";

interface Props {
  blob: Blob,
  filename: string,
  errorText?: string,
}

export default function ExportButton({ blob, filename, errorText }: Props) {
  const handleDownload = async () => {
    try {
      saveAs(blob, filename);
    } catch (error) {
      console.error(errorText, error);
    }
  };

  return (
    <Button
      variant="outline"
      className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
      onClick={handleDownload}
    >
      <Download className="mr-2 h-4 w-4" />
      Exportar
    </Button>
  );
}
