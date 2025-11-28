import type { ReactNode, CSSProperties } from "react";
import { useTelegramTheme } from "../hooks/useTelegramTheme";
import clsx from "clsx";

interface AppCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    padding?: string;     // Tailwind padding (default: "p-6")
    radius?: string;      // Tailwind rounded (default: "rounded-2xl")
    shadow?: string;      // Tailwind shadow (default: "shadow-xl")
    disableTheme?: boolean; // If true → ignore Telegram theme colors
}

export const AppCard: React.FC<AppCardProps> = ({
    children,
    className = "",
    style = {},
    padding = "p-6",
    radius = "rounded-2xl",
    shadow = "shadow-xl",
    disableTheme = false,
}) => {
    const theme = useTelegramTheme();

    return (
        <div
            className={clsx(
                "border border-white/10 backdrop-blur-md",
                padding,
                radius,
                shadow,
                className
            )}
            style={{
                backgroundColor: disableTheme
                    ? undefined
                    : theme.colors.card ?? "rgba(48, 52, 64, 0.7)",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
