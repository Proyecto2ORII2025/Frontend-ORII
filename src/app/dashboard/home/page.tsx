'use client';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/layout/card"
import { Globe2, BookOpen, Users, ArrowRight, GraduationCap, MapPin } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { UserRole } from "@/types/userType";
import MultiColorBar from "@/components/ui/layout/multi-color-bar";

export default function Home() {
    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole) || 'USER';

    return (
        <>
            {/* Hero Section */}
            <section className="relative mb-16 rounded-xl bg-gradient-to-r from-blueDark to-[#0150C5] text-white">
                <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-16 lg:p-20">
                    <div className="flex flex-col gap-10">
                        <h1 className="text-3xl font-bold font-open-sans sm:text-4xl md:text-5xl">
                            Oficina de Relaciones Interinstitucionales e Internacionales
                        </h1>
                        <p className="max-w-[600px] text-base text-white/90 leading-relaxed">
                            Impulsando la proyección global de la Universidad del Cauca a través de cooperación internacional y
                            movilidad académica.
                        </p>
                        <div className="flex flex-wrap gap-4 w-full sm:w-3/4 md:w-1/2">
                            {role === 'SU' ? (
                                <Button className="bg-white text-[#0150C5] hover:bg-white/90 font-bold transition-all">
                                    <Link href="/dashboard/users">Registrar enlace</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button className="bg-white text-[#0150C5] hover:bg-white/90 font-bold transition-all">
                                        <Link href="/dashboard/movility">Programas de Movilidad</Link>
                                    </Button>
                                    <Button className="bg-transparent border-2 border-white hover:bg-white/10 font-bold transition-all">
                                        <Link href="/dashboard/agreements">Convenios Internacionales</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hidden items-center justify-center md:flex">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-white shadow-white/30 shadow-xl">
                            <Image src="/logos/UNICAUCA_ORII.webp" alt="Global education" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mb-16">
            <div className="mb-8 text-center">
                <h2 className="text-2xl text-[#0150C5] font-bold tracking-tight sm:text-3xl">Nuestra Misión</h2>
                <p className="mx-auto mt-2 max-w-[700px] text-[#0150C5]/80 font-medium">
                Facilitando conexiones globales para enriquecer la experiencia académica
                </p>
            </div>
            <Card className="border-none shadow-lg">
                <CardContent className="p-6 md:p-8">
                <div className="space-y-6 text-base leading-7 text-slate-700">
                    <p className="first-letter:text-lg first-letter:font-medium first-letter:text-[#0150C5]">
                    La internacionalización de la Universidad del Cauca es un proceso continuo y colaborativo que impulsa la
                    proyección global de la institución. A través de la gestión de convenios y la implementación de
                    estrategias, se busca fortalecer la participación en el ámbito internacional y consolidar su
                    reconocimiento a nivel global.
                    </p>
                    <p>
                    En un mundo cada vez más interconectado, la educación superior enfrenta el reto de responder a las
                    dinámicas de la globalización. La internacionalización universitaria no solo amplía oportunidades
                    académicas, sino que también contribuye a la búsqueda de soluciones a problemáticas locales y globales.
                    </p>
                    <p>
                    La ORII facilita el intercambio y la movilidad académica, permitiendo que estudiantes, docentes e
                    investigadores participen en redes, organismos y eventos internacionales. A través de alianzas con
                    universidades e instituciones académicas, tanto nacionales como extranjeras, promueve la excelencia en
                    la formación y el crecimiento profesional de la comunidad universitaria.
                    </p>
                </div>
                </CardContent>
            </Card>
            </section>
        </>
    )
}