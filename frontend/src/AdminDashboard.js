import React, { useEffect, useMemo, useState } from "react";
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
  UserPlus,
  Save,
  ClipboardList,
  Check,
} from "lucide-react";

const runtimeConfig = window.EASETALK_ADMIN_CONFIG || {};
const SUPABASE_URL = String(
  runtimeConfig.supabaseUrl || process.env.REACT_APP_SUPABASE_URL || ""
).trim();
const SUPABASE_ANON_KEY = String(
  runtimeConfig.supabaseAnonKey || process.env.REACT_APP_SUPABASE_ANON_KEY || ""
).trim();

const PERMISSION_OPTIONS = [
  {
    key: "profiles",
    label: "Profiles",
    description: "User profile list and profile details",
  },
  {
    key: "activeSubscriptions",
    label: "Active subscriptions",
    description: "Users with active access",
  },
  {
    key: "graceSubscriptions",
    label: "Grace subscriptions",
    description: "Users in grace access",
  },
  {
    key: "expiredSubscriptions",
    label: "Expired subscriptions",
    description: "Users whose app access expired",
  },
  {
    key: "trialRows",
    label: "Trial records",
    description: "Trial usage and trial eligibility rows",
  },
  {
    key: "blockedTrials",
    label: "Blocked trials",
    description: "Blocked or restricted trial rows",
  },
  {
    key: "recentSubscriptions",
    label: "Recent subscription activity",
    description: "Latest subscription status activity",
  },
];

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
  const permissions = Array.isArray(data?.permissions) ? data.permissions : [];
  return {
    role: data?.role || "admin",
    permissions,
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

function hasPermission(report, key) {
  if (!report) return false;
  if (report.role === "owner" || report.role === "super_admin") return true;
  return Array.isArray(report.permissions) && report.permissions.includes(key);
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
  useEffect(() => {
    document.title = "EaseTalk Admin";

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const previousContent = robotsMeta?.getAttribute("content") || "";

    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute("content", "noindex,nofollow,noarchive");

    return () => {
      if (previousContent) {
        robotsMeta?.setAttribute("content", previousContent);
      }
    };
  }, []);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [report, setReport] = useState(null);
  const [selectedKey, setSelectedKey] = useState("profiles");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminUsersLoading, setAdminUsersLoading] = useState(false);
  const [adminManageMsg, setAdminManageMsg] = useState("");
  const [newAdminPhone, setNewAdminPhone] = useState("");
  const [newAdminCode, setNewAdminCode] = useState("");
  const [newAdminActive, setNewAdminActive] = useState(true);
  const [newAdminPermissions, setNewAdminPermissions] = useState([
    "profiles",
    "activeSubscriptions",
  ]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [changeRequestsLoading, setChangeRequestsLoading] = useState(false);
  const [changeRequestMsg, setChangeRequestMsg] = useState("");
  const [requestActionType, setRequestActionType] = useState("amend_data");
  const [requestTargetTable, setRequestTargetTable] = useState("easetalk_user_profiles");
  const [requestTargetKey, setRequestTargetKey] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [requestData, setRequestData] = useState("{}");

  const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

  const visibleCards = useMemo(
    () => STAT_CARDS.filter((card) => hasPermission(report, card.key)),
    [report]
  );
  const selectedCard = visibleCards.find((card) => card.key === selectedKey) || visibleCards[0] || STAT_CARDS[0];
  const selectedRows = report ? rowsFor(report, selectedCard.key) : [];
  const canManageAdmins = report?.role === "owner" || report?.role === "super_admin";

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

      const nextReport = normalizeReport(data);
      setReport(nextReport);
      const firstAllowedCard = STAT_CARDS.find((card) => hasPermission(nextReport, card.key));
      setSelectedKey(firstAllowedCard?.key || "profiles");
      if (nextReport.role === "owner" || nextReport.role === "super_admin") {
        setTimeout(() => {
          void loadAdminUsers();
          void loadChangeRequests("pending");
        }, 0);
      } else {
        setAdminUsers([]);
        setTimeout(() => {
          void loadChangeRequests("all");
        }, 0);
      }
    } catch (err) {
      setReport(null);
      setError(err?.message || "Could not open admin dashboard.");
    } finally {
      setLoading(false);
    }
  }



  async function loadAdminUsers() {
    if (!phone || !code) return;
    try {
      setAdminUsersLoading(true);
      setAdminManageMsg("");
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/easetalk_admin_list_users`,
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
        throw new Error(data?.message || data?.hint || "Could not load authorised admins.");
      }
      setAdminUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setAdminManageMsg(err?.message || "Could not load authorised admins.");
    } finally {
      setAdminUsersLoading(false);
    }
  }

  async function saveAuthorisedAdmin(event) {
    event?.preventDefault();
    setAdminManageMsg("");

    if (!canManageAdmins) {
      setAdminManageMsg("Only owner can manage authorised admins.");
      return;
    }

    if (newAdminPhone.replace(/\D/g, "").length < 10) {
      setAdminManageMsg("Enter authorised admin phone number.");
      return;
    }

    if (newAdminCode.trim().length < 8) {
      setAdminManageMsg("Enter a special code of at least 8 characters for this admin.");
      return;
    }

    if (!newAdminPermissions.length) {
      setAdminManageMsg("Select at least one duty/permission.");
      return;
    }

    try {
      setAdminUsersLoading(true);
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/easetalk_admin_save_user`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            admin_phone: phone,
            admin_code: code,
            target_phone: newAdminPhone,
            target_code: newAdminCode,
            target_permissions: newAdminPermissions,
            target_is_active: newAdminActive,
          }),
        }
      );

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || data?.hint || "Could not save authorised admin.");
      }

      setAdminManageMsg("Authorised admin saved successfully.");
      setNewAdminPhone("");
      setNewAdminCode("");
      setNewAdminActive(true);
      setNewAdminPermissions(["profiles", "activeSubscriptions"]);
      await loadAdminUsers();
    } catch (err) {
      setAdminManageMsg(err?.message || "Could not save authorised admin.");
    } finally {
      setAdminUsersLoading(false);
    }
  }

  function toggleNewAdminPermission(key) {
    setNewAdminPermissions((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }


  async function loadChangeRequests(status = "pending") {
    if (!phone || !code) return;
    try {
      setChangeRequestsLoading(true);
      setChangeRequestMsg("");
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/easetalk_admin_list_change_requests`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            admin_phone: phone,
            admin_code: code,
            request_status: status,
          }),
        }
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || data?.hint || "Could not load change requests.");
      }
      setChangeRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setChangeRequestMsg(err?.message || "Could not load change requests.");
    } finally {
      setChangeRequestsLoading(false);
    }
  }

  async function createChangeRequest(event) {
    event?.preventDefault();
    setChangeRequestMsg("");

    let parsedData = {};
    try {
      parsedData = requestData.trim() ? JSON.parse(requestData) : {};
    } catch {
      setChangeRequestMsg("Requested data must be valid JSON, for example {\"field\":\"value\"}.");
      return;
    }

    if (!requestActionType.trim() || !requestTargetTable.trim()) {
      setChangeRequestMsg("Action type and target area are required.");
      return;
    }

    try {
      setChangeRequestsLoading(true);
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/easetalk_admin_create_change_request`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            admin_phone: phone,
            admin_code: code,
            action_type: requestActionType,
            target_table: requestTargetTable,
            target_key: requestTargetKey,
            requested_data: parsedData,
            reason: requestReason,
            old_data: {},
          }),
        }
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || data?.hint || "Could not create request.");
      }
      setChangeRequestMsg("Change request submitted for owner approval.");
      setRequestTargetKey("");
      setRequestReason("");
      setRequestData("{}");
      await loadChangeRequests(canManageAdmins ? "pending" : "all");
    } catch (err) {
      setChangeRequestMsg(err?.message || "Could not create request.");
    } finally {
      setChangeRequestsLoading(false);
    }
  }

  async function decideChangeRequest(requestId, decision) {
    if (!canManageAdmins) return;
    const note = window.prompt(`Enter note for ${decision} decision`, "") || "";
    try {
      setChangeRequestsLoading(true);
      setChangeRequestMsg("");
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/easetalk_admin_decide_change_request`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            admin_phone: phone,
            admin_code: code,
            request_id: requestId,
            decision,
            decision_note: note,
          }),
        }
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || data?.hint || "Could not update request.");
      }
      setChangeRequestMsg(`Request ${decision}.`);
      await loadChangeRequests("pending");
    } catch (err) {
      setChangeRequestMsg(err?.message || "Could not update request.");
    } finally {
      setChangeRequestsLoading(false);
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
        <section className={report ? "grid gap-6 lg:grid-cols-[380px_1fr]" : "mx-auto max-w-md"}>
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

          {report ? (
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black">Business Activity</h2>
                  <p className="text-sm font-semibold text-slate-500">
                    Verified as {report.role}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visibleCards.map((card) => {
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
                        {report.stats?.[card.statKey] ?? 0}
                      </div>
                      <div className="mt-3 text-lg font-black text-slate-600">{card.label}</div>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}
        </section>

        {report ? (
          <>
            <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-xl font-black">{selectedCard.label}</h2>
                  <p className="text-sm font-semibold text-slate-500">
                    {selectedRows.length} row(s) currently shown
                  </p>
                </div>
              </div>
              <DetailTable rows={selectedRows} />
            </section>



            <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black">Owner Consent For Major Changes</h2>
                  <p className="text-sm font-semibold text-slate-500">
                    Major additions, removals or amendments are recorded as requests. Only owner/super admin can approve or reject them.
                  </p>
                </div>
              </div>

              <form onSubmit={createChangeRequest} className="grid gap-4 lg:grid-cols-[320px_1fr]">
                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">Action type</label>
                  <select
                    value={requestActionType}
                    onChange={(event) => setRequestActionType(event.target.value)}
                    className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="amend_data">Amend data</option>
                    <option value="add_data">Add data</option>
                    <option value="remove_data">Remove data</option>
                    <option value="block_trial">Block trial</option>
                    <option value="change_access">Change access/subscription</option>
                    <option value="admin_permission_change">Admin permission change</option>
                  </select>

                  <label className="mb-2 block text-sm font-black text-slate-700">Target area/table</label>
                  <input
                    value={requestTargetTable}
                    onChange={(event) => setRequestTargetTable(event.target.value)}
                    className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="easetalk_user_profiles"
                  />

                  <label className="mb-2 block text-sm font-black text-slate-700">Target ID / phone / key</label>
                  <input
                    value={requestTargetKey}
                    onChange={(event) => setRequestTargetKey(event.target.value)}
                    className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="User phone, device ID, row ID"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">Requested data as JSON</label>
                  <textarea
                    value={requestData}
                    onChange={(event) => setRequestData(event.target.value)}
                    className="mb-4 min-h-28 w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder='{"field":"new value"}'
                  />

                  <label className="mb-2 block text-sm font-black text-slate-700">Reason / note</label>
                  <textarea
                    value={requestReason}
                    onChange={(event) => setRequestReason(event.target.value)}
                    className="mb-4 min-h-20 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Why this change is needed"
                  />

                  <button
                    type="submit"
                    disabled={changeRequestsLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {changeRequestsLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ClipboardList className="h-4 w-4" />}
                    Submit For Owner Approval
                  </button>
                </div>
              </form>

              {changeRequestMsg ? (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700">
                  {changeRequestMsg}
                </div>
              ) : null}

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black">
                    {canManageAdmins ? "Pending approval queue" : "My change requests"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => loadChangeRequests(canManageAdmins ? "pending" : "all")}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-50"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                  </button>
                </div>

                {!changeRequests.length ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                    No change requests found.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {changeRequests.map((item) => (
                      <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-950">{item.action_type} - {item.target_table}</p>
                            <p className="mt-1 text-xs font-semibold text-slate-500">Target: {item.target_key || "-"} - Requested by: {item.requested_by_phone}</p>
                            <p className="mt-2 text-sm font-semibold text-slate-600">{item.reason || "No reason provided."}</p>
                            <pre className="mt-3 overflow-auto rounded-lg bg-slate-50 p-3 text-xs font-semibold text-slate-600">{JSON.stringify(item.requested_data || {}, null, 2)}</pre>
                          </div>
                          <div className="flex shrink-0 flex-col gap-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-center text-xs font-black uppercase text-slate-600">{item.status}</span>
                            {canManageAdmins && item.status === "pending" ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => decideChangeRequest(item.id, "approved")}
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-black text-white hover:bg-emerald-700"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => decideChangeRequest(item.id, "rejected")}
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-black text-white hover:bg-red-700"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  Reject
                                </button>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {canManageAdmins ? (
              <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black">Authorised Admin Persons</h2>
                    <p className="text-sm font-semibold text-slate-500">
                      Owner can appoint limited admins with their own phone, special code and duties.
                    </p>
                  </div>
                </div>

                <form onSubmit={saveAuthorisedAdmin} className="grid gap-4 lg:grid-cols-[320px_1fr]">
                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-700">Admin phone number</label>
                    <input
                      value={newAdminPhone}
                      onChange={(event) => setNewAdminPhone(event.target.value)}
                      className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Example: +91XXXXXXXXXX"
                    />

                    <label className="mb-2 block text-sm font-black text-slate-700">Special admin code</label>
                    <input
                      value={newAdminCode}
                      onChange={(event) => setNewAdminCode(event.target.value)}
                      className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Minimum 8 characters"
                      type="password"
                    />

                    <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                      <input
                        type="checkbox"
                        checked={newAdminActive}
                        onChange={(event) => setNewAdminActive(event.target.checked)}
                      />
                      Active authorised admin
                    </label>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-black text-slate-700">Allowed duties</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {PERMISSION_OPTIONS.map((option) => (
                        <label key={option.key} className="rounded-lg border border-slate-200 p-3 text-sm font-semibold text-slate-700">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={newAdminPermissions.includes(option.key)}
                              onChange={() => toggleNewAdminPermission(option.key)}
                              className="mt-1"
                            />
                            <div>
                              <p className="font-black">{option.label}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">{option.description}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {adminManageMsg ? (
                      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700">
                        {adminManageMsg}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={adminUsersLoading}
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {adminUsersLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save Authorised Admin
                    </button>
                  </div>
                </form>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-black">Current authorised admins</h3>
                    <button
                      type="button"
                      onClick={loadAdminUsers}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-50"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Refresh
                    </button>
                  </div>
                  <DetailTable rows={adminUsers} />
                </div>
              </section>
            ) : null}

            <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-black">Recent Subscription Activity</h2>
              <DetailTable rows={report.recentSubscriptions || []} />
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
