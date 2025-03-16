import Image from "next/image";

export default function ChartError() {
    return (
        <div className="h-3/4 flex flex-col items-center justify-center p-5 text-redLight">
            <Image
                src="/error.jpg"
                width={150}
                height={150}
                alt="Error al cargar los datos"
            />
            <p className="text-lg font-bold mt-2 ">Error al cargar los datos</p>
            <p className="text-center text-sm">
                Ocurrió un problema al obtener la información. Por favor, intenta nuevamente.
            </p>
        </div>
    );
}
