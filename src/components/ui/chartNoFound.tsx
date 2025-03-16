import Image from "next/image";

export default function ChartNoFound() {
    return (
        <div className="h-3/4 flex flex-col items-center justify-center p-5 text-redLight">
            <Image
                src="/noFound.jpg"
                width={200}
                height={200}
                alt="No hay datos disponibles"
            />
            <p className="text-lg font-bold mt-2 ">No hay datos disponibles</p>
            <p className="text-center text-sm">
                Ocurrió un problema al obtener la información. Por favor, intenta nuevamente.
            </p>
        </div>
    );
}