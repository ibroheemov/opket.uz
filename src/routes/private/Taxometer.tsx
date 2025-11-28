import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { locationManager } from '@telegram-apps/sdk';
import { formatUZS } from '../../utils/format';

interface Coordinate {
    id: number;
    latitude: number;
    longitude: number;
    distance: number;
}

const RideStatus: React.FC = () => {
    const theme = useContext(ThemeContext);
    if (!theme) return null;

    const BASE_FARE = 2000;
    const PER_KM_FARE = 1000;

    const [coords, setCoords] = useState<Coordinate[]>([]);
    const [distance, setDistance] = useState(0); // meters
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Haversine formula
    const calculateDistance = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) => {
        const R = 6371e3; // meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Start location tracking
    useEffect(() => {
        const startTracking = async () => {
            const handleNewLocation = (latitude: number, longitude: number) => {
                setCoords((prev) => {
                    const newId = prev.length + 1;
                    let delta = 0;

                    if (prev.length > 0) {
                        const last = prev[prev.length - 1];
                        delta = calculateDistance(
                            last.latitude,
                            last.longitude,
                            latitude,
                            longitude
                        );
                    }

                    // ✅ Update distance safely using functional form
                    setDistance((prevDistance) => prevDistance + delta);

                    return [
                        ...prev,
                        { id: newId, latitude, longitude, distance: delta },
                    ];
                });
            };

            try {
                if (locationManager.isSupported() && locationManager.mount.isAvailable()) {
                    await locationManager.mount();

                    if (locationManager.requestLocation.isAvailable()) {
                        const location = await locationManager.requestLocation();
                        handleNewLocation(location.latitude, location.longitude);
                    }
                } else if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(
                        (pos) => {
                            handleNewLocation(pos.coords.latitude, pos.coords.longitude);
                        },
                        (err) => console.error('Geolocation error:', err),
                        { enableHighAccuracy: true }
                    );
                } else {
                    alert('Geolocation is not supported in this browser.');
                }
            } catch (err) {
                console.error('Error starting tracking:', err);
            }
        };

        startTracking();
    }, []);

    // Live timer
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format time
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    // ✅ Dynamic values update automatically on every render
    const distanceKm = distance / 1000;
    const fare = BASE_FARE + Math.floor(distanceKm * PER_KM_FARE);

    return (
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
            {/* Fare Card */}
            <div
                style={{ backgroundColor: theme.colors.card }}
                className="w-full shadow-card rounded-3xl p-6 font-semibold"
            >
                <h6 className="pb-3">Current trip's fare</h6>
                <h1 className="text-5xl">{formatUZS(fare)}</h1>
            </div>

            {/* Distance + Time Cards */}
            <div className="flex w-full gap-4">
                <div
                    style={{ backgroundColor: theme.colors.card }}
                    className="flex-1 rounded-2xl shadow-card p-6 text-center text-xl font-semibold"
                >
                    {distanceKm.toFixed(2)} KM
                </div>
                <div
                    style={{ backgroundColor: theme.colors.card }}
                    className="flex-1 rounded-2xl shadow-card p-6 text-center text-xl font-semibold"
                >
                    {formatTime(elapsedSeconds)}
                </div>
            </div>

            {/* End Ride Button */}
            <button
                style={{ backgroundColor: theme.colors.primary }}
                className="w-full text-white font-semibold py-3 rounded-2xl shadow-card active:scale-95 transition-transform"
            >
                End Ride
            </button>

            {/* Optional Coordinates */}
            <div
                style={{ backgroundColor: theme.colors.card }}
                className="w-full max-w-md rounded-2xl p-4 overflow-y-auto max-h-64 shadow-card"
            >
                {coords.map((coord) => (
                    <div
                        key={coord.id}
                        className="border-b border-gray-200 py-2 flex justify-between"
                    >
                        <span className="font-semibold text-blue-500">{coord.id}.</span>
                        <span className="text-gray-700">
                            {coord.latitude.toFixed(5)}, {coord.longitude.toFixed(5)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RideStatus;
