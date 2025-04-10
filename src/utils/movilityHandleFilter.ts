import { Movility } from "@/types/movilityType";

export const getUniqueFilterValues = (
  movilities: Movility[],
  selectedFilter: string | null
): string[] => {
  if (!selectedFilter) return [];

  const values = movilities
    .map((m) => {
      switch (selectedFilter) {
        case "facultad":
          return m.faculty;
        case "programa":
          return m.originProgram;
        case "anio":
          return m.entryDate.split('-')[2] 
        case "mes":
          return m.entryDate.split('-')[1]
        case "semestre":
          return m.cta
        default:
          return "";
      }
    })
    .filter((v): v is string => typeof v === "string" && v.trim() !== "");

  return [...new Set(values)];
};
