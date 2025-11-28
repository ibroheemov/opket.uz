export interface User {
    _id: string;
    chatId: number;
    balance: number;
    currentRideId?: string;
}
