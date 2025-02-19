import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import LayoutSidebar from "@/components/sidebar/layout-sidebar";

export default function Home() {
    return (
        <div className="flex w-full">
            <LayoutSidebar>
                <div className="flex flex-col flex-1 w-full">
                    <div className="p-4 w-full">
                        <Header />
                    </div>
                    <div className="flex-1 p-4 w-full">
                    </div>
                    <div className="p-4 w-full">
                        <Footer />
                    </div>
                </div>
            </LayoutSidebar>
        </div>
    );
}