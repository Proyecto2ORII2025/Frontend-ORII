import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { AgreementProps } from "@/types/agreementType";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

interface Props {
  agreements: AgreementProps[];
}

export default function ExportButton({ agreements }: Props) {
  //TRATAMIENTO DE DATOS
  const formattedAgreements = agreements.map(
    ({
      agreementNumber,
      institution,
      description,
      country,
      startDate,
      scope,
    }) => ({
      agreementNumber,
      institution,
      description,
      country,
      startDate,
      scope,
    })
  );

  const handleDownload = async () => {
    try {
      //CREAR UN LIBRO
      const workbook = new ExcelJS.Workbook();

      //CREAR UNA HOJA
      const worksheet = workbook.addWorksheet("Convenios");

      //CREAR LAS COLUMNAS
      worksheet.columns = [
        { header: "NÚMERO DE CONVENIO", key: "agreementNumber", width: 25 },
        { header: "ÁMBITO", key: "scope", width: 16 },
        { header: "PAÍS", key: "country", width: 30 },
        { header: "INSTITUCIÓN", key: "institution", width: 30 },
        { header: "DESCRIPCIÓN", key: "description", width: 90 },
        { header: "FECHA DE INICIO", key: "startDate", width: 17 },
      ];

      //AGREGAR FILAS
      for (const agreement of formattedAgreements) {
        worksheet.addRow({
          agreementNumber: agreement.agreementNumber,
          scope: agreement.scope,
          country: agreement.country,
          institution: agreement.institution,
          description: agreement.description,
          startDate: agreement.startDate,
        });
      }

      //ESTABLECIENDO ESTILOS AL ENCABEZADO
      const headerStyles = {
        font: { bold: true },
      };

      //ESTABLECIENDO ESTILOS A LAS FILAS
      const rowStyles = {
        alignment: { horizontal: "center", vertical: "middle" },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
          left: { style: "thin" },
        },
      };

      //APLICANDO ESTILOS A LAS FILAS
      worksheet.eachRow((row) =>
        row.eachCell((cell) => Object.assign(cell, rowStyles))
      );

      //APLICANDO ESTILOS AL ENCABEZADO
      worksheet.getRow(1).eachCell((cell) => Object.assign(cell, headerStyles));

      //SE GENERA UN ARCHIVO EN MEMORIA CONVIRTIENDO EL WORKBOOK EN UN BUFFER DE DATOS
      const buffer = await workbook.xlsx.writeBuffer();

      //SE USA UN BLOB PARA CONVERTIR EL BUFFER EN UN ARCHIVO DESCARGABLE
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      //SE FUERZA LA DESCARGA DEL ARCHIVO
      saveAs(blob, "Convenios.xlsx");
    } catch (error) {
      console.log("Ha ocurrido un error al exportar los convenios", error);
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
