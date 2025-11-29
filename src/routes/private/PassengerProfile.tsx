import React from "react";
import BalanceCard from "./BalanceCard";
import RideCard from "./RideCard";
import { useTelegramUser } from "../../hooks/useTelegramUser";
import { usePassengerData } from "../../hooks/usePassengerData";
import { BalanceCardSkeleton } from "../../components/cards/BalanceCardSkeleton";
import { RideCardSkeleton } from "../../components/cards/RideCardSkeleton";

const UserBalanceScreen: React.FC<{}> = () => {
    const telegramUser = useTelegramUser();

    const { passenger, ride, loading, refetch } = usePassengerData(telegramUser?.id);

    return (
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
            {/* Loading State */}
            {loading ? (
                <>
                    <BalanceCardSkeleton />
                    <RideCardSkeleton />
                </>
            ) : (
                <>
                    {passenger && <BalanceCard balance={passenger.balance} />}
                    <RideCard ride={ride} refetchPassenger={refetch} />
                </>
            )}
        </div>
    );
};

export default UserBalanceScreen;
