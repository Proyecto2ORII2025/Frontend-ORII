import { Skeleton } from "@/components/ui/skeletons/skeleton";

type SkeletonLoaderProps = {
    count?: number;
    variant?: "main" | "user";
};

export default function SkeletonLoader({ count = 2, variant = "main" }: SkeletonLoaderProps) {

    return (
        <div className={variant === "main" ? "w-full max-w-[300px] bg-blueDark text-white p-4 space-y-4" : "flex items-center"}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>
                    {variant === "main" ? (
                        <div className="flex items-center space-x-4">
                            <Skeleton className="size-6 rounded-full" />
                            <Skeleton className="h-3 w-[150px] rounded-md" />
                        </div>
                    ) : (
                        <div
                            className={`flex items-center justify-center space-x-2 py-2 px-2 text-gray-900`}
                        >
                            <Skeleton className="size-9 rounded-full bg-gray-300" />
                            <div className="flex-col space-y-1 hidden md:flex">
                                <Skeleton className="h-4 w-[200px] bg-gray-300" />
                                <Skeleton className="h-3 w-[150px] bg-gray-300" />
                            </div>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}