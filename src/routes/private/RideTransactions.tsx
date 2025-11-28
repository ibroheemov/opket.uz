import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import type { RideTransaction } from "../../types/ride";


interface RideTransactionsProps {
    transactions: RideTransaction[];
}

export const RideTransactions: React.FC<RideTransactionsProps> = ({ transactions }) => {
    if (!transactions?.length) {
        return (
            <p className="text-sm text-gray-400 text-center py-4">
                Bu yerda safar bo‘yicha to‘lovlar ko‘rinadi
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {transactions.map((tx, idx) => {
                const isSent = tx.type === "passenger_to_driver";
                const Icon = isSent ? ArrowUp : ArrowDown;
                const colorClass = isSent ? "text-red-400" : "text-green-400";
                const formattedDate = format(new Date(tx.createdAt), "MMM do HH:mm, yyyy");

                return (
                    <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/10"
                    >
                        {/* Left: icon + type */}
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full bg-white/10`}>
                                <Icon className={`w-5 h-5 ${colorClass}`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white/90 text-sm">
                                    {isSent ? "Yuborildi" : "Qabul qilindi"}
                                </span>
                                <span className="text-gray-400 text-xs">{formattedDate}</span>
                            </div>
                        </div>

                        {/* Right: Amount */}
                        <span className={`text-lg font-bold ${colorClass}`}>
                            {tx.amount.toLocaleString("ru-RU")} UZS
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
