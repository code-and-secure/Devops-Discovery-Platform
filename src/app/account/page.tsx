import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { AccountProfileForm } from "@/components/account/profile-form";
import { AccountDangerZone } from "@/components/account/danger-zone";
import { Shield, Bell, Bookmark, Activity, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;
  const initials = user.firstName
    ? (user.firstName[0] + (user.lastName?.[0] ?? "")).toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your profile and account preferences</p>
        </div>

        {/* Profile overview card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">{displayName}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm truncate">{user.email}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                user.isVerified
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user.isVerified ? "bg-green-500" : "bg-amber-500"}`} />
                {user.isVerified ? "Verified" : "Not verified"}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">· Member since 2026</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Edit profile */}
          <section id="profile" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Profile Information</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Update your display name</p>
              </div>
            </div>
            <AccountProfileForm
              firstName={user.firstName ?? ""}
              lastName={user.lastName ?? ""}
              email={user.email}
            />
          </section>

          {/* Platform features */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Bookmark className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Platform Features</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your StackLens activity</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Bookmark, label: "Saved Resources", value: "0", color: "purple", href: "/" },
                { icon: Bell, label: "Newsletter", value: "Not subscribed", color: "blue", href: "/newsletter" },
                { icon: Shield, label: "Account Status", value: user.isVerified ? "Active" : "Pending", color: "green", href: null },
              ].map(({ icon: Icon, label, value, color, href }) => (
                <div key={label} className={`p-4 rounded-2xl bg-${color}-50 dark:bg-${color}-900/10 border border-${color}-100 dark:border-${color}-900/30`}>
                  <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400 mb-2`} />
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
                  {href && (
                    <a href={href} className={`text-xs text-${color}-600 dark:text-${color}-400 hover:underline mt-1 block`}>
                      {label === "Newsletter" ? "Subscribe →" : "Browse →"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Email & notifications */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center">
                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Email & Notifications</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manage communication preferences</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">Email address</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                </div>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg">Verified</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">Weekly newsletter</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Get curated DevOps & AI updates</div>
                </div>
                <a
                  href="/newsletter"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Manage →
                </a>
              </div>
            </div>
          </section>

          {/* Danger zone */}
          <AccountDangerZone />
        </div>
      </main>
    </div>
  );
}
