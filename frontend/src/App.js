import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Bell, Hand, Sparkles, Shield, Globe, Zap, Heart, Mail, ExternalLink, ArrowRight, Play, Volume2, Languages } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import "@/App.css";

/* ───────────────────────────── NAVIGATION ───────────────────────────── */
const Navigation = () => (
  <nav className="glass-nav fixed top-0 left-0 right-0 z-50" data-testid="navigation">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#hero" className="flex items-center gap-2" data-testid="nav-logo">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
          EaseTalk
        </span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#apps" className="text-sm text-slate-500 hover:text-slate-900 transition-colors" data-testid="nav-apps">Apps</a>
        <a href="#why" className="text-sm text-slate-500 hover:text-slate-900 transition-colors" data-testid="nav-why">Why EaseTalk</a>
        <a href="#innovation" className="text-sm text-slate-500 hover:text-slate-900 transition-colors" data-testid="nav-innovation">Innovation</a>
        <a href="#contact" className="text-sm text-slate-500 hover:text-slate-900 transition-colors" data-testid="nav-contact">Contact</a>
      </div>
      <a
        href="#hero"
        className="bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-slate-800 active:scale-95 transition-all"
        data-testid="nav-cta"
      >
        Get Early Access
      </a>
    </div>
  </nav>
);

/* ───────────────────────────── PHONE MOCKUP ───────────────────────────── */
const PhoneMockup = () => (
  <motion.div
    className="phone-mockup animate-float"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    data-testid="phone-mockup"
  >
    <div className="phone-notch" />
    <div className="phone-screen">
      {/* Status bar */}
      <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 mb-2">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-2 border border-slate-400 rounded-sm">
            <div className="w-2 h-1 bg-green-400 rounded-sm m-px" />
          </div>
        </div>
      </div>
      {/* App header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-white" strokeWidth={2} />
        </div>
        <span className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>EaseTalk</span>
      </div>
      {/* Chat bubbles */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="self-end bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-2 rounded-2xl rounded-br-md max-w-[80%]">
          Hello, how are you?
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-blue-400">
          <Volume2 className="w-3 h-3" />
          <span>Live Caption Active</span>
        </div>
        <div className="self-start bg-slate-700/60 text-slate-200 text-xs px-3 py-2 rounded-2xl rounded-bl-md max-w-[80%]">
          I'm doing great, thank you!
        </div>
        <div className="self-end bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-2 rounded-2xl rounded-br-md max-w-[80%]">
          Can you translate to Hindi?
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-purple-400">
          <Languages className="w-3 h-3" />
          <span>Translating...</span>
        </div>
        <div className="self-start bg-slate-700/60 text-slate-200 text-xs px-3 py-2 rounded-2xl rounded-bl-md max-w-[80%]">
          Main bahut accha hoon, dhanyavaad!
        </div>
      </div>
      {/* Bottom bar */}
      <div className="flex items-center gap-2 mt-auto pt-3">
        <div className="flex-1 h-9 bg-slate-700/40 rounded-full px-3 flex items-center">
          <span className="text-[10px] text-slate-500">Type or speak...</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="white" />
        </div>
      </div>
    </div>
  </motion.div>
);

/* ───────────────────────────── HERO SECTION ───────────────────────────── */
const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" data-testid="hero-section">
    {/* Gradient blobs */}
    <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
    <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />

    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-medium px-4 py-2 rounded-full mb-8" data-testid="hero-badge">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              Google Play Coming Soon
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.08] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="hero-headline"
          >
            AI Communication for a{" "}
            <span className="gradient-text">More Inclusive</span>{" "}
            World
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="hero-subheadline"
          >
            Empowering deaf, mute, and hearing-impaired users with smart communication, awareness, and learning tools.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#apps"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium px-8 py-3.5 rounded-full hover:bg-slate-800 active:scale-95 transition-all text-sm"
              data-testid="hero-cta-primary"
            >
              <Play className="w-4 h-4" />
              Google Play Coming Soon
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-medium px-8 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all text-sm"
              data-testid="hero-cta-secondary"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right: Phone Mockup */}
        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────────── SMART APPS SECTION ───────────────────────────── */
const smartApps = [
  {
    icon: MessageSquare,
    title: "EaseTalk",
    description: "AI-powered communication platform for deaf & mute users with Speech-to-Text, Text-to-Speech, Live Captions, and multilingual conversations.",
    gradient: "from-blue-500 to-blue-600",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: Bell,
    title: "EaseTalk Alert",
    description: "Smart sound awareness app that detects doorbells, baby cries, alarms, horns, and important sounds through vibration alerts.",
    gradient: "from-purple-500 to-purple-600",
    bgGlow: "bg-purple-500/10",
  },
  {
    icon: Hand,
    title: "EaseTalk Learn",
    description: "Sign language learning and conversion tool that transforms sign gestures into readable text for easier communication.",
    gradient: "from-indigo-500 to-indigo-600",
    bgGlow: "bg-indigo-500/10",
  },
];

const SmartAppsSection = () => (
  <section id="apps" className="relative py-24 md:py-32" data-testid="apps-section">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">Our Products</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900" style={{ fontFamily: 'var(--font-heading)' }} data-testid="apps-heading">
            Our 3 Smart Apps
          </h2>
          <p className="text-base text-slate-500 mt-4 max-w-lg mx-auto">
            A complete ecosystem designed to make everyday communication accessible for everyone.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {smartApps.map((app, i) => (
          <ScrollReveal key={app.title} delay={i * 0.1}>
            <div
              className="card-hover bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
              data-testid={`app-card-${app.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${app.bgGlow} flex items-center justify-center mb-6`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center`}>
                  <app.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {app.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{app.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────────── WHY EASETALK SECTION ───────────────────────────── */
const features = [
  {
    icon: Heart,
    title: "Real Accessibility Impact",
    description: "Built from the ground up to remove communication barriers for the deaf and hearing-impaired community.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Sparkles,
    title: "AI Powered Assistance",
    description: "Leveraging cutting-edge artificial intelligence for real-time translation, captioning, and sound detection.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Globe,
    title: "Made for India",
    description: "Full support for English, Hindi, and Kannada — connecting communities across languages.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Safe, Fast & Easy to Use",
    description: "Privacy-first design with intuitive interfaces that anyone can use confidently from day one.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const WhySection = () => (
  <section id="why" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50/80 to-white" data-testid="why-section">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-purple-600 tracking-wide uppercase mb-3">Our Promise</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900" style={{ fontFamily: 'var(--font-heading)' }} data-testid="why-heading">
            Why EaseTalk
          </h2>
          <p className="text-base text-slate-500 mt-4 max-w-lg mx-auto">
            Technology that truly serves those who need it most.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => (
          <ScrollReveal key={feat.title} delay={i * 0.08}>
            <div
              className="card-hover bg-white rounded-3xl p-7 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
              data-testid={`feature-card-${i}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-5`}>
                <feat.icon className={`w-5 h-5 ${feat.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {feat.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Human element image */}
      <ScrollReveal delay={0.2}>
        <div className="mt-16 rounded-3xl overflow-hidden relative h-64 md:h-80">
          <img
            src="https://images.pexels.com/photos/10029382/pexels-photo-10029382.jpeg"
            alt="Woman using sign language, smiling - representing accessibility and inclusion"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white text-lg md:text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              Communication is a fundamental right
            </p>
            <p className="text-white/70 text-sm mt-1">We're making it accessible for everyone.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ───────────────────────────── INNOVATION SECTION ───────────────────────────── */
const InnovationSection = () => (
  <section id="innovation" className="relative py-24 md:py-32 bg-slate-900 overflow-hidden" data-testid="innovation-section">
    {/* Glowing edges */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          Emerging Innovation
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }} data-testid="innovation-heading">
          Powered by{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Emergent Agent AI
          </span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed" data-testid="innovation-subtext">
          Next-generation intelligent assistance technology built for accessibility. Our AI engine understands context, adapts to user needs, and delivers real-time communication support.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto">
          {[
            { value: "50ms", label: "Latency" },
            { value: "3+", label: "Languages" },
            { value: "99.2%", label: "Accuracy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase()}`}>
              <p className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ───────────────────────────── CONTACT SECTION ───────────────────────────── */
const ContactSection = () => (
  <section id="contact" className="relative py-24 md:py-32" data-testid="contact-section">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900" style={{ fontFamily: 'var(--font-heading)' }} data-testid="contact-heading">
            Contact Us
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" data-testid="contact-card">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>

            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-400 mb-0.5">Email</p>
                  <a href="mailto:rajeshkkhare@gmail.com" className="text-sm text-slate-700 font-medium hover:text-blue-600 transition-colors" data-testid="contact-email">
                    rajeshkkhare@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-400 mb-0.5">Website</p>
                  <a href="https://easetalk.in" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700 font-medium hover:text-blue-600 transition-colors" data-testid="contact-website">
                    easetalk.in
                  </a>
                </div>
              </div>
            </div>

            <a
              href="mailto:rajeshkkhare@gmail.com"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-full hover:bg-slate-800 active:scale-95 transition-all text-sm"
              data-testid="contact-cta"
            >
              <Mail className="w-4 h-4" />
              Send us an Email
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ───────────────────────────── COMING SOON BANNER ───────────────────────────── */
const ComingSoonBanner = () => (
  <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50" data-testid="coming-soon-section">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }} data-testid="coming-soon-heading">
              Google Play Coming Soon
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto mb-6">
              Be among the first to experience the future of accessible communication.
            </p>
            <a
              href="mailto:rajeshkkhare@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-medium px-8 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all text-sm"
              data-testid="coming-soon-cta"
            >
              Notify Me
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ───────────────────────────── FOOTER ───────────────────────────── */
const Footer = () => (
  <footer className="py-16 md:py-20 border-t border-slate-100" data-testid="footer">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
            EaseTalk
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#privacy" className="text-sm text-slate-400 hover:text-slate-600 transition-colors" data-testid="footer-privacy">
            Privacy Policy
          </a>
          <a href="#terms" className="text-sm text-slate-400 hover:text-slate-600 transition-colors" data-testid="footer-terms">
            Terms of Service
          </a>
          <a href="#support" className="text-sm text-slate-400 hover:text-slate-600 transition-colors" data-testid="footer-support">
            Support
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400" data-testid="footer-copyright">
          &copy; 2026 EaseTalk. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

/* ───────────────────────────── MAIN APP ───────────────────────────── */
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <SmartAppsSection />
        <WhySection />
        <InnovationSection />
        <ContactSection />
        <ComingSoonBanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
