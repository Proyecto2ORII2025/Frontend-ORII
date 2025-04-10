import { Movility } from "@/types/movilityType";

export const filterMovilities = (
  movilities: Movility[],
  filterType: string,
  value: string | null
): Movility[] => {
  if (!value) return movilities;

  return movilities.filter((movility) => {
    switch (filterType) {
      case "facultad":
        return movility.faculty === value;
      case "programa":
        return movility.originProgram === value;
      case "semestre":
        return movility.cta.toString() === value;
      case "anio":
        return movility.entryDate.split('-')[2] === value;
      case "mes":
        return movility.entryDate.split('-')[1] === value;
      default:
        return true;
    }
  });
};
