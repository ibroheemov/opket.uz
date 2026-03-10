import { useEffect, useRef } from "react";
import { Component as Navigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import {
  Clock,
  ShieldCheck,
  Wallet,
  Smartphone,
  Download,
  MapPin,
  Car,
  Phone,
  Mail,
  ChevronDown,
  Users,
  Star,
  Zap,
} from "lucide-react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.saabiqoon.tasbeeh";
const APP_STORE = "https://apps.apple.com/us/app/opket-taxi/id6759873649";

const features = [
  { icon: Clock, title: "Tez xizmat", desc: "Eng yaqin haydovchi bir necha daqiqada yetib keladi. Vaqtingizni tejang." },
  { icon: ShieldCheck, title: "Xavfsiz sayohat", desc: "Tasdiqlangan haydovchilar va real vaqtda kuzatuv tizimi." },
  { icon: Wallet, title: "Arzon narxlar", desc: "Raqobatbardosh narxlar va shaffof hisob-kitob. Yashirin to'lovlar yo'q." },
  { icon: Smartphone, title: "Qulay interfeys", desc: "Oddiy va tushunarli ilova dizayni. Bir necha bosish bilan buyurtma bering." },
];

const steps = [
  { num: "01", title: "Ilovani yuklab oling", desc: "App Store yoki Google Play'dan Opket ilovasini o'rnating.", icon: Download },
  { num: "02", title: "Manzilni kiriting", desc: "Qayerga borishingizni yozing va narxni oldindan bilib oling.", icon: MapPin },
  { num: "03", title: "Yo'lga chiqing!", desc: "Haydovchi bir necha daqiqada yetib keladi. Yaxshi safar!", icon: Car },
];

const stats = [
  { value: "50,000+", label: "Foydalanuvchilar", icon: Users },
  { value: "4.8", label: "Reyting", icon: Star },
  { value: "100+", label: "Shaharlar", icon: MapPin },
  { value: "24/7", label: "Xizmat", icon: Zap },
];

export default function Landing() {
  const wrapperRef = useScrollReveal();

  return (
    <div ref={wrapperRef} className="landing-page" style={{ backgroundColor: "#09090B", color: "#FAFAF9" }}>
      <Navigation />

      {/* ─── HERO ──────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-texture">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-3 h-3 rounded-full bg-opket/40 hero-float" />
          <div className="absolute top-[25%] right-[12%] w-2 h-2 rounded-full bg-opket/30 hero-float-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[30%] left-[15%] w-4 h-4 rounded-full bg-opket/20 hero-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[60%] right-[20%] w-2.5 h-2.5 rounded-full bg-opket/25 hero-float-slow" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-[20%] right-[8%] w-3.5 h-3.5 rounded-full bg-opket/15 hero-float" style={{ animationDelay: "3s" }} />

          <div className="cta-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hero-pulse" />

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.06)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-opket/20 bg-opket/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-opket animate-pulse" />
            <span className="text-sm font-medium text-opket tracking-wide">O'zbekistondagi ishonchli taksi xizmati</span>
          </div>

          <h1 className="reveal reveal-delay-1 font-[--font-display] text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.05] tracking-tight mb-6">
            Yo'lingizni{" "}
            <span className="bg-gradient-to-r from-opket to-opket-hover bg-clip-text text-transparent">Opket</span>{" "}
            bilan boshlang
          </h1>

          <p className="reveal reveal-delay-2 text-lg md:text-xl text-opket-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Tez, qulay va arzon taksi xizmati. Ilovani yuklab oling va bir necha soniyada haydovchi chaqiring — istalgan vaqtda, istalgan joyda.
          </p>

          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={APP_STORE} className="store-btn store-btn-yellow" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/></svg>
              App Store
            </a>
            <a href={PLAY_STORE} className="store-btn store-btn-dark" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 12l2.302-3.81v1.318zm-3.199-3.199L5.864 0.976l10.937 6.333-2.302 2.302v-.302z"/></svg>
              Google Play
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="reveal reveal-delay-4 flex flex-col items-center gap-2 text-opket-muted/60">
            <span className="text-xs tracking-widest uppercase">Pastga suring</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────── */}
      <section className="relative border-y border-white/5 bg-opket-surface">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="reveal text-center">
                <s.icon className="w-5 h-5 text-opket mx-auto mb-2" />
                <div className="font-[--font-display] text-3xl md:text-4xl font-bold text-opket-light mb-1">{s.value}</div>
                <div className="text-sm text-opket-muted tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────── */}
      <section id="features" className="relative py-24 md:py-32" style={{ backgroundColor: "#FAFAF9", color: "#09090B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="reveal text-sm font-semibold tracking-widest uppercase text-[#EAB308] mb-3">Afzalliklar</p>
            <h2 className="reveal reveal-delay-1 font-[--font-display] text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight mb-4">
              Nega aynan Opket?
            </h2>
            <p className="reveal reveal-delay-2 text-lg text-[#71717A] max-w-xl mx-auto">
              Minglab foydalanuvchilar Opket'ni tanlashining sabablari
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${i + 1} feature-card`}>
                <div className="feature-icon">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-[--font-display] text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-[#71717A] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────── */}
      <section id="how-it-works" className="relative py-24 md:py-32 bg-opket-dark grid-texture">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="reveal text-sm font-semibold tracking-widest uppercase text-opket mb-3">Bosqichlar</p>
            <h2 className="reveal reveal-delay-1 font-[--font-display] text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight">
              Qanday ishlaydi?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className={`reveal reveal-delay-${i + 1} step-card`}>
                <div className="step-number">{s.num}</div>
                <div className="mb-3">
                  <s.icon className="w-6 h-6 text-opket" />
                </div>
                <h3 className="font-[--font-display] text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-opket-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DRIVERS CTA ───────────────────────── */}
      <section id="drivers" className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#FAFAF9", color: "#09090B" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="reveal inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FACC15]/20 to-[#EAB308]/10 mb-6">
            <Car className="w-8 h-8 text-[#EAB308]" />
          </div>

          <h2 className="reveal reveal-delay-1 font-[--font-display] text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-tight mb-4">
            Haydovchi bo'lmoqchimisiz?
          </h2>
          <p className="reveal reveal-delay-2 text-lg text-[#71717A] max-w-xl mx-auto mb-8 leading-relaxed">
            Opket bilan ishlang — o'z vaqtingizda ishlang va barqaror daromad oling. Ro'yxatdan o'tish bepul va tez.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap items-center justify-center gap-6 mb-10">
            {["Moslashuvchan jadval", "Har hafta to'lov", "Bepul ro'yxatdan o'tish"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FACC15]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
                </div>
                <span className="text-sm font-medium text-[#3F3F46]">{item}</span>
              </div>
            ))}
          </div>

          <a
            href="#download"
            className="reveal reveal-delay-4 inline-flex items-center gap-2 px-8 py-3.5 bg-[#09090B] text-[#FAFAF9] font-semibold rounded-xl hover:bg-[#18181B] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#download")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Haydovchi sifatida ro'yxatdan o'ting
          </a>
        </div>
      </section>

      {/* ─── DOWNLOAD CTA ──────────────────────── */}
      <section id="download" className="relative py-28 md:py-36 bg-opket-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="cta-glow -top-40 -right-40 hero-pulse" />
          <div className="cta-glow -bottom-40 -left-40 hero-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="reveal inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-opket/10 border border-opket/20 mb-8">
            <Download className="w-9 h-9 text-opket" />
          </div>

          <h2 className="reveal reveal-delay-1 font-[--font-display] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-5">
            Hoziroq{" "}
            <span className="bg-gradient-to-r from-opket to-opket-hover bg-clip-text text-transparent">yuklab oling</span>
          </h2>
          <p className="reveal reveal-delay-2 text-lg text-opket-muted max-w-lg mx-auto mb-10 leading-relaxed">
            Opket ilovasini yuklab oling va tez, qulay taksi xizmatidan foydalaning. Birinchi safar bepul!
          </p>

          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={APP_STORE} className="store-btn store-btn-yellow" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/></svg>
              App Store
            </a>
            <a href={PLAY_STORE} className="store-btn store-btn-dark" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 12l2.302-3.81v1.318zm-3.199-3.199L5.864 0.976l10.937 6.333-2.302 2.302v-.302z"/></svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────── */}
      <footer id="contact" className="border-t border-white/5 bg-opket-dark">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-12">
            {/* Brand */}
            <div>
              <a href="#hero" className="inline-block mb-4" onClick={(e) => { e.preventDefault(); document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" }); }}>
                <img src="/logo/logo.jpg" alt="Opket" className="h-10 rounded-lg" />
              </a>
              <p className="text-opket-muted text-sm leading-relaxed max-w-xs">
                Opket — O'zbekistondagi zamonaviy va ishonchli taksi xizmati. Har kuni minglab sayohatlarni amalga oshiramiz.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-opket-light">Sahifalar</h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  ["Biz haqimizda", "#about"],
                  ["Xizmatlar", "#features"],
                  ["Qanday ishlaydi", "#how-it-works"],
                  ["Haydovchilar", "#drivers"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="footer-link"
                    onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-opket-light">Bog'lanish</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:+998901234567" className="footer-link inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +998 90 123 45 67
                </a>
                <a href="mailto:info@opket.uz" className="footer-link inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@opket.uz
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-opket-muted">&copy; 2026 Opket. Barcha huquqlar himoyalangan.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="footer-link text-xs">Maxfiylik siyosati</a>
              <a href="#" className="footer-link text-xs">Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
