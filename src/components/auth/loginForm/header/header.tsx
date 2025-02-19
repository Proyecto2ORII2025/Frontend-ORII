import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginHeader () {
    return (
        <div className="flex items-center gap-2 h-[55px]">
            <Image
                src="/u blue.png"
                alt="Logo"
                width={45}
                height={45}
                className="w-auto h-auto"
            />
            <div className="border border-blue h-full"></div>
            <Label className="text-[9px] md:text-[11px]">
                Oficina de Relaciones <br />Interinstitucionales <br />e Internacionales
            </Label>
        </div>
    )
}