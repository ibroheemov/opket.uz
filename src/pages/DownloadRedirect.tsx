import { useEffect, useState } from "react";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
    const ua = navigator.userAgent || navigator.vendor;

    if (/iPad|iPhone|iPod/.test(ua)) return "ios";
    if (/android/i.test(ua)) return "android";

    return "unknown";
}

const STORE_URLS: Record<Platform, string> = {
    ios: "https://daryo.uz",
    android: "https://play.google.com/store/apps/details?id=com.saabiqoon.tasbeeh",
    unknown: "https://kun.uz",
};

export default function DownloadRedirect() {
    const [platform, setPlatform] = useState<Platform | null>(null);

    useEffect(() => {
        const detected = detectPlatform();
        setPlatform(detected);
        window.location.href = STORE_URLS[detected];
    }, []);

    const handleManualRedirect = (target: Platform) => {
        window.location.href = STORE_URLS[target];
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
            <div className="mb-8">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold text-white shadow-lg">
                    O
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Opket</h1>
            </div>

            {platform === null ? (
                <p className="text-gray-500">Detecting your device…</p>
            ) : platform === "unknown" ? (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        We couldn't detect your device automatically. Choose your platform:
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => handleManualRedirect("ios")}
                            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                        >
                            Download for iOS
                        </button>
                        <button
                            onClick={() => handleManualRedirect("android")}
                            className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                        >
                            Download for Android
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">
                    Redirecting to the {platform === "ios" ? "App Store" : "Play Store"}…
                </p>
            )}
        </div>
    );
}
