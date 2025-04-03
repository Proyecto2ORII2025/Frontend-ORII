import { Movility } from "@/types/movilityType";
import { documentTypeDict } from "@/utils/movilityUtils";
import { Button } from "@/components/ui/button";
import { Pencil, Eye } from "lucide-react";

interface MovilityTableProps {
    movilities: Movility[];
    selectedMovilities: number[];
    handleSelectMovility: (id: number) => void;
    openViewModal: (movility: Movility) => void;
    openEditModal: (movility: Movility) => void;
}

const MovilityTable = ({
    movilities,
    selectedMovilities,
    handleSelectMovility,
    openViewModal,
    openEditModal,
}: MovilityTableProps) => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[800px] border rounded-lg shadow-sm">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-center font-bold text-primary min-w-[50px]"></th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Nombre</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Tipo de documento</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Evento</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Fecha de inicio</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Fecha fin</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {movilities.map((mob) => (
                            <tr key={mob.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3 text-center align-middle">
                                    <input
                                        type="checkbox"
                                        checked={selectedMovilities.includes(mob.id)}
                                        onChange={() => handleSelectMovility(mob.id)}
                                        className="form-checkbox h-4 w-4 text-primary"
                                    />
                                </td>
                                <td className="px-4 py-3">{mob.person.firstName}</td>
                                <td className="px-4 py-3">
                                    {documentTypeDict[mob.person.identificationType.trim().toUpperCase()] || mob.person.identificationType}
                                </td>
                                <td className="px-4 py-3">{mob.event.description}</td>
                                <td className="px-4 py-3">{mob.entryDate}</td>
                                <td className="px-4 py-3">{mob.exitDate}</td>
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => openViewModal(mob)}>
                                            <Eye className="w-5 h-5 text-primary" />
                                        </Button>
                                        <Button
                                            onClick={() => openEditModal(mob)}
                                            variant="outline"
                                            size="sm"
                                            className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovilityTable;
