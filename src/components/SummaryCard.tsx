interface Props {
    totalEarnings: number;
    grossEarnings: number;
    rideCount: number;
    period: "day" | "week" | "month";
}

export default function SummaryCard({
    totalEarnings,
    grossEarnings,
    rideCount,
    period,
}: Props) {
    return (
        <div className="text-center mb-4">
            {period !== "day" && (
                <p className="text-sm text-gray-500">{rideCount} заказов</p>
            )}
            <p className="text-3xl font-semibold">{totalEarnings.toLocaleString()} ₽</p>
            <p className="text-sm text-gray-500">
                {grossEarnings.toLocaleString()} ₽ до вычета
            </p>
        </div>
    );
}
