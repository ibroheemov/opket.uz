// src/hooks/usePassengerData.ts
import { useCallback, useEffect, useState } from "react";
import axios from "axios";



const API_BASE = "https://opketme.uz/api";

export function usePassengerData(chatId?: number) {
    console.log("RUNNING");

    const [passenger, setPassenger] = useState<any>(null);
    const [ride, setRide] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // --- 1. Fetch Passenger ---
    const fetchPassenger = useCallback(async () => {
        if (!chatId) return null;

        console.log(chatId);


        try {
            const res = await axios.get(`${API_BASE}/user/${chatId}/get-passenger`);
            setPassenger(res.data);
            return res.data;
        } catch (err) {
            console.error("Failed to fetch passenger:", err);
            return null;
        }
    }, [chatId]);

    // --- 2. Fetch Current Ride ---
    const fetchCurrentRide = useCallback(
        async (rideId?: string) => {
            if (!rideId) return null;

            try {
                const res = await axios.post(`${API_BASE}/user/${rideId}/current-ride`);
                setRide(res.data);
                return res.data;
            } catch (err) {
                console.error("Failed to fetch current ride:", err);
                return null;
            }
        },
        []
    );

    // --- Combined Refetch ---
    const refetch = useCallback(async () => {
        setLoading(true);

        try {
            const passengerData = await fetchPassenger();
            if (passengerData?.currentRideId) {
                await fetchCurrentRide(passengerData.currentRideId);
            } else {
                setRide(null);
            }
        } finally {
            setLoading(false);
        }
    }, [fetchPassenger, fetchCurrentRide]);

    // --- Initial load ---
    useEffect(() => {
        if (!chatId) return;

        refetch();
    }, [refetch]);

    return { passenger, ride, loading, refetch, fetchPassenger, fetchCurrentRide };
}
