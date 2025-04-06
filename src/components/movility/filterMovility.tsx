import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const FilterMovilities = () => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <label className="flex items-center gap-2">
        <Checkbox /> Facultad
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> Programa
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> Tipo
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> Ámbito
      </label>
    </div>
  );
};

export default FilterMovilities;
