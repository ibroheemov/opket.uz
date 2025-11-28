import { AppCard } from "../../components/AppCard";
import { formatUZS } from "../../utils/format";

const BalanceCard: React.FC<{ balance: number }> = ({ balance }) => (
    <AppCard className="w-full">
        <div className="flex items-center gap-2 mb-4">
            <WalletIcon className="w-5 h-5 text-white/80" />
            <h2 className="text-lg font-semibold text-white/90">Balans</h2>
        </div>
        <p className="flex items-baseline">
            <span className="text-4xl font-bold text-white">{formatUZS(balance)}</span>
            <span className="ml-2 text-lg font-medium text-green-400">UZS</span>
        </p>
    </AppCard>
);

export default BalanceCard;

const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.75V6.75C21 5.64543 20.1046 4.75 19 4.75H5C3.89543 4.75 3 5.64543 3 6.75V17.25C3 18.3546 3.89543 19.25 5 19.25H19C20.1046 19.25 21 18.3546 21 17.25V14.75M21 12.75H16.75C15.6454 12.75 14.75 13.6454 14.75 14.75C14.75 15.8546 15.6454 16.75 16.75 16.75H21V12.75Z"
        />
    </svg>
);