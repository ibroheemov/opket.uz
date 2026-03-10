import { useEffect, useRef, useState } from "react";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
    const ua = navigator.userAgent || navigator.vendor;

    if (/iPad|iPhone|iPod/.test(ua)) return "ios";
    if (/Macintosh/.test(ua) && "ontouchend" in document) return "ios";
    if (/android/i.test(ua)) return "android";

    return "unknown";
}

const STORE_URLS: Record<Platform, string> = {
    ios: "https://apps.apple.com/us/app/opket-taxi/id6759873649",
    android: "https://play.google.com/store/apps/details?id=com.saabiqoon.tasbeeh",
    unknown: "https://play.google.com/store/apps/details?id=com.saabiqoon.tasbeeh",
};

export default function DownloadRedirect() {
    const [platform, setPlatform] = useState<Platform | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const detected = detectPlatform();
        setPlatform(detected);
        const url = STORE_URLS[detected];

        window.location.replace(url);

        const t1 = setTimeout(() => {
            window.location.href = url;
        }, 300);

        const t2 = setTimeout(() => {
            linkRef.current?.click();
        }, 800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const target = platform ? STORE_URLS[platform] : STORE_URLS.unknown;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
            <a ref={linkRef} href={target} className="hidden" aria-hidden="true">redirect</a>

            <div className="mb-8">
                <img src="/logo/logo.jpg" alt="Opket" className="mx-auto mb-4 h-20 w-20 rounded-2xl shadow-lg object-cover" />
                <h1 className="text-2xl font-bold text-gray-900">Opket</h1>
            </div>

            {platform === null || platform !== "unknown" ? (
                <div>
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-3 border-gray-200 border-t-gray-800" />
                    <p className="text-gray-500">
                        {platform === "ios" ? "App Store" : "Play Store"}'ga yo'naltirilmoqda…
                    </p>
                    <a
                        href={target}
                        className="mt-4 inline-block text-sm font-medium text-blue-600 underline"
                    >
                        Avtomatik o'tmasa, bu yerni bosing
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Qurilmangiz aniqlanmadi. Platformangizni tanlang:
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                            href={STORE_URLS.ios}
                            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                        >
                            iOS uchun yuklab olish
                        </a>
                        <a
                            href={STORE_URLS.android}
                            className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                        >
                            Android uchun yuklab olish
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
