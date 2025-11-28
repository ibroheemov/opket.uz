import type { DriverInfo } from "./driver";

// 1️⃣ Transaction type
export interface RideTransaction {
    fromUserId: string;      // who paid
    toUserId: string;        // who received
    amount: number;          // amount paid
    type: "passenger_to_driver" | "driver_to_passenger";
    createdAt: string;       // ISO date string
}

export interface RideModel {
    _id: string;
    driverId: string;
    fare: number;
    driver: DriverInfo;
    transactions?: RideTransaction[];
}