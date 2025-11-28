import { AppCard } from "../AppCard";
import { Shimmer } from "../Shimmer";

export const BalanceCardSkeleton = () => (
    <AppCard className="w-full p-4 space-y-4">
        <Shimmer className="w-32 h-5" />
        <Shimmer className="w-48 h-10" />
    </AppCard>
);