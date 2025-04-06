import { Label } from "@/components/ui/typography/label"
import Image from "next/image"

export default function Header() {
    return (
        <div className="flex items-center gap-2">
            <Image
                src="/logos/u blue.png"
                alt="Logo"
                width={50}
                height={50}
                unoptimized
                className="w-auto h-[30px] md:h-[50px]"
            />
            <div className="border border-blue h-12"></div>
            <Label className="text-xs md:text-xs">
                Oficina de Relaciones <br />Interinstitucionales <br />e Internacionales
            </Label>
        </div>
    )
}