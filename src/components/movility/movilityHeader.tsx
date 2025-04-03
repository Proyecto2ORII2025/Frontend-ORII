import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Title from "@/components/ui/title";

interface MovilityHeaderProps {
  handleDeleteSelected: () => void;
  selectedMovilities: number[];
}

const MovilityHeader: React.FC<MovilityHeaderProps> = ({ handleDeleteSelected, selectedMovilities }) => {
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por título, institución, tipo..." className="pl-10 w-full" />
        </div>
        <Link href="/dashboard/movility/create">
          <Button>
            <Plus />
            Crear Movilidad
          </Button>
        </Link>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Por facultad</DropdownMenuItem>
              <DropdownMenuItem>Por programa</DropdownMenuItem>
              <DropdownMenuItem>Por tipo</DropdownMenuItem>
              <DropdownMenuItem>Por ámbito</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
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
    </div>
  );
};

export default MovilityHeader;
