import { useEffect, useState } from "react";
import DriverRegisterForm from "./components/DriverRegisterForm";
import axios, { AxiosError } from "axios";
import DriverDashboard from "./pages/DriverDashboard";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  allows_write_to_pm?: boolean;
}

interface Ride {
  _id: string;
  pickup: { lat: number; lon: number; address?: string };
  dropoff?: { lat: number; lon: number; address?: string };
  status: string;
  fare: number;
  createdAt?: string;
}

interface DriverInfo {
  id: string;
  firstname: string;
  lastname: string;
  name: string;
  phone: string;
  car_model?: string;
  car_number?: string;
  vehicle: string;
  status: string;
  location?: { lat: number; lon: number };
  currentRideId?: string;
  selfie?: string;
  driver_license?: string;
  passport?: string;
}

declare global {
  interface Window {
    Telegram?: any;
  }
}

function App() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [driver, setDriver] = useState<DriverInfo | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState<string>("Verifying...");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.expand();

    const initData = tg?.initData;
    const colorScheme = tg?.colorScheme;
    const initDataUnsafe = tg?.initDataUnsafe;

    if (!initData || !initDataUnsafe?.user) {
      setReason("No Telegram data found");
      setLoading(false);
      return;
    }

    const telegramUser = initDataUnsafe.user;
    setUser(telegramUser);

    const fetchDriverData = async () => {
      setReason("NOOOOOOOOO")
      try {
        const response = await axios.post<{ driver?: DriverInfo; rides?: Ride[] }>(
          `https://nondemonstrably-untenuous-joann.ngrok-free.dev/driver/dashboard`,
          { chatId: telegramUser.id },
          {
            headers: {
              Accept: "application/json", // make sure server returns JSON
            }, timeout: 8000
          }
        );
        setReason(response.data.toString())

        const data = response.data;

        if (data.driver) {
          setDriver(data.driver);
          setRides(data.rides || []);
        } else {
          setDriver(null); // driver not found → show register form
        }
      } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err)) {
          const error = err as AxiosError;
          if (error.response) {
            setReason(`Backend error: ${(error.response.data as any)?.message || "unknown"}`);
          } else if (error.request) {
            setReason("Network error — could not reach server");
          } else {
            setReason("Unexpected client error");
          }
        } else {
          setReason("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-2xl font-bold mb-4">🚀 Telegram Mini</h1>
        <p>{reason}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">🚀 Telegram Mini</h1>
      <p>{reason}</p>
      {driver ? (
        <DriverDashboard />
      ) : (
        <DriverRegisterForm />
      )}
    </div>
  );
}

export default App;
