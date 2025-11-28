import { useTelegramTheme } from "../hooks/useTelegramTheme";

export const AppButton: React.FC<{ text: String, loading: boolean, onClick: () => void }> = ({ text, loading = false, onClick }) => {
    const theme = useTelegramTheme();

    return (
        <button
            onClick={onClick}
            type="button"
            style={{ backgroundColor: theme.colors.primary }}
            disabled={loading}
            className="w-full py-3 mt-4 text-white rounded-xl font-semibold shadow-lg transition-all disabled:opacity-60"
        >
            {text}
        </button>
    );
}

