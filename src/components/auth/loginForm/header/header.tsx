import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginHeader () {
    return (
        <div className="flex items-center gap-2 h-[30px] md:h-[50px]">
            <Image
                src="/u blue.png"
                alt="Logo"
                width={50}
                height={50}
                className="w-[30px] md:w-[50px]"
            />
            <div className="border border-blue h-full"></div>
            <Label>
                Oficina de Relaciones <br />Interinstitucionales <br />e Internacionales
            </Label>
        </div>
    )
}