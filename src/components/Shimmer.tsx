export const Shimmer: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />
);