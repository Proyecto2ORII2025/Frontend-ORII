import { Skeleton } from "./skeleton";

export default function SkeletonPieChart() {
    return (
        <div className="pt-8 h-4/5 w-full flex justify-center items-center space-x-12">
            <Skeleton className="w-[30vw] h-[30vw] max-w-60 max-h-60 min-w-24 min-h-24 rounded-full" />
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-32 " />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-32 " />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-32 " />
                </div>
            </div>
        </div>
    );
}
