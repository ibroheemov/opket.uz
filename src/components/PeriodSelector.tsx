interface Props {
    period: "day" | "week" | "month";
    onChange: (value: "day" | "week" | "month") => void;
}

export default function PeriodSelector({ period, onChange }: Props) {
    const options = [
        { key: "day", label: "День" },
        { key: "week", label: "Неделя" },
        { key: "month", label: "Месяц" },
    ] as const;

    return (
        <div className="flex justify-around border-b pb-2 mb-3">
            {options.map((opt) => (
                <button
                    key={opt.key}
                    className={`text-sm font-medium transition ${period === opt.key
                            ? "text-black border-b-2 border-black"
                            : "text-gray-400"
                        }`}
                    onClick={() => onChange(opt.key)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
