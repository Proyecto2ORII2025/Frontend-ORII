import { Skeleton } from "../skeletons/skeleton";

export default function SkeletonLineChart() {
    return (
        <div className="w-full h-4/5 flex flex-col items-center space-y-6 px-12 pb-8">
            <div className="w-full h-full flex flex-col justify-center space-y-4">
                <Skeleton className="h-1 w-full" />
                <Skeleton className="h-1 w-full" />
                <Skeleton className="h-1 w-full" />
                <Skeleton className="h-1 w-full" />
                <Skeleton className="h-1 w-full" />
            </div>

            <Skeleton className="h-8 w-3/4" />
        </div>
    );
}
