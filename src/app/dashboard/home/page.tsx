'use client';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/layout/card"
import { Globe2, BookOpen, Users, ArrowRight, GraduationCap, MapPin } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { UserRole } from "@/types/userType";

export default function Home() {
    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole) || 'USER';

    return (
        <>
            {/* Hero Section */}
            <section className="relative mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-blueDark to-[#0150C5] text-white">
                <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-16 lg:p-20">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold font-open-sans sm:text-4xl md:text-5xl">
                            Oficina de Relaciones Interinstitucionales e Internacionales
                        </h1>
                        <p className="max-w-[600px] text-lg text-white/90 leading-relaxed">
                            Impulsando la proyección global de la Universidad del Cauca a través de cooperación internacional y
                            movilidad académica.
                        </p>
                        <div className="flex flex-wrap gap-4">
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
                        <div className="relative size-96 overflow-hidden rounded-full border-4 border-white shadow-white/30 shadow-xl">
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

            {/* Services Section */}
            <section className="mb-16">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl text-[#0150C5] font-bold tracking-tight sm:text-3xl">Nuestros Servicios</h2>
                    <p className="mx-auto mt-2 max-w-[700px] text-[#0150C5]/80 font-medium">
                        Descubre las oportunidades que ofrecemos para la comunidad universitaria
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="transition-all hover:shadow-md border-t-4 border-t-[#0150C5]">
                        <CardHeader className="pb-2">
                            <div className="mb-2 rounded-full bg-[#E6EFF8] p-2 w-10 h-10 flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-[#0150C5]" />
                            </div>
                            <CardTitle className="text-[#0150C5]">Movilidad Académica</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 leading-relaxed">
                                Programas de intercambio estudiantil, pasantías internacionales y oportunidades para docentes e
                                investigadores.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" size="sm" className="gap-1 px-0 text-[#0150C5] hover:text-[#0150C5]/80 transition-colors">
                                Conocer más <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-all hover:shadow-md border-t-4 border-t-[#0150C5]">
                        <CardHeader className="pb-2">
                            <div className="mb-2 rounded-full bg-[#E6EFF8] p-2 w-10 h-10 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-[#0150C5]" />
                            </div>
                            <CardTitle className="text-[#0150C5]">Convenios Internacionales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 leading-relaxed">
                                Alianzas estratégicas con universidades e instituciones académicas de todo el mundo.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" size="sm" className="gap-1 px-0 text-[#0150C5] hover:text-[#0150C5]/80 transition-colors">
                                Conocer más <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-all hover:shadow-md border-t-4 border-t-[#0150C5]">
                        <CardHeader className="pb-2">
                            <div className="mb-2 rounded-full bg-[#E6EFF8] p-2 w-10 h-10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-[#0150C5]" />
                            </div>
                            <CardTitle className="text-[#0150C5]">Cooperación Internacional</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 leading-relaxed">
                                Proyectos de investigación conjunta, redes académicas y participación en eventos internacionales.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" size="sm" className="gap-1 px-0 text-[#0150C5] hover:text-[#0150C5]/80 transition-colors">
                                Conocer más <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mb-16 rounded-xl bg-gradient-to-r from-[#E6EFF8] to-[#F5F9FD] p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl text-[#0150C5] font-bold tracking-tight sm:text-3xl">Impacto Global</h2>
                    <p className="mx-auto mt-2 max-w-[700px] text-[#0150C5]/80 font-medium">Nuestra presencia internacional en números</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#0150C5]">50+</p>
                        <p className="mt-2 font-medium text-slate-700">Convenios Activos</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#0150C5]">25</p>
                        <p className="mt-2 font-medium text-slate-700">Países Colaboradores</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#0150C5]">200+</p>
                        <p className="mt-2 font-medium text-slate-700">Estudiantes en Movilidad</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#0150C5]">30+</p>
                        <p className="mt-2 font-medium text-slate-700">Proyectos Internacionales</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section>
                <Card className="overflow-hidden border-none bg-gradient-to-r from-[#E6EFF8] to-[#F5F9FD] shadow-md">
                    <div className="grid md:grid-cols-2">
                        <CardContent className="p-6 md:p-8">
                            <div className="mb-4 flex items-center gap-2">
                                <Globe2 className="h-6 w-6 text-[#0150C5]" />
                                <h3 className="text-xl font-bold text-[#0150C5]">Contáctanos</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#0150C5]" />
                                    <div>
                                        <p className="font-medium text-[#0150C5]">Ubicación</p>
                                        <p className="text-slate-600">Universidad del Cauca, Edificio Principal, Oficina 203</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0150C5]">Horario de Atención</p>
                                    <p className="text-slate-600">Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 6:00 PM</p>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0150C5]">Correo Electrónico</p>
                                    <p className="text-slate-600">orii@unicauca.edu.co</p>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0150C5]">Teléfono</p>
                                    <p className="text-slate-600">+57 (2) 8209800 Ext. 2630</p>
                                </div>
                            </div>
                        </CardContent>
                        <div className="relative min-h-[300px] bg-[#0150c5] md:min-h-[400px] overflow-hidden">
                            <Image
                                src="/logos/UNICAUCA_ORII.webp"
                                alt="ORII Office"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white from-[0%] to-transparent to-[2%]"></div>
                        </div>
                    </div>
                </Card>
            </section>
        </>
    )
}