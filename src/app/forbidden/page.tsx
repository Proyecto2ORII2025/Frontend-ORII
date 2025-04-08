"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/layout/card"
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"

export default function Forbidden() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Función para volver atrás en la navegación
    const handleGoBack = () => {
        // Intenta volver atrás en el historial del navegador
        window.history.back()
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="max-w-md w-full shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-[#407BFF] text-white text-center py-4">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                            }}
                            className="flex items-center justify-center gap-2 mb-2"
                        >
                            <ShieldAlert className="h-10 w-10" />
                            <div className="relative h-12 w-32">
                                <Image src="/img/orii.webp" fill alt="ORII Logo" className="object-contain" priority />
                            </div>
                        </motion.div>
                        <CardTitle className="text-2xl font-bold mt-1">Acceso Restringido</CardTitle>
                    </CardHeader>

                    <CardContent className="pt-4 pb-2">
                        <div className="relative h-[180px] w-full mb-4">
                            <Image
                                src="/img/403.svg"
                                fill
                                alt="403 Forbidden"
                                className="object-contain"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3 text-center"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">403 Forbidden</h2>
                            <div className="flex items-center justify-center gap-2 text-[#407BFF]">
                                <AlertCircle className="h-5 w-5" />
                                <p className="font-medium">No tienes permisos para acceder</p>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Lo sentimos, pero no cuentas con los permisos necesarios para visualizar este contenido.
                                Contacta al administrador si crees que esto es un error.
                            </p>
                        </motion.div>
                    </CardContent>

                    <CardFooter className="flex justify-center py-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                className="bg-[#407BFF] hover:bg-blue-600 text-white gap-2"
                                onClick={handleGoBack}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Volver atrás
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-sm text-gray-500"
            >
                Si necesitas ayuda, contacta a soporte técnico
            </motion.p>
        </div>
    )
}