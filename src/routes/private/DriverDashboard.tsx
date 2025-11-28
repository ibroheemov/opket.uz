import { useState } from "react";
import PeriodSelector from "../../components/PeriodSelector";
import SummaryCard from "../../components/SummaryCard";
import RideList from "../../components/RideList";

interface Driver {
    name: string;
    status: string;
    vehicle: string;
}

interface Ride {
    _id: string;
    time: string;
    address: string;
    fare: number;
}

const sampleRides: Ride[] = [
    { _id: "1", time: "22:30", address: "ул. Хорошёвского Серебряного Бора 2-я линия, 47 ст13", fare: 1683 },
    { _id: "2", time: "16:35", address: "ул. Ленинградский проспект, 45г к77", fare: 890 },
    { _id: "3", time: "13:21", address: "Большой Палашёвский переулок, 1/14 ст1", fare: 323 },
    { _id: "4", time: "12:46", address: "ул. Флотская, 5 к2", fare: 878 },
    { _id: "5", time: "12:13", address: "ул. Бахрушина, 19 ст2", fare: 643 },
    { _id: "6", time: "11:43", address: "ул. Онежская, 24 ст1", fare: 524 },
];

const driver: Driver = {
    name: "Alexei",
    status: "Active",
    vehicle: "Toyota Camry",
};

export default function DriverDashboard() {
    const [period, setPeriod] = useState<"day" | "week" | "month">("day");

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto">
                <p className="text-lg">
                    Hello, <strong>{driver.name}</strong> 👋
                </p>
                <p className="text-gray-600">Status: {driver.status}</p>
                <p className="text-gray-600">Vehicle: {driver.vehicle}</p>

                <div className="mt-6 bg-white rounded-2xl shadow-sm p-4">
                    <PeriodSelector period={period} onChange={setPeriod} />
                    <SummaryCard
                        totalEarnings={6665}
                        grossEarnings={7890}
                        rideCount={71}
                        period={period}
                    />
                    <RideList rides={sampleRides} />
                </div>
            </div>
        </div>
    );
}
