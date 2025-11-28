import { Wallet } from "lucide-react";

interface Ride {
    _id: string;
    time: string;
    address: string;
    fare: number;
}

export default function RideCard({ ride }: { ride: Ride }) {
    return (
        <li className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm">
            <div className="flex items-start space-x-3">
                <div className="bg-green-100 text-green-700 p-2 rounded-full">
                    <Wallet size={20} />
                </div>
                <div>
                    <p className="text-sm text-gray-800 font-medium">{ride.time}</p>
                    <p className="text-xs text-gray-600 leading-tight">{ride.address}</p>
                </div>
            </div>
            <p className="text-sm font-semibold">{ride.fare.toLocaleString()} ₽</p>
        </li>
    );
}
