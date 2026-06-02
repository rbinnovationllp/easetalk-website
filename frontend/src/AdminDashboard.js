import React, { useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  UserRound,
  XCircle,
  Gift,
  Ban,
} from "lucide-react";

const runtimeConfig = window.EASETALK_ADMIN_CONFIG || {};
const SUPABASE_URL = String(
  runtimeConfig.supabaseUrl || process.env.REACT_APP_SUPABASE_URL || ""
).trim();
const SUPABASE_ANON_KEY = String(
  runtimeConfig.supabaseAnonKey || process.env.REACT_APP_SUPABASE_ANON_KEY || ""
).trim();

const STAT_CARDS = [
  {
    key: "profiles",
    label: "Profiles",
    statKey: "profiles",
    icon: UserRound,
  },
  {
    key: "activeSubscriptions",
    label: "Active",
    statKey: "activeSubscriptions",
    icon: CheckCircle2,
  },
  {
    key: "graceSubscriptions",
    label: "Grace",
    statKey: "graceSubscriptions",
    icon: Clock3,
  },
  {
    key: "expiredSubscriptions",
    label: "Expired",
    statKey: "expiredSubscriptions",
    icon: XCircle,
  },
  {
    key: "trialRows",
    label: "Trials",
    statKey: "trialRows",
    icon: Gift,
  },
  {
    key: "blockedTrials",
    label: "Blocked",
    statKey: "blockedTrials",
    icon: Ban,
  },
];

function cleanText(value) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return cleanText(value);
  return date.toLocaleString();
}

function normalizeReport(data) {
  return {
    role: data?.role || "admin",
    stats: data?.stats || {},
    details: data?.details || {},
    recentSubscriptions: Array.isArray(data?.recentSubscriptions)
      ? data.recentSubscriptions
      : [],
  };
}

function rowsFor(report, key) {
  const rows = report?.details?.[key];
  return Array.isArray(rows) ? rows : [];
}

function buildCsv(report) {
  const sections = [
    ["profiles", rowsFor(report, "profiles")],
    ["active_subscriptions", rowsFor(report, "activeSubscriptions")],
    ["grace_subscriptions", rowsFor(report, "graceSubscriptions")],
    ["expired_subscriptions", rowsFor(report, "expiredSubscriptions")],
    ["trial_rows", rowsFor(report, "trialRows")],
    ["blocked_trials", rowsFor(report, "blockedTrials")],
    ["recent_subscriptions", report.recentSubscriptions || []],
  ];

  const lines = [];
  sections.forEach(([section, rows]) => {
    lines.push(section);
    if (!rows.length) {
      lines.push("No rows");
      lines.push("");
      return;
    }

    const columns = Array.from(
      rows.reduce((set, row) => {
        Object.keys(row || {}).forEach((key) => set.add(key));
        return set;
      }, new Set())
    );

    lines.push(columns.join(","));
    rows.forEach((row) => {
      lines.push(
        columns
          .map((column) => {
            const value = cleanText(row?.[column]).replace(/"/g, '""');
            return `"${value}"`;
          })
          .join(",")
      );
    });
    lines.push("");
  });

  return lines.join("\n");
}

function downloadCsv(report) {
  const csv = buildCsv(report);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `easetalk-admin-report-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function DetailTable({ rows }) {
  const columns = useMemo(() => {
    const preferred = [
      "display_name",
      "phone",
      "access_state",
      "has_access",
      "latest_purchase_date",
      "latest_expiry_date",
      "grace_ends_at",
      "gender",
      "age",
      "role",
      "device_id",
      "normalized_name",
      "trial_used",
      "blocked_until",
      "updated_at",
    ];

    const present = new Set();
    rows.forEach((row) => {
      Object.keys(row || {}).forEach((key) => present.add(key));
    });

    return [
      ...preferred.filter((key) => present.has(key)),
      ...Array.from(present).filter((key) => !preferred.includes(key)),
    ];
  }, [rows]);

  if (!rows.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-500">
        No details found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap px-4 py-3 font-bold">
                {column.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={`${row?.device_id || row?.user_id || index}`}>
              {columns.map((column) => {
                const value = row?.[column];
                const display = column.includes("date") || column.endsWith("_at")
                  ? formatDate(value)
                  : cleanText(value) || "-";
                return (
                  <td key={column} className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [report, setReport] = useState(null);
  const [selectedKey, setSelectedKey] = useState("profiles");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

  const selectedCard = STAT_CARDS.find((card) => card.key === selectedKey) || STAT_CARDS[0];
  const selectedRows = report ? rowsFor(report, selectedKey) : [];

  async function loadReport(event) {
    event?.preventDefault();
    setError("");

    if (!isConfigured) {
      setError(
        "Website Supabase settings are missing. Add values in public/admin-config.js before uploading to Hostinger."
      );
      return;
    }

    if (phone.replace(/\D/g, "").length < 10 || code.trim().length < 8) {
      setError("Enter owner phone number and hidden admin code.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/easetalk_admin_dashboard_report`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ admin_phone: phone, admin_code: code }),
        }
      );

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || data?.hint || "Admin verification failed.");
      }

      setReport(normalizeReport(data));
      setSelectedKey("profiles");
    } catch (err) {
      setReport(null);
      setError(err?.message || "Could not open admin dashboard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              EaseTalk Website
            </a>
            <div>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">Admin Dashboard</h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Profiles, subscriptions, trials and app access reports
              </p>
            </div>
          </div>

          {report ? (
            <button
              type="button"
              onClick={() => downloadCsv(report)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <form onSubmit={loadReport} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black">Owner Verification</h2>
                <p className="text-sm font-semibold text-slate-500">Use owner phone and hidden code.</p>
              </div>
            </div>

            <label className="mb-2 block text-sm font-black text-slate-700">Owner phone number</label>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Example: +91XXXXXXXXXX"
            />

            <label className="mb-2 block text-sm font-black text-slate-700">Hidden admin code</label>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Minimum 8 characters"
              type="password"
            />

            {error ? (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {loading ? "Opening dashboard..." : "Open Admin Dashboard"}
            </button>

            <div className="mt-5 rounded-lg bg-slate-50 p-4 text-xs font-semibold leading-5 text-slate-500">
              This page does not store your admin code. It sends the phone and code to the protected Supabase function and only shows the report if verification succeeds.
            </div>
          </form>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black">Business Activity</h2>
                <p className="text-sm font-semibold text-slate-500">
                  {report ? `Verified as ${report.role}` : "Verify owner access to view live data."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {STAT_CARDS.map((card) => {
                const Icon = card.icon;
                const active = selectedKey === card.key;
                return (
                  <button
                    key={card.key}
                    type="button"
                    onClick={() => setSelectedKey(card.key)}
                    className={`rounded-lg border p-5 text-left transition ${
                      active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="mb-5 h-7 w-7 text-blue-600" />
                    <div className="text-4xl font-black text-slate-950">
                      {report?.stats?.[card.statKey] ?? 0}
                    </div>
                    <div className="mt-3 text-lg font-black text-slate-600">{card.label}</div>
                  </button>
                );
              })}
            </div>
          </section>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-black">{selectedCard.label}</h2>
              <p className="text-sm font-semibold text-slate-500">
                {report ? `${selectedRows.length} row(s) currently shown` : "Open dashboard to load details."}
              </p>
            </div>
          </div>
          <DetailTable rows={selectedRows} />
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-black">Recent Subscription Activity</h2>
          <DetailTable rows={report?.recentSubscriptions || []} />
        </section>
      </main>
    </div>
  );
}
