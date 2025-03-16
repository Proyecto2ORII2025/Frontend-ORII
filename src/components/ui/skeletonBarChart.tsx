import { Skeleton } from "./skeleton";

export default function SkeletonBarChart() {
    return <div className="w-full h-4/5 flex flex-col items-center space-y-10 px-12 pb-8">
        <div className=" w-full h-full flex justify-center items-end space-x-10">
            <Skeleton className="h-1/2 w-20" />
            <Skeleton className="h-3/4 w-20" />
            <Skeleton className="h-1/2 w-20" /> 
            <Skeleton className="h-1/5 w-20" /> 
            <Skeleton className="h-3/4 w-20" /> 
        </div>
        <Skeleton className="h-8 w-3/4" />
    </div>;
}