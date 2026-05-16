import Taxometer from "./private/Taxometer";
import DriverDashboard from "./private/DriverDashboard";
import ProtectedRoute from "./ProtectedRoute";
import type { AppRoute } from "../types/route";
import PassengerProfile from "./private/PassengerProfile";
import DownloadRedirect from "../pages/DownloadRedirect";
import Landing from "../pages/Landing";

/** Public routes — rendered without ThemeProvider / Telegram SDK */
export const publicRoutes: AppRoute[] = [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/download",
        element: <DownloadRedirect />,
    },
    {
        path: "/support",
        element: <DownloadRedirect />,
    },
];

/** Telegram mini-app routes — wrapped in ThemeProvider */
export const appRoutes: AppRoute[] = [
    {
        path: "/app",
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
        element: (
            <Taxometer />
        ),
    },
];
