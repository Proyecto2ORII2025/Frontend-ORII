"use client";

import { Search, Plus, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Title from "@/components/ui/title";
import Link from "next/link";
import { AgreementsTable } from "./agreements-table";
import { useAgreementsData } from "./hooks/agreemetsHooks";
import { useState } from "react";

export default function Agreements() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  
  const { nationalAgreements, internationalAgreements } =
    useAgreementsData(refreshFlag);

  return (
    <>
      <div className="flex flex-col space-y-6 pb-10">
        <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Title title="Convenios" />
            <p className="text-muted-foreground py-6">
              Administra todos los convenios nacionales e internacionales
              registrados
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, institución, tipo..."
              className="pl-10 w-full"
            />
          </div>
          <Link href="/dashboard/agreements/create">
            <Button>
              <Plus />
              Crear Convenio
            </Button>
          </Link>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-auto bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Por fecha</DropdownMenuItem>
                <DropdownMenuItem>Por estado</DropdownMenuItem>
                <DropdownMenuItem>Por tipo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
        <AgreementsTable
          nationalAgreements={nationalAgreements}
          internationalAgreements={internationalAgreements}
          setRefreshFlag={setRefreshFlag}
        ></AgreementsTable>
      </div>
    </>
  );
}
