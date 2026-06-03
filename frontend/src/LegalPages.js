import React from "react";
import {
  ArrowLeft,
  FileText,
  LifeBuoy,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react";

const UPDATED = "June 2026";

const legalNote =
  "Official legal version: English. Hindi and Kannada translations may be provided for user convenience. In case of any conflict or interpretation difference, the English version shall prevail.";

const companyContact = [
  "Rashi Bhartiya Innovation LLP",
  "Bengaluru, Karnataka, India",
  "Email: rbinnovationllp@gmail.com",
  "Website: easetalk.in",
];

const PAGE_CONTENT = {
  "/privacy": {
    icon: Lock,
    title: "Privacy Policy",
    intro:
      "EaseTalk is developed and operated by Rashi Bhartiya Innovation LLP. We respect user privacy and use information only to provide assistive communication, safety, support, billing, trial and reporting services.",
    sections: [
      {
        title: "Information We May Collect",
        body: [
          "We may collect profile information such as name, nickname or name-alert words, age, gender, mobile number, language preference, emergency contact details, medical profile details, blood group, address and other details entered by the user.",
          "We may collect technical and service information such as device ID, app version, subscription status, trial eligibility, purchase entitlement status, support requests, app access state and basic usage information needed for service operation.",
          "Website visitor counting is designed to count public website visits and is not intended to store visitor name or phone number.",
        ],
      },
      {
        title: "Microphone And Audio Processing",
        body: [
          "EaseTalk may use microphone access for name detection, sound alerts, live captions, speech-to-text, voice input and assistive communication features.",
          "Audio may be processed on the device or through authorised service providers only for delivering the requested app functionality. EaseTalk does not intend to permanently store raw microphone audio as a normal user profile record.",
          "Speech-to-text output, typed text, AI suggestions or conversation text may be shown inside the app so the user can communicate and understand nearby speech.",
        ],
      },
      {
        title: "AI And Assistive Features",
        body: [
          "EaseTalk may use AI services to support speech-to-text, text-to-speech, reply suggestions, translation, sentence suggestions and accessibility assistance.",
          "AI-generated suggestions are assistive only. Users should review messages before using them, especially for health, emergency, legal, financial or sensitive situations.",
        ],
      },
      {
        title: "Subscriptions, Trials And Access Reporting",
        body: [
          "Google Play and RevenueCat may process purchase, trial, subscription and entitlement information. Supabase may store profile, trial, subscription and access status so the app can show correct access, prevent trial abuse and support admin reporting.",
          "Trial eligibility may be checked using profile details, phone number, device ID, subscription history and related access records. Duplicate trial misuse or false details may lead to trial blocking or access restriction.",
        ],
      },
      {
        title: "Third-Party Services",
        body: [
          "EaseTalk may use Google Play Services, RevenueCat, Supabase, OpenAI services, analytics providers, hosting providers and other authorised technical service providers for app operation, billing, AI features, support, security and reporting.",
          "These providers may process limited data as needed to provide their services. Their own policies may also apply where their platform is used.",
        ],
      },
      {
        title: "Data Security And Retention",
        body: [
          "We use reasonable technical and organisational safeguards to protect user information. No digital system can be guaranteed to be completely secure.",
          "We retain information for as long as needed for app operation, support, legal compliance, billing records, fraud prevention, audit logs and legitimate business needs.",
        ],
      },
      {
        title: "User Rights",
        body: [
          "Users may update profile information from the app where the relevant screen is available.",
          "Users may request deletion of account-related data through the Account Deletion page or by contacting support.",
          "Some billing, purchase, fraud-prevention, legal, audit or tax records may need to be retained where required by law, Google Play, RevenueCat or business compliance requirements.",
        ],
      },
      {
        title: "Contact",
        body: companyContact,
      },
    ],
  },
  "/terms": {
    icon: FileText,
    title: "Terms & Conditions",
    intro:
      "These Terms govern use of the EaseTalk website, mobile app, assistive communication features, trials, subscriptions, support services and admin-related services.",
    sections: [
      {
        title: "Acceptance",
        body: [
          "By installing, opening, registering, subscribing to or using EaseTalk, you agree to these Terms and the related Privacy Policy, Refund Policy, Support Policy and Rules & Regulations.",
          "If you do not agree, please do not use the app or website.",
        ],
      },
      {
        title: "Service Purpose",
        body: [
          "EaseTalk is designed to assist users through communication support, speech-to-text, text-to-speech, live captions, name alerts, sound awareness, medical profile support, emergency information display and related accessibility features.",
          "EaseTalk is an assistive application. It is not a medical device, not a guaranteed emergency response system and not a replacement for caregivers, doctors, emergency numbers or professional advice.",
        ],
      },
      {
        title: "User Responsibilities",
        body: [
          "Users must provide accurate information, keep device permissions enabled where needed, maintain internet connectivity when required and use the app lawfully.",
          "Users are responsible for checking messages, AI suggestions, translated content and speech output before relying on them or sharing them with others.",
          "Users should keep normal safety arrangements active and should not rely only on EaseTalk for emergency alerts, medical decisions or life-safety communication.",
        ],
      },
      {
        title: "Microphone, Captions And AI Output",
        body: [
          "Features such as speech-to-text, live captions, name detection and sound alerts may depend on microphone quality, background noise, phone model, permissions, internet connectivity and third-party services.",
          "EaseTalk does not guarantee that every spoken word, name, alert sound or AI suggestion will be detected perfectly or instantly.",
          "AI-generated content may be inaccurate or incomplete. It is provided as assistance, not as a final decision or professional advice.",
        ],
      },
      {
        title: "Trial And Subscription",
        body: [
          "Paid subscriptions are billed and managed through Google Play or other authorised app-store/payment systems shown to the user.",
          "Subscriptions may automatically renew unless cancelled through the relevant app store before renewal. Users should review the price, trial duration and renewal date shown by the store before confirming.",
          "Trial access may be limited to eligible users, devices, phone numbers or profiles. Trial abuse, duplicate accounts or false information may result in blocked trial access or restricted services.",
        ],
      },
      {
        title: "Limitation Of Liability",
        body: [
          "To the maximum extent permitted by law, Rashi Bhartiya Innovation LLP shall not be liable for indirect, incidental, special, consequential or punitive damages arising from app or website use.",
          "EaseTalk services are provided with reasonable care, but availability, accuracy, uninterrupted operation, emergency effectiveness and third-party service performance cannot be guaranteed.",
        ],
      },
      {
        title: "Changes To Service Or Terms",
        body: [
          "We may update app features, website content, pricing, support process, trial rules and these Terms from time to time.",
          "Continued use after changes means the user accepts the updated Terms.",
        ],
      },
      {
        title: "Contact",
        body: companyContact,
      },
    ],
  },
  "/refund": {
    icon: RefreshCcw,
    title: "Refund Policy",
    intro:
      "EaseTalk subscriptions are processed through Google Play or other authorised app-store/payment systems. Refunds are generally governed by the policy of the store or payment platform used for purchase.",
    sections: [
      {
        title: "Free Trial",
        body: [
          "If a free trial is offered, users are not charged during the trial period unless the app store terms shown during purchase state otherwise.",
          "To avoid billing after the free trial, cancel the subscription from Google Play subscriptions before the trial ends.",
        ],
      },
      {
        title: "Subscription Charges",
        body: [
          "Paid subscriptions may renew automatically unless cancelled through the relevant app store.",
          "EaseTalk cannot directly cancel a Google Play subscription on behalf of a user. The user must manage cancellation from the Google Play account used for purchase.",
        ],
      },
      {
        title: "Refund Requests",
        body: [
          "Refund requests after subscription activation may be subject to Google Play or the relevant platform rules.",
          "EaseTalk does not guarantee refunds once services have been accessed, but support can help users understand purchase status, restore access or prepare information needed for a platform refund request.",
        ],
      },
      {
        title: "Contact",
        body: ["For refund-related assistance, email rbinnovationllp@gmail.com."],
      },
    ],
  },
  "/support": {
    icon: LifeBuoy,
    title: "Support Policy",
    intro:
      "EaseTalk Support helps users with setup, permissions, profile management, live captions, speech-to-text, text-to-speech, name detection, subscription access and troubleshooting.",
    sections: [
      {
        title: "Support Scope",
        body: [
          "Support may assist with installation issues, app permissions, profile details, language selection, sound/name alert setup, medical profile, subscription access, restore purchase, billing guidance and general technical troubleshooting.",
          "Support cannot guarantee a fix for every phone model, network condition, operating-system restriction, third-party service issue or app-store billing decision.",
        ],
      },
      {
        title: "Before Contacting Support",
        body: [
          "Please check microphone, notification, display-over-other-apps, lock-screen alert, battery/background, internet and language settings.",
          "For subscription problems, confirm the same Google Play account is active on the phone and try Restore Purchases if available.",
        ],
      },
      {
        title: "Response Time",
        body: [
          "Our target response time is within 48 business hours. Response time may vary during holidays, high support volume or complex technical investigations.",
        ],
      },
      {
        title: "Contact",
        body: ["Support email: rbinnovationllp@gmail.com"],
      },
    ],
  },
  "/rules": {
    icon: ShieldCheck,
    title: "Community Rules & Regulations",
    intro:
      "These rules are intended to keep EaseTalk safe, fair and useful for assistive communication users, families, caregivers, testers and support teams.",
    sections: [
      {
        title: "User Rules",
        body: [
          "Users shall not reverse engineer, tamper with, abuse, overload, copy, resell or interfere with the EaseTalk app, website, subscription system or admin/reporting system.",
          "Users shall not use EaseTalk for unlawful purposes, harassment, impersonation, fraud, false emergency reporting, unauthorised monitoring or misuse of another person's data.",
          "Users shall not share subscription access, hidden owner/admin codes, trial access or account access with unauthorised persons.",
        ],
      },
      {
        title: "Safety And Consent",
        body: [
          "Use listener, name detection, sound alert and assistive communication features responsibly and with appropriate consent where required.",
          "Do not rely only on EaseTalk for emergency response. Keep caregivers, emergency contacts and normal emergency services active.",
        ],
      },
      {
        title: "Trial And Subscription Rules",
        body: [
          "One free trial may be allowed per eligible user, phone number, profile and device, depending on current business rules.",
          "Duplicate trial misuse, false profile details, repeated reinstall attempts or suspicious access patterns may lead to blocked trial access, suspension or permanent restriction.",
        ],
      },
      {
        title: "Violations",
        body: [
          "Violation may result in warning, account suspension, subscription termination, trial blocking, permanent access restriction or legal action where appropriate.",
        ],
      },
    ],
  },
  "/delete-account": {
    icon: Trash2,
    title: "Account Deletion",
    intro:
      "Users can request deletion of account-related EaseTalk data. This page is provided for Google Play account deletion compliance and user privacy rights.",
    sections: [
      {
        title: "How To Request Deletion",
        body: [
          "Send an email to rbinnovationllp@gmail.com with the subject line: EaseTalk Account Deletion Request.",
          "Include your name, phone number used in the app, device ID if visible in the app, and any other detail that helps us identify your account-related records.",
          "If you are requesting deletion for a dependent, family member or assisted user, please mention your relationship and provide enough information for verification.",
        ],
      },
      {
        title: "What May Be Deleted",
        body: [
          "We may delete or anonymise profile details, nickname/name-alert setup, medical profile details, support records, app access metadata and related account information where deletion is legally and technically permitted.",
          "Subscription purchase history, entitlement records, fraud-prevention logs, audit records, tax/legal records and app-store billing records may need to be retained where required by Google Play, RevenueCat, law or legitimate business compliance needs.",
        ],
      },
      {
        title: "Processing Time",
        body: [
          "We aim to process valid deletion requests within 30 days after verification. Complex requests, incomplete details or legal retention requirements may take longer.",
          "Deleting EaseTalk app data does not automatically cancel a Google Play subscription. Please cancel subscriptions separately from Google Play if needed.",
        ],
      },
      {
        title: "Contact",
        body: companyContact,
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

        <section className="mb-5 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-bold leading-7 text-blue-900">{legalNote}</p>
        </section>

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
