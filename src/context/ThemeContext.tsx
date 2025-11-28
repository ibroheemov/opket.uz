import React, { createContext, type ReactNode } from 'react';
import type { Theme } from '../theme';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

export const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useTelegramTheme();

    return (
        <ThemeContext.Provider value={theme}>
            <div style={{
                ['--shadow-card' as any]: theme.mode === 'dark'
                    ? '0 0 2px 0 rgba(0 0 0 / 20%), 0 12px 24px -4px rgba(0 0 0 / 12%)'
                    : '0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)',
                backgroundColor: theme.colors.background, color: theme.colors.text
            }} className={`min-h-screen transition-colors duration-300`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
