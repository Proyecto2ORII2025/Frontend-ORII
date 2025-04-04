import { XCircleIcon } from "@heroicons/react/24/solid";

export default function ChartError() {
    return (
        <div className="h-3/4 flex flex-col items-center justify-center p-5 text-error">
            <XCircleIcon className="w-10 h-10" />
            <p className="text-lg font-bold mt-2 ">Error al cargar los datos</p>
            <p className="text-center text-sm">
                Ocurrió un error al obtener la información. Por favor, intenta nuevamente.
            </p>
        </div>
    );
}