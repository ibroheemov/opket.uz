import Taxometer from "./private/Taxometer";
import DriverDashboard from "./private/DriverDashboard";
import DriverRegistration from "./public/DriverRegistration";
import ProtectedRoute from "./ProtectedRoute";
import type { AppRoute } from "../types/route";
import PassengerProfile from "./private/PassengerProfile";

export const routes: AppRoute[] = [
    {
        path: "/",
        // element: <DriverRegistration />,
        element: <PassengerProfile />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DriverDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/taxometer",
        // element: (
        //     <ProtectedRoute>
        //         <Taxometer />
        //     </ProtectedRoute>
        // ),
        element: (
            <Taxometer />
        ),
    },
];
