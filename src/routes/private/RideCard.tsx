import React, { useState } from "react";
import { AppCard } from "../../components/AppCard";
import { AppButton } from "../../components/AppButton";
import Input from "../../components/Input";
import { formatUZS } from "../../utils/format";
import type { RideModel } from "../../types/ride";
import DriverInfoCard from "./DriverInfoCard";
import { Ban } from "lucide-react";
import { useTelegramUser } from "../../hooks/useTelegramUser";
import { toast } from "sonner";
import { payFare } from "../../api/payFare";
import { RideTransactions } from "./RideTransactions";

const RideCard: React.FC<{ ride?: RideModel | null, refetchPassenger: () => Promise<any> }> = ({ ride, refetchPassenger }) => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const telegramUser = useTelegramUser();
    const chatId = telegramUser?.id ?? 7175509887;

    const pay = async () => {
        if (!chatId) return toast.error("Telegram user not found");
        if (!amount || Number(amount) <= 0) return toast.error("To‘lov summasini kiriting");
        if (!ride?.driverId) return toast.error("Haydovchi topilmadi");

        try {
            setLoading(true);
            const numericAmount = Number(amount.replace(/\s/g, ""));

            const data = await payFare(chatId, ride?.driverId, numericAmount);

            toast.success("To‘lov muvaffaqiyatli amalga oshirildi!");

            refetchPassenger() // update balance
            setAmount(""); // reset input

        } catch (err: any) {
            toast.error(err.message || "Xato yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    if (!ride) {
        return (
            <AppCard className="w-full py-8 flex flex-col items-center text-center space-y-3">

                {/* Icon */}
                <Ban className="w-12 h-12 text-white/40" />

                {/* Title */}
                <h3 className="text-lg font-semibold text-white/90">
                    Sizda safar yo‘q
                </h3>
                {/* Subtitle */}
                <p className="text-sm text-white/50 leading-relaxed">
                    Bu yerda safaringiz haqida ma’lumot ko‘rinadi
                </p>
            </AppCard>
        );
    }

    return (
        <AppCard className="w-full space-y-4">
            {/* Ride Header */}
            <h2 className="text-xl font-semibold text-white">Joriy Safar</h2>

            {/* Fare */}
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{formatUZS(ride.fare)}</span>
                <span className="text-lg font-medium text-green-400">UZS</span>
            </div>

            {/* Driver Info */}
            <DriverInfoCard driver={ride.driver} />


            {/* Ride Transactions */}
            <RideTransactions transactions={ride?.transactions ?? []} />

            {/* Pay Section */}
            <div className="mt-4 space-y-2">
                <Input
                    type="text"
                    placeholder="Summani kiriting"
                    value={amount}
                    onChange={(e) => {
                        let val = e.target.value;

                        // remove non-digits
                        val = val.replace(/\D/g, "");

                        // remove leading zeros
                        val = val.replace(/^0+/, "");

                        // format with spaces
                        const formatted = formatUZS(val);

                        setAmount(formatted);
                    }}
                    className="bg-black/20 border-white/20 text-white"
                />
                <AppButton text={"To'lash"} loading={loading} onClick={() => pay()} />
            </div>
        </AppCard>
    );
};

export default RideCard;