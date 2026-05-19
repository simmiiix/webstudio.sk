/* ============================================================
   Home.tsx — WebStudio SK Main Landing Page
   Design: "Slovenský Digital Craft"
   Sections: Navbar, Hero, Ticker, How It Works, Portfolio,
             Pricing, Testimonials, FAQ, CTA, Footer
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Check,
  Star,
  ArrowRight,
  Globe,
  ShoppingCart,
  Briefcase,
  Zap,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "E-shop Montli",
    category: "E-shop",
    price: "od 1 490 €",
    originalPrice: "2 800 €",
    clients: 47,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663676428392/5XzpqQS2xwzAjG3CdKFB5z/portfolio-ecommerce-Rsb4Nys4nTiHujeB4AoyKE.webp",
    tag: "E-shop",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    id: 2,
    title: "Zlatý Dub Reštaurácia",
    category: "Reštaurácia",
    price: "od 790 €",
    originalPrice: "1 500 €",
    clients: 83,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663676428392/5XzpqQS2xwzAjG3CdKFB5z/portfolio-restaurant-7RDRdx6qHX76xm5ts74nNj.webp",
    tag: "Reštaurácia",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    title: "Experta Solutions",
    category: "Firemný web",
    price: "od 990 €",
    originalPrice: "1 900 €",
    clients: 61,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663676428392/5XzpqQS2xwzAjG3CdKFB5z/portfolio-corporate-a5UATYNZzbBYWSVuCcsbue.webp",
    tag: "Firemný web",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 4,
    title: "Nexora SaaS",
    category: "Landing page",
    price: "od 590 €",
    originalPrice: "1 100 €",
    clients: 129,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663676428392/5XzpqQS2xwzAjG3CdKFB5z/portfolio-landing-RPXnrd6L84iFCB8LEqNp36.webp",
    tag: "Landing page",
    tagColor: "bg-green-100 text-green-700",
  },
];

const TICKER_ITEMS = [
  { label: "E-shop", icon: "🛒", price: "od 1 490 €", clients: 47 },
  { label: "Firemný web", icon: "🏢", price: "od 990 €", clients: 83 },
  { label: "Landing page", icon: "🚀", price: "od 590 €", clients: 129 },
  { label: "Reštaurácia", icon: "🍽️", price: "od 790 €", clients: 61 },
  { label: "Blog / Portfólio", icon: "✍️", price: "od 490 €", clients: 94 },
  { label: "Rezervačný systém", icon: "📅", price: "od 1 190 €", clients: 38 },
  { label: "Realitný web", icon: "🏠", price: "od 1 290 €", clients: 52 },
  { label: "Kozmetický salón", icon: "💅", price: "od 690 €", clients: 71 },
];

const STEPS = [
  {
    number: "01",
    icon: "💬",
    title: "Porozprávame sa",
    desc: "Zavoláme si alebo napíšeme. Zistíme, čo presne potrebujete, aký máte rozpočet a kedy chcete web spustiť.",
    color: "bg-violet-50 border-violet-200",
    numColor: "text-violet-600",
  },
  {
    number: "02",
    icon: "🎨",
    title: "Navrhneme dizajn",
    desc: "Do 5 pracovných dní dostanete návrh dizajnu na schválenie. Upravujeme, kým nie ste 100% spokojní.",
    color: "bg-green-50 border-green-200",
    numColor: "text-green-600",
  },
  {
    number: "03",
    icon: "⚙️",
    title: "Vytvoríme web",
    desc: "Programujeme váš web — rýchly, mobilný, SEO-optimalizovaný. Priebežne vás informujeme o postupe.",
    color: "bg-blue-50 border-blue-200",
    numColor: "text-blue-600",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Spustíme online",
    desc: "Web otestujeme, nasadíme na server a odovzdáme vám prístupy. Prvý mesiac podpory zadarmo.",
    color: "bg-amber-50 border-amber-200",
    numColor: "text-amber-600",
  },
];

const PRICING = [
  {
    name: "Štart",
    price: "400",
    period: "jednorazovo",
    desc: "Jednoduchý, funkčný web. Perfektný začiatok pre malé firmy.",
    features: [
      "Až 5 podstránok",
      "Responzívny dizajn",
      "Kontaktný formulár",
      "Základné SEO",
      "SSL certifikát",
      "1 mesiac podpory",
    ],
    cta: "Vybrať Štart",
    highlight: false,
    badge: null,
  },
  {
    name: "Konverzný",
    price: "800",
    period: "jednorazovo",
    desc: "Optimalizovaný na predaj s AI chatbotom. Viac zákazníkov, lepšie výsledky.",
    features: [
      "Až 15 podstránok",
      "Vlastný dizajn na mieru",
      "AI chatbot 24/7",
      "Pokročilé SEO",
      "Google Analytics",
      "Rýchlosť Core Web Vitals",
      "3 mesiace podpory",
    ],
    cta: "Vybrať Konverzný",
    highlight: true,
    badge: "Najpopulárnejší",
  },
  {
    name: "Premium",
    price: "1 200",
    period: "jednorazovo",
    desc: "Kompletné riešenie s e-shopom, chatbotom a pokročilými funkciami.",
    features: [
      "Neobmedzené podstránky",
      "E-shop s platobnou bránou",
      "AI chatbot 24/7",
      "Správa objednávok",
      "Pokročilé SEO + marketing",
      "Google Analytics",
      "6 mesiacov podpory",
    ],
    cta: "Vybrať Premium",
    highlight: false,
    badge: null,
  },
];

const TESTIMONIALS = [
  {
    name: "Martina K.",
    handle: "@martina_kosmetika",
    role: "Majiteľka kozmetického salóna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    text: "Web dostali sme za 2 týždne a zákazníci si ho pochvaľujú. Rezervácie cez web vzrástli o 60%. Odporúčam každému!",
    stars: 5,
    location: "Bratislava",
  },
  {
    name: "Tomáš N.",
    handle: "@tomas_tesarstvo",
    role: "Tesár, SZČO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    text: "Konečne mám web, na ktorý sa nemusím hanbiť. Cena bola férová a komunikácia výborná. Dostal som presne to, čo som chcel.",
    stars: 5,
    location: "Žilina",
  },
  {
    name: "Jana P.",
    handle: "@jana_catering",
    role: "Majiteľka cateringovej firmy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    text: "Profesionálny prístup od začiatku do konca. Web je krásny, rýchly a Google nás konečne nachádza. Ďakujem!",
    stars: 5,
    location: "Košice",
  },
  {
    name: "Peter M.",
    handle: "@peter_reality",
    role: "Realitný maklér",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "Mal som web od inej firmy, ktorý bol pomalý a zastaraný. WebStudio ho kompletne predrobilo — teraz je top!",
    stars: 5,
    location: "Nitra",
  },
  {
    name: "Lucia B.",
    handle: "@lucia_fitnes",
    role: "Fitness trénerka",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    text: "Môj web je presne taký, ako som si predstavovala. Klienti si cez neho kupujú tréningové plány a ja zarábam aj keď spím.",
    stars: 5,
    location: "Trenčín",
  },
  {
    name: "Marek H.",
    handle: "@marek_gastro",
    role: "Reštauratér",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    text: "Spustili sme web pred Vianocami a obsadenosť reštaurácie vzrástla o 40%. Investícia, ktorá sa vrátila za mesiac.",
    stars: 5,
    location: "Banská Bystrica",
  },
];

const FAQ_ITEMS = [
  {
    q: "Ako dlho trvá vytvorenie webu?",
    a: "Závisí od rozsahu projektu. Jednoduchý web (Štart balík) zvyčajne hotový za 5–10 pracovných dní. Biznis web za 2–3 týždne. E-shop za 3–5 týždňov. Vždy vám dáme presný harmonogram pred začatím.",
  },
  {
    q: "Čo ak nebudem spokojný s dizajnom?",
    a: "Pred programovaním vám ukážeme návrh dizajnu. Máte 3 kola revízií zadarmo — upravujeme, kým nie ste 100% spokojní. Až potom začneme kódovať.",
  },
  {
    q: "Budem môcť web sám upravovať?",
    a: "Áno! Každý web odovzdávame s redakčným systémom (CMS), kde môžete jednoducho meniť texty, fotky a iný obsah bez znalosti programovania.",
  },
  {
    q: "Čo je zahrnuté v cene?",
    a: "V cene je dizajn, programovanie, nasadenie na server, SSL certifikát, základné SEO nastavenie a podpora podľa balíka. Doména a hosting sú extra (cca 20–50 €/rok).",
  },
  {
    q: "Robíte aj úpravy existujúcich webov?",
    a: "Áno, radi pomôžeme aj s redesignom alebo úpravou existujúceho webu. Kontaktujte nás a dohodneme sa na podrobnostiach.",
  },
  {
    q: "Aké sú platobné podmienky?",
    a: "Platba je rozdelená na dve časti: 50% záloha pred začatím prác a 50% po odovzdaní hotového webu. Prijímame bankový prevod aj platbu kartou.",
  },
];

// ─── Utility hook for scroll reveal ─────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

// ─── Components ──────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Ako to funguje", href: "#ako-to-funguje" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Cenník", href: "#cennik" },
    { label: "Referencie", href: "#referencie" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-display font-800 text-xl text-[oklch(0.18_0.025_260)]">
          <div className="w-8 h-8 rounded-lg bg-[oklch(0.45_0.22_270)] flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span>WebStudio</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[oklch(0.4_0.015_260)] hover:text-[oklch(0.18_0.025_260)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#kontakt"
            className="text-sm font-medium text-[oklch(0.4_0.015_260)] hover:text-[oklch(0.18_0.025_260)] transition-colors"
          >
            Kontakt
          </a>
          <a
            href="#cennik"
            className="bg-[oklch(0.18_0.025_260)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[oklch(0.25_0.025_260)] transition-all duration-200 active:scale-95"
          >
            Začať projekt
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 pb-4 pt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-[oklch(0.4_0.015_260)] border-b border-stone-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cennik"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center bg-[oklch(0.18_0.025_260)] text-white text-sm font-semibold px-5 py-3 rounded-full"
          >
            Začať projekt
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663676428392/5XzpqQS2xwzAjG3CdKFB5z/hero-bg-ihNHP7RSkNYecE9QDBwjjY.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-[oklch(0.985_0.006_85)]/70" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Social proof badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full px-4 py-2 mb-8 shadow-sm"
          >
            <div className="flex -space-x-1.5">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-[oklch(0.35_0.015_260)]">
              <span className="font-bold text-[oklch(0.18_0.025_260)]">200+</span> spokojných klientov
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-[oklch(0.18_0.025_260)] leading-[1.1] mb-6"
          >
            Web, ktorý{" "}
            <span className="text-[oklch(0.45_0.22_270)]">predáva</span>
            {" "}za vás
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[oklch(0.45_0.015_260)] mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Vytvárame profesionálne webstránky pre slovenské firmy. Rýchlo, moderne a za cenu, ktorá dáva zmysel.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#cennik"
              className="cta-pulse inline-flex items-center justify-center gap-2 bg-[oklch(0.45_0.22_270)] text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-[oklch(0.38_0.22_270)] transition-all duration-200 active:scale-95 shadow-lg shadow-violet-200"
            >
              Pozrieť cenník
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 bg-white text-[oklch(0.18_0.025_260)] font-semibold text-base px-8 py-4 rounded-full border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 active:scale-95"
            >
              Ukážky prác
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-[oklch(0.5_0.015_260)]"
          >
            {[
              { icon: <Shield className="w-4 h-4" />, label: "Záruka spokojnosti" },
              { icon: <Clock className="w-4 h-4" />, label: "Dodanie do 3 týždňov" },
              { icon: <Zap className="w-4 h-4" />, label: "Rýchly web (Core Web Vitals)" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-[oklch(0.52_0.17_145)]">{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[oklch(0.6_0.015_260)]"
      >
        <span className="text-xs font-medium">Scrollovať</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}

function TickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="py-6 bg-[oklch(0.18_0.025_260)] overflow-hidden">
      <div className="flex">
        <div className="ticker-track flex gap-4 whitespace-nowrap">
          {doubled.map((item, i) => (
            <a
              key={i}
              href="#cennik"
              className="flex-shrink-0 flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl px-5 py-3 transition-colors group"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm font-display">{item.price}</span>
                  <span className="text-white/40 text-xs line-through">bežná cena</span>
                </div>
                <div className="text-white/70 text-xs">{item.label} · {item.clients} klientov</div>
              </div>
              <ChevronRight className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="ako-to-funguje" className="py-24 bg-[oklch(0.985_0.006_85)]">
      <div className="container">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[oklch(0.45_0.22_270)] uppercase tracking-widest mb-3"
          >
            Ako to funguje
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.18_0.025_260)] mb-4"
          >
            Od nápadu k hotovému webu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[oklch(0.5_0.015_260)] text-lg max-w-xl mx-auto"
          >
            Jednoduchý proces v 4 krokoch. Bez zbytočnej byrokracie, bez prekvapení.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`relative p-6 rounded-2xl border ${step.color} card-hover`}
            >
              {/* Step number */}
              <div className={`font-display text-5xl font-extrabold ${step.numColor} opacity-20 mb-4 leading-none`}>
                {step.number}
              </div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-display font-bold text-lg text-[oklch(0.18_0.025_260)] mb-2">{step.title}</h3>
              <p className="text-sm text-[oklch(0.5_0.015_260)] leading-relaxed">{step.desc}</p>

              {/* Connector arrow */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-[oklch(0.7_0.015_260)]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold text-[oklch(0.45_0.22_270)] uppercase tracking-widest mb-3"
          >
            Naše práce
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.18_0.025_260)] mb-4"
          >
            Weby, ktoré prinášajú výsledky
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[oklch(0.5_0.015_260)] text-lg max-w-xl mx-auto"
          >
            Každý web je unikátny a navrhnutý presne pre potreby klienta.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm card-hover"
            >
              {/* Price badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="price-badge text-xs">{item.price}</span>
              </div>
              {/* Category badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-[oklch(0.18_0.025_260)] text-lg">{item.title}</h3>
                  <p className="text-sm text-[oklch(0.55_0.015_260)] mt-0.5">{item.clients} klientov objednalo tento typ</p>
                </div>
                <a
                  href="#cennik"
                  className="flex items-center gap-1 text-sm font-semibold text-[oklch(0.45_0.22_270)] hover:text-[oklch(0.35_0.22_270)] transition-colors"
                >
                  Chcem podobný
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="cennik" className="py-24 bg-[oklch(0.985_0.006_85)]">
      <div className="container">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold text-[oklch(0.45_0.22_270)] uppercase tracking-widest mb-3"
          >
            Cenník
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.18_0.025_260)] mb-4"
          >
            Transparentné ceny, žiadne prekvapenia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[oklch(0.5_0.015_260)] text-lg max-w-xl mx-auto"
          >
            Platíte raz, web je váš navždy. Žiadne mesačné poplatky za samotný web.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[oklch(0.18_0.025_260)] text-white shadow-2xl shadow-[oklch(0.18_0.025_260)/0.3] scale-105"
                  : "bg-white border border-stone-100 shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[oklch(0.52_0.17_145)] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display font-bold text-xl mb-2 ${plan.highlight ? "text-white" : "text-[oklch(0.18_0.025_260)]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-white/70" : "text-[oklch(0.55_0.015_260)]"}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-[oklch(0.18_0.025_260)]"}`}>
                    {plan.price} €
                  </span>
                </div>
                <span className={`text-sm ${plan.highlight ? "text-white/60" : "text-[oklch(0.6_0.015_260)]"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlight ? "bg-white/20" : "bg-[oklch(0.52_0.17_145)]/10"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-white" : "text-[oklch(0.52_0.17_145)]"}`} />
                    </div>
                    <span className={plan.highlight ? "text-white/90" : "text-[oklch(0.4_0.015_260)]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#kontakt"
                className={`block text-center font-semibold py-3.5 rounded-full transition-all duration-200 active:scale-95 ${
                  plan.highlight
                    ? "bg-white text-[oklch(0.18_0.025_260)] hover:bg-stone-100"
                    : "bg-[oklch(0.18_0.025_260)] text-white hover:bg-[oklch(0.25_0.025_260)]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-[oklch(0.55_0.015_260)]"
        >
          Potrebujete niečo špeciálne?{" "}
          <a href="#kontakt" className="text-[oklch(0.45_0.22_270)] font-semibold hover:underline">
            Napíšte nám
          </a>{" "}
          a pripravíme individuálnu ponuku.
        </motion.p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="referencie" className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold text-[oklch(0.45_0.22_270)] uppercase tracking-widest mb-3"
          >
            Referencie
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.18_0.025_260)] mb-4"
          >
            Čo hovoria naši klienti
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[oklch(0.5_0.015_260)] text-lg max-w-xl mx-auto"
          >
            Viac ako 200 spokojných klientov po celom Slovensku.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="break-inside-avoid bg-[oklch(0.985_0.006_85)] rounded-2xl p-6 border border-stone-100 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[oklch(0.35_0.015_260)] text-sm leading-relaxed mb-4">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <div className="font-semibold text-sm text-[oklch(0.18_0.025_260)]">{t.name}</div>
                  <div className="text-xs text-[oklch(0.55_0.015_260)]">{t.role} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="faq" className="py-24 bg-[oklch(0.985_0.006_85)]">
      <div className="container max-w-3xl">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold text-[oklch(0.45_0.22_270)] uppercase tracking-widest mb-3"
          >
            Časté otázky
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-[oklch(0.18_0.025_260)] mb-4"
          >
            Máte otázky?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[oklch(0.5_0.015_260)] text-lg"
          >
            Tu sú odpovede na tie najčastejšie.
          </motion.p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-display font-semibold text-[oklch(0.18_0.025_260)] pr-4">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[oklch(0.55_0.015_260)] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-[oklch(0.45_0.015_260)] text-sm leading-relaxed border-t border-stone-50 pt-4">
                  {item.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-24 bg-[oklch(0.18_0.025_260)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-500 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-teal-400 blur-3xl" />
      </div>

      <div className="container relative z-10 text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
        >
          Začnite dnes.{" "}
          <span className="text-[oklch(0.75_0.17_145)]">Web máte do 3 týždňov.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
        >
          Nezáväzná konzultácia zadarmo. Porozprávame sa o vašom projekte a navrhneme najlepšie riešenie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 bg-white text-[oklch(0.18_0.025_260)] font-bold text-base px-8 py-4 rounded-full hover:bg-stone-100 transition-all duration-200 active:scale-95 shadow-xl"
          >
            Nezáväzná konzultácia zadarmo
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/50"
        >
          <span>✓ Bez záväzkov</span>
          <span>✓ Odpoveď do 24 hodín</span>
          <span>✓ Férová cena</span>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isInView } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="kontakt" className="py-24 bg-white">
      <div className="container max-w-5xl">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-[oklch(0.45_0.22_270)] uppercase tracking-widest mb-3">
              Kontakt
            </p>
            <h2 className="font-display text-4xl font-bold text-[oklch(0.18_0.025_260)] mb-6 leading-tight">
              Porozprávajme sa o vašom projekte
            </h2>
            <p className="text-[oklch(0.5_0.015_260)] text-lg mb-10 leading-relaxed">
              Napíšte nám alebo zavolajte. Odpovieme do 24 hodín a dohodneme si bezplatnú konzultáciu.
            </p>

            <div className="space-y-5">
              {[
                { icon: <Phone className="w-5 h-5" />, label: "Telefón", value: "+421 900 123 456" },
                { icon: <Mail className="w-5 h-5" />, label: "E-mail", value: "info@webstudio.sk" },
                { icon: <MapPin className="w-5 h-5" />, label: "Sídlo", value: "Bratislava, Slovensko" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[oklch(0.94_0.02_270)] flex items-center justify-center text-[oklch(0.45_0.22_270)]">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[oklch(0.6_0.015_260)] mb-0.5">{c.label}</div>
                    <div className="font-semibold text-[oklch(0.18_0.025_260)]">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sent ? (
              <div className="bg-[oklch(0.95_0.08_145)] rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display font-bold text-xl text-[oklch(0.18_0.025_260)] mb-2">
                  Správa odoslaná!
                </h3>
                <p className="text-[oklch(0.45_0.015_260)]">
                  Ozveme sa vám do 24 hodín. Tešíme sa na spoluprácu!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[oklch(0.985_0.006_85)] rounded-2xl p-8 border border-stone-100 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.35_0.015_260)] mb-1.5">
                      Meno a priezvisko *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ján Novák"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.22_270)]/30 focus:border-[oklch(0.45_0.22_270)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.35_0.015_260)] mb-1.5">
                      Telefón
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+421 9XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.22_270)]/30 focus:border-[oklch(0.45_0.22_270)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[oklch(0.35_0.015_260)] mb-1.5">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jan@firma.sk"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.22_270)]/30 focus:border-[oklch(0.45_0.22_270)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[oklch(0.35_0.015_260)] mb-1.5">
                    Správa *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Popíšte váš projekt — aký typ webu potrebujete, aký máte rozpočet a termín..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.22_270)]/30 focus:border-[oklch(0.45_0.22_270)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[oklch(0.18_0.025_260)] text-white font-semibold py-4 rounded-xl hover:bg-[oklch(0.25_0.025_260)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Odoslať správu
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-center text-[oklch(0.6_0.015_260)]">
                  Odoslaním súhlasíte so spracovaním osobných údajov.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Služby: ["E-shop", "Firemný web", "Landing page", "Blog / Portfólio", "Redesign webu"],
    Spoločnosť: ["O nás", "Portfólio", "Referencie", "Blog", "Kariéra"],
    Podpora: ["FAQ", "Kontakt", "Podmienky", "Ochrana údajov", "Cookies"],
  };

  return (
    <footer className="bg-[oklch(0.12_0.02_260)] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.45_0.22_270)] flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl">WebStudio</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Vytvárame profesionálne webstránky pre slovenské firmy. Moderné, rýchle a efektívne.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold text-white/70 hover:text-white transition-all"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4 text-white/90">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/50 hover:text-white/90 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>© 2025 WebStudio s.r.o. Všetky práva vyhradené.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Podmienky</a>
            <a href="#" className="hover:text-white/70 transition-colors">Ochrana údajov</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TickerSection />
      <HowItWorksSection />
      <PortfolioSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
