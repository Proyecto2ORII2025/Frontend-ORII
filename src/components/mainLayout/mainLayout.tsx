"use client";

import React, { ReactNode, useEffect } from 'react';
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import LayoutSidebar from "@/components/sidebar/layout-sidebar";

const MemoizedLayoutSidebar = React.memo(LayoutSidebar);
const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);

// Para detectar renders
const renderCount = { count: 0 };

export default function MainLayout({ children }: { children: ReactNode }) {
    // Incrementar contador en cada renderizado
    renderCount.count++;
    
    console.log(`MainLayout renderizado ${renderCount.count} veces`);
    
    // Opcional: registrar cuando el componente se monta
    useEffect(() => {
        console.log('MainLayout montado');
        return () => console.log('MainLayout desmontado');
    }, []);
    
    return (
        <div className="flex w-full">
            <MemoizedLayoutSidebar>
                <div className="flex flex-col flex-1 w-full">
                    <div className="pt-4 px-4 w-full">
                        <MemoizedHeader />
                    </div>
                    <div className="flex-1 px-4 w-full">
                        {children}
                    </div>
                    <div className="p-4 w-full">
                        <MemoizedFooter />
                    </div>
                </div>
            </MemoizedLayoutSidebar>
        </div>
    );
}