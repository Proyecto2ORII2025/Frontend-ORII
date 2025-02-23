import DynamicBreadCrumb from "@/components/dynamicBreadCrumb/dynamicBreadCrumb";
import { Label } from "@/components/ui/label";
import {
    Breadcrumb,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function Header() {


    return (
        <>
            <header className="border-b-2 border-tertiary/15 w-full">
                <Label className="pb-4">
                    Oficina de Relaciones Interinstitucionales e Internacionales
                </Label>
            </header>
            <Breadcrumb className="py-4">
                <BreadcrumbList>
                    <DynamicBreadCrumb />
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
}