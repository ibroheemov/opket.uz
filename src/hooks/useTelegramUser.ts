import { useEffect, useState } from "react";

export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}

export function useTelegramUser() {
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        const tg = (window as any).Telegram?.WebApp;

        if (tg?.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user);
        }
    }, []);

    return user;
}
