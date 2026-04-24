import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Bell,
  Hand,
  Sparkles,
  Shield,
  Globe,
  Zap,
  Heart,
  Mail,
  ExternalLink,
  ArrowRight,
  Play,
  Volume2,
  Languages,
  Menu,
  X,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import "@/App.css";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#apps", label: "Apps" },
    { href: "#why", label: "Why EaseTalk" },
    { href: "#innovation", label: "Innovation" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50" data-testid="navigation">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2" data-testid="nav-logo">
          <img src="/easetalk-logo.png" alt="EaseTalk Logo" className="h-16 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-slate-800 active:scale-95 transition-all"
          >
            Get Early Access
          </a>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-600 hover:text-slate-900 py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-full text-center hover:bg-slate-800 active:scale-95 transition-all mt-1"
              >
                Get Early Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PhoneMockup = () => (
  <motion.div
    className="phone-mockup animate-float"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <div className="phone-notch" />
    <div className="phone-screen">
      <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 mb-2">
        <span>9:41</span>
        <div className="w-3 h-2 border border-slate-400 rounded-sm">
          <div className="w-2 h-1 bg-green-400 rounded-sm m-px" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-white text-sm font-semibold">EaseTalk</span>
      </div>

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

const HeroSection = () => (
  <section
    id="hero"
    className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
  >
    <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start mb-8"
          >
            <img
              src="/easetalk-logo.png"
              alt="EaseTalk Logo"
              className="h-44 sm:h-52 w-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-medium px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              Google Play Coming Soon
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.08] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI Communication for a{" "}
            <span className="gradient-text">More Inclusive</span> World
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering deaf, mute, and hearing-impaired users with smart
            communication, awareness, and learning tools.
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
            >
              <Play className="w-4 h-4" />
              Google Play Coming Soon
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-medium px-8 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all text-sm"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </div>
    </div>
  </section>
);

const smartApps = [
  {
    icon: MessageSquare,
    title: "EaseTalk",
    description:
      "AI-powered communication platform for deaf & mute users with Speech-to-Text, Text-to-Speech, Live Captions, and multilingual conversations.",
    gradient: "from-blue-500 to-blue-600",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: Bell,
    title: "EaseTalk Alert",
    description:
      "Smart sound awareness app that detects doorbells, baby cries, alarms, horns, and important sounds through vibration alerts.",
    gradient: "from-purple-500 to-purple-600",
    bgGlow: "bg-purple-500/10",
  },
  {
    icon: Hand,
    title: "EaseTalk Learn",
    description:
      "Sign language learning and conversion tool that transforms sign gestures into readable text for easier communication.",
    gradient: "from-indigo-500 to-indigo-600",
    bgGlow: "bg-indigo-500/10",
  },
];

const SmartAppsSection = () => (
  <section id="apps" className="relative py-24 md:py-32">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
            Our Products
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900">
            Our 3 Smart Apps
          </h2>
          <p className="text-base text-slate-500 mt-4 max-w-lg mx-auto">
            A complete ecosystem designed to make everyday communication accessible
            for everyone.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {smartApps.map((app, index) => (
          <ScrollReveal key={app.title} delay={index * 0.1}>
            <div className="card-hover bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
              <div
                className={`w-14 h-14 rounded-2xl ${app.bgGlow} flex items-center justify-center mb-6`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center`}
                >
                  <app.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {app.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {app.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: Heart,
    title: "Real Accessibility Impact",
    description:
      "Built to remove communication barriers for deaf, mute, and hearing-impaired users.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Sparkles,
    title: "AI Powered Assistance",
    description:
      "Real-time translation, captioning, reply assistance, and sound awareness through AI.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Globe,
    title: "Made for India",
    description:
      "Designed for English, Hindi, Kannada, and real-world Indian communication needs.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Safe, Fast & Easy",
    description:
      "Simple interface, practical features, and privacy-focused user experience.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const WhySection = () => (
  <section id="why" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50/80 to-white">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-purple-600 tracking-wide uppercase mb-3">
            Our Promise
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900">
            Why EaseTalk
          </h2>
          <p className="text-base text-slate-500 mt-4 max-w-lg mx-auto">
            Technology that truly serves those who need it most.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 0.08}>
            <div className="card-hover bg-white rounded-3xl p-7 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
              <div
                className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-5`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const InnovationSection = () => (
  <section id="innovation" className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          Emerging Innovation
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6">
          Powered by{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            EmergetAgent AI
          </span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Next-generation intelligent assistance technology built for
          accessibility, real-time communication, and daily independence.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="relative py-24 md:py-32">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900">
            Contact Us
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>

            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-400 mb-0.5">Email</p>
                  <a
                    href="mailto:rbinnovationllp@gmail.com"
                    className="text-sm text-slate-700 font-medium hover:text-blue-600 transition-colors"
                  >
                    rbinnovationllp@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-400 mb-0.5">Website</p>
                  <a
                    href="https://easetalk.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-700 font-medium hover:text-blue-600 transition-colors"
                  >
                    easetalk.in
                  </a>
                </div>
              </div>
            </div>

            <a
              href="mailto:rbinnovationllp@gmail.com"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-full hover:bg-slate-800 active:scale-95 transition-all text-sm"
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

const ComingSoonBanner = () => (
  <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Google Play Coming Soon
          </h2>

          <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto mb-6">
            Be among the first to experience the future of accessible communication.
          </p>

          <a
            href="mailto:rbinnovationllp@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-medium px-8 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all text-sm"
          >
            Notify Me
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-16 md:py-20 border-t border-slate-100">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col items-center text-center gap-8">
        <img src="/easetalk-logo.png" alt="EaseTalk Logo" className="h-24 w-auto" />

        <div className="flex flex-wrap justify-center gap-6">
          <a href="#privacy" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Terms of Service
          </a>
          <a href="#support" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Support
          </a>
        </div>

        <p className="text-xs text-slate-400">
          © 2026 EaseTalk. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

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
