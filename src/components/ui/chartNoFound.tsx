import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function ChartNoFound() {
    return (
        <div className="h-3/4 flex flex-col items-center justify-center p-5 text-error">
            <InformationCircleIcon className="w-10 h-10" />
            <p className="text-lg font-bold mt-2 ">No hay datos disponibles</p>
            <p className="text-center text-sm">
                Verifica que haya información registrada.
            </p>
        </div>
    );
}