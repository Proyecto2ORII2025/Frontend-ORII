"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Title from "@/components/ui/title";
import { facultyDict } from "@/utils/movilityUtils";
import { useMovilityFilters } from "@/components/movility/useMovilityFilters";
import { Movility } from "@/types/movilityType";

interface MovilityHeaderProps {
  handleDeleteSelected: () => void;
  selectedMovilities: number[];
  originalMovilities: Movility[];
  onFilterChange: (filtered: Movility[]) => void;
}

const MovilityHeader: React.FC<MovilityHeaderProps> = ({
  handleDeleteSelected,
  selectedMovilities,
  originalMovilities,
  onFilterChange,
}) => {
  const {
    searchTerm,
    activeFilters,
    filteredMovilities,
    handleSearch,
    handleFilter,
  } = useMovilityFilters(originalMovilities);

  useEffect(() => {
    onFilterChange(filteredMovilities);
  }, [filteredMovilities, onFilterChange]);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  return (
    <div className="flex flex-col space-y-6 pb-10">
      <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title title="Lista de movilidades" />
          <br />
          <p className="text-gray-600">Movilidades registradas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, institución, tipo..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Crear movilidad */}
        <Link href="/dashboard/movility/create">
          <Button>
            <Plus />
            Crear Movilidad
          </Button>
        </Link>

        {/* Filtros */}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full md:w-auto ${hasActiveFilters ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-purple-100 hover:bg-purple-200 text-purple-700"} border-purple-300 flex items-center`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
                {hasActiveFilters && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-purple-600 bg-white rounded-full border border-purple-600">
                    {Object.values(activeFilters).filter(Boolean).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="p-4 space-y-2 w-64">
              {/* Año */}
              <div>
                <label className="text-sm font-medium text-gray-700">Año</label>
                <input
                  type="anio"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={activeFilters.anio ?? ""}
                  onChange={(e) => handleFilter("anio", e.target.value)}
                />
              </div>
              {/* Mes */}
              <div>
                <label className="text-sm font-medium text-gray-700">Mes</label>
                <select
                  name="mes"
                  value={activeFilters.mes ?? ""}
                  onChange={(e) => handleFilter("mes", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Todos</option>
                  {[...Array(12)].map((_, i) => {
                    const mes = (i + 1).toString().padStart(2, "0");
                    return (
                      <option key={mes} value={mes}>
                        {mes}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Semestre */}
              <div>
                <label className="text-sm font-medium text-gray-700">Semestre</label>
                <select
                  name="semestre"
                  value={activeFilters.semestre ?? ""}
                  onChange={(e) => handleFilter("semestre", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              {/* Programa */}
              <div>
                <label className="text-sm font-medium text-gray-700">Programa</label>
                <input
                  type="text"
                  placeholder="Nombre del programa"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={activeFilters.programa ?? ""}
                  onChange={(e) => handleFilter("programa", e.target.value)}
                />
              </div>

              {/* Facultad */}
              <div>
                <label className="text-sm font-medium text-gray-700">Facultad</label>
                <select
                  name="facultad"
                  value={activeFilters.facultad ?? ""}
                  onChange={(e) => handleFilter("facultad", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Todas</option>
                  {Object.entries(facultyDict).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="outline"
                onClick={() => handleFilter("reset")}
                className="w-full mt-2 font-semibold text-error bg-white border border-orange-200 hover:bg-orange-500 hover:text-white focus:bg-error focus:text-white transition-colors duration-200"
              >
                Limpiar filtros
              </Button>

            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          {/* Eliminar seleccionados */}
          <Button
            variant="outline"
            className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
            onClick={handleDeleteSelected}
            disabled={selectedMovilities.length === 0}
          >
            Eliminar seleccionadas
          </Button>
        </div>
      </div>

      {/* Mostrar mensaje si no hay movilidades filtradas */}
      {filteredMovilities.length === 0 && (
        <div className="text-center text-red-500 mt-4">
          <p>No se encontraron movilidades relacionadas con esos filtros.</p>
        </div>
      )}
    </div>
  );
};

export default MovilityHeader;
