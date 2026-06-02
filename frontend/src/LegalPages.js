import React from "react";
import { ArrowLeft, FileText, LifeBuoy, Lock, RefreshCcw, ShieldCheck } from "lucide-react";

const UPDATED = "June 2, 2026";

const PAGE_CONTENT = {
  "/privacy": {
    icon: Lock,
    title: "Privacy Policy",
    intro:
      "EaseTalk is an assistive communication app and website operated by Rashi Bhartiya Innovation LLP. This policy explains how profile, support, billing, subscription and reporting data may be handled.",
    sections: [
      {
        title: "Information We May Use",
        body: [
          "The EaseTalk app may use profile details such as name, age, gender, phone number, guardian details, address, nicknames, medical condition, blood group, device ID, subscription status and trial eligibility information.",
          "Microphone access is used for assistive features such as speech-to-text, live captions and name detection. Audio is processed for the feature and is not intended to be permanently stored by EaseTalk.",
        ],
      },
      {
        title: "Subscriptions And Reporting",
        body: [
          "Google Play and RevenueCat handle purchase and entitlement information. Supabase may store profile, trial, subscription and access status for support, fraud prevention and admin reporting.",
          "Website visitor count records public visit totals only. It is designed not to store visitor name, phone number or IP address.",
        ],
      },
      {
        title: "Contact",
        body: ["For privacy questions, contact rbinnovationllp@gmail.com."],
      },
    ],
  },
  "/terms": {
    icon: FileText,
    title: "Terms & Conditions",
    intro:
      "These terms govern use of EaseTalk website, mobile app, subscriptions, trial and support services.",
    sections: [
      {
        title: "Assistive Use",
        body: [
          "EaseTalk is built to support communication and awareness. It should not be treated as an emergency medical device or guaranteed life-safety system.",
          "Users should keep phone permissions, battery/background settings and internet access properly configured for best results.",
        ],
      },
      {
        title: "Account, Trial And Subscription",
        body: [
          "Users should provide correct profile details. Trial eligibility may be checked using device ID, phone number and profile name.",
          "Subscriptions are billed and managed through Google Play. If a trial is offered, billing and cancellation rules are shown by Google Play before purchase confirmation.",
        ],
      },
      {
        title: "Responsible Use",
        body: [
          "Do not misuse trial access, admin access, support channels or app features. Fraud, duplicate trial misuse or false details may lead to access restriction.",
        ],
      },
    ],
  },
  "/refund": {
    icon: RefreshCcw,
    title: "Refund Policy",
    intro:
      "EaseTalk subscriptions are billed through Google Play. Refund eligibility is generally handled by Google Play according to its policies and applicable local rules.",
    sections: [
      {
        title: "Google Play Billing",
        body: [
          "Users can manage, cancel or review subscriptions from their Google Play account.",
          "If a 7-day free trial is available, Google Play shows the trial, price, renewal date and payment confirmation before the trial starts.",
        ],
      },
      {
        title: "Support For Billing Issues",
        body: [
          "EaseTalk support can help users understand access status, restore purchases and provide information needed for billing support.",
          "To avoid monthly billing after trial, cancel before the trial ends from Google Play subscriptions.",
        ],
      },
    ],
  },
  "/support": {
    icon: LifeBuoy,
    title: "Support Policy",
    intro:
      "EaseTalk support helps with app setup, permissions, profile, name detection, live captions, speech-to-text, text-to-speech, subscription access and troubleshooting.",
    sections: [
      {
        title: "Before Contacting Support",
        body: [
          "Check microphone, notification, display over other apps, lock-screen alert and battery/background permissions.",
          "For subscription issues, use Restore Purchases and confirm the same Google Play account is active on the device.",
        ],
      },
      {
        title: "Contact",
        body: ["Email support: rbinnovationllp@gmail.com"],
      },
    ],
  },
  "/rules": {
    icon: ShieldCheck,
    title: "Rules & Regulations",
    intro:
      "These rules are intended to keep EaseTalk safe, fair and useful for assistive communication users.",
    sections: [
      {
        title: "Safety And Consent",
        body: [
          "Use listener/name detection only with proper consent and awareness of nearby people where required.",
          "Do not rely only on EaseTalk for emergency response; keep normal emergency and caregiver arrangements active.",
        ],
      },
      {
        title: "Trial And Subscription Rules",
        body: [
          "One free trial may be allowed per eligible user profile, phone number and device.",
          "Trial abuse, duplicate accounts or false profile details may block trial access.",
        ],
      },
    ],
  },
};

export const legalRoutes = Object.keys(PAGE_CONTENT);

export default function LegalPage({ path }) {
  const page = PAGE_CONTENT[path] || PAGE_CONTENT["/privacy"];
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back to EaseTalk
          </a>
          <p className="text-sm font-bold text-slate-500">Updated: {UPDATED}</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{page.title}</h1>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">{page.intro}</p>
          </div>
        </div>

        <div className="space-y-5">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-black">{section.title}</h2>
              <div className="space-y-3 text-sm font-semibold leading-7 text-slate-600">
                {section.body.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
