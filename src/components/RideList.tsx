import RideCard from "./RideCard";

interface Ride {
    _id: string;
    time: string;
    address: string;
    fare: number;
}

interface Props {
    rides: Ride[];
}

export default function RideList({ rides }: Props) {
    if (rides.length === 0) return <p className="text-center">No rides found.</p>;

    return (
        <ul className="space-y-3">
            {rides.map((ride) => (
                <RideCard key={ride._id} ride={ride} />
            ))}
        </ul>
    );
}
