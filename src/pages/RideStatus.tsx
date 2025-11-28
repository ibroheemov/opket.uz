import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { formatUZS } from '../utils/format';

const RideStatus: React.FC = () => {
    const theme = useContext(ThemeContext);
    if (!theme) return null;

    return (
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
            {/* Top Card (Full Width) */}
            <div
                style={{ backgroundColor: theme.colors.card }}
                className="w-full shadow-[var(--shadow-card)] rounded-3xl p-6 font-semibold"
            >
                <h6 className="pb-3">Current trip's fare</h6>
                <h1 className="text-5xl">{formatUZS(20000)}</h1>
            </div>

            {/* Two Cards Side by Side */}
            <div className="flex w-full gap-4">
                <div
                    style={{ backgroundColor: theme.colors.card }}
                    className="flex-1 rounded-2xl shadow-[var(--shadow-card)] p-6 text-center text-3xl font-semibold"
                >
                    0 KM
                </div>
                <div
                    style={{ backgroundColor: theme.colors.card }}
                    className="flex-1 rounded-2xl shadow-[var(--shadow-card)] p-6 text-center text-3xl font-semibold"
                >
                    00:00
                </div>
            </div>

            {/* End Ride Button */}
            <button
                style={{ backgroundColor: theme.colors.primary }}
                className="w-full text-white font-semibold py-3 rounded-2xl shadow-md active:scale-95 transition-transform"
            >
                End Ride
            </button>
        </div>
    );
};

export default RideStatus;
