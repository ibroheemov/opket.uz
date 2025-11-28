import { AppCard } from "../AppCard";
import { Shimmer } from "../Shimmer";

export const RideCardSkeleton = () => (
    <AppCard className="w-full p-4 space-y-4">
        <Shimmer className="w-36 h-6" />
        <Shimmer className="w-40 h-8" />
        <Shimmer className="w-full h-20" />
    </AppCard>
);