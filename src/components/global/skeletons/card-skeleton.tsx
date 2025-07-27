import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export const CardSkeleton = () => {
    return (
        <div className="flex w-full flex-col space-y-3">
            <AspectRatio ratio={16 / 8}>
                <Skeleton className="h-full w-full rounded-xl" />
            </AspectRatio>
            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-[60%]" />
                <Skeleton className="h-6 w-full" />
            </div>
        </div>
    );
};
