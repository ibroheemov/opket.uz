import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { lightTheme, darkTheme, type Theme } from '../theme';

export const useTelegramTheme = (): Theme => {
    const [theme, setTheme] = useState<Theme>(
        // WebApp.colorScheme === 'dark' ? darkTheme : lightTheme
        darkTheme
    );

    useEffect(() => {
        const handleThemeChange = () => {
            const newTheme =
                WebApp.colorScheme === 'dark' ? darkTheme : lightTheme;
            setTheme(newTheme);
        };

        // Telegram theme can change dynamically
        WebApp.onEvent('themeChanged', handleThemeChange);

        // Cleanup
        return () => {
            WebApp.offEvent('themeChanged', handleThemeChange);
        };
    }, []);

    return theme;
};
