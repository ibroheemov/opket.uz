import type { DriverInfo } from "../../types/driver";
import type { RideModel } from "../../types/ride";



const DriverInfoCard: React.FC<{ driver: DriverInfo }> = ({ driver }) => (
    <div className="p-4 rounded-xl bg-black/20 border border-white/10 flex items-center gap-4">
        <AvatarIcon className="w-12 h-12 text-white/80" />
        <div className="flex-1">
            <p className="text-white font-semibold">{driver.name}</p>
            <p className="text-white/70 text-sm">{driver.carModel}, {driver.carColor}</p>
            <p className="text-white/70 text-sm">{driver.carNumber}</p>
        </div>
    </div>
);

export default DriverInfoCard;

const AvatarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </svg>
    </div>
);
