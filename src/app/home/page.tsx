import MainLayout from "@/components/mainLayout/mainLayout";
import Title from "@/components/ui/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe2 } from "lucide-react";

export default function Home() {
    return (
        <MainLayout>
            <Title title="Inicio" />
            <div className="py-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <Globe2 className="h-6 w-6 text-blue" />
                            <h2 className="text-2xl font-bold text-blue">
                                Oficina de Relaciones Interinstitucionales e Internacionales (ORII)
                            </h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6 text-sm">
                            <p>
                                La internacionalización de la Universidad del Cauca es un proceso continuo y colaborativo que impulsa 
                                la proyección global de la institución. A través de la gestión de convenios y la implementación de 
                                estrategias, se busca fortalecer la participación en el ámbito internacional y consolidar su reconocimiento a nivel global.
                            </p>
                            <p>
                                En un mundo cada vez más interconectado, la educación superior enfrenta el reto de responder a las 
                                dinámicas de la globalización. La internacionalización universitaria no solo amplía oportunidades 
                                académicas, sino que también contribuye a la búsqueda de soluciones a problemáticas locales y globales.
                            </p>
                            <p>
                                En este contexto, la Oficina de Relaciones Interinstitucionales e Internacionales (ORII) juega un papel 
                                clave en la promoción, coordinación y apoyo a iniciativas de cooperación interinstitucional. Su labor 
                                responde a las exigencias del entorno mundial y a los objetivos de desarrollo institucional y nacional.
                            </p>
                            <p>
                                La ORII facilita el intercambio y la movilidad académica, permitiendo que estudiantes, docentes e 
                                investigadores participen en redes, organismos y eventos internacionales. A través de alianzas con 
                                universidades e instituciones académicas, tanto nacionales como extranjeras, promueve la excelencia en la 
                                formación y el crecimiento profesional de la comunidad universitaria.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
