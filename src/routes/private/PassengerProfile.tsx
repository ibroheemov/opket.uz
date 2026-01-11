import React from "react";
import BalanceCard from "./BalanceCard";
import { useTelegramUser } from "../../hooks/useTelegramUser";
import { usePassengerData } from "../../hooks/usePassengerData";
import { BalanceCardSkeleton } from "../../components/cards/BalanceCardSkeleton";

const UserBalanceScreen: React.FC<{}> = () => {
    const telegramUser = useTelegramUser();

    const { passenger, loading } = usePassengerData(telegramUser?.id);

    return (
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
            {/* Loading State */}
            {loading ? (
                <>
                    <BalanceCardSkeleton />
                </>
            ) : (
                <>
                    {passenger && <BalanceCard balance={passenger.balance} />}
                </>
            )}
        </div>
    );
};

export default UserBalanceScreen;
