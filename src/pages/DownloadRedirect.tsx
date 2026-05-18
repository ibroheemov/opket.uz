import { useEffect, useRef, useState } from "react";

type Platform = "ios" | "android" | "unknown";

const ANDROID_PACKAGE = "com.saabiqoon.tasbeeh";
const IOS_APP_URL = "https://apps.apple.com/us/app/opket-taxi/id6759873649";

function detectPlatform(): Platform {
    const ua = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(ua)) return "ios";
    if (/Macintosh/.test(ua) && "ontouchend" in document) return "ios";
    if (/android/i.test(ua)) return "android";
    return "unknown";
}

function buildStoreUrl(platform: Platform, refCode: string | null): string {
    if (platform === "ios") return IOS_APP_URL;

    const base = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
    if (refCode) return `${base}&referrer=${encodeURIComponent(`ref=${refCode}`)}`;
    return base;
}

export default function DownloadRedirect() {
    const [platform, setPlatform] = useState<Platform | null>(null);
    const [refCode, setRefCode] = useState<string | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const didRedirect = useRef(false);

    useEffect(() => {
        const ref = new URLSearchParams(window.location.search).get("ref");
        setRefCode(ref);

        if (didRedirect.current) return;
        didRedirect.current = true;

        const detected = detectPlatform();
        setPlatform(detected);

        // iOS: don't auto-redirect — show the code so user can type it in
        if (detected === "ios") return;

        const url = buildStoreUrl(detected, ref);

        window.location.replace(url);

        const t1 = window.setTimeout(() => window.location.assign(url), 300);
        const t2 = window.setTimeout(() => linkRef.current?.click(), 800);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
        };
    }, []);

    const androidUrl = buildStoreUrl("android", refCode);
    const redirectUrl = platform ? buildStoreUrl(platform, refCode) : androidUrl;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
            <a ref={linkRef} href={redirectUrl} className="hidden" aria-hidden="true">redirect</a>

            <div className="mb-8">
                <img src="/logo/logo.jpg" alt="Opket" className="mx-auto mb-4 h-20 w-20 rounded-2xl shadow-lg object-cover" />
                <h1 className="text-2xl font-bold text-gray-900">Opket</h1>
            </div>

            {/* Referral code badge — shown for iOS and unknown */}
            {refCode && platform !== "android" && (
                <div className="mb-6 rounded-2xl border-2 border-dashed border-green-400 bg-green-50 px-8 py-4">
                    <p className="mb-1 text-sm text-gray-500">Referral kodingiz</p>
                    <p className="text-3xl font-bold tracking-widest text-green-700">{refCode}</p>
                    <p className="mt-2 text-xs text-gray-400">
                        Ilovani yuklab olgach, ro'yxatdan o'tishda shu kodni kiriting
                    </p>
                </div>
            )}

            {platform === "android" && (
                <div>
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-3 border-gray-200 border-t-gray-800" />
                    <p className="text-gray-500">Play Store'ga yo'naltirilmoqda…</p>
                    <a href={androidUrl} className="mt-4 inline-block text-sm font-medium text-blue-600 underline">
                        Avtomatik o'tmasa, bu yerni bosing
                    </a>
                </div>
            )}

            {platform === "ios" && (
                <div className="space-y-4">
                    <a
                        href={IOS_APP_URL}
                        className="inline-block rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
                    >
                        App Store'dan yuklab olish
                    </a>
                </div>
            )}

            {platform === "unknown" && (
                <div className="space-y-4">
                    <p className="text-gray-600">Platformangizni tanlang:</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                            href={IOS_APP_URL}
                            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                        >
                            iOS uchun yuklab olish
                        </a>
                        <a
                            href={androidUrl}
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
