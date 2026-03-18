"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type DashboardShellProps = {
  userEmail?: string;
  userName?: string;
  userRole?: string;
  children: React.ReactNode;
};

export default function DashboardShell({
  userEmail,
  userName,
  userRole,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profiles", href: "/profiles" },
    { label: "QR Cards", href: "/qr" },
    { label: "Analytics", href: "/analytics" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              DSCC Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Welcome {userName || userEmail || "User"}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#36c1bf]">
              Role: {userRole || "user"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-red-400 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-3xl bg-white p-5 shadow-sm">
          <nav className="space-y-3">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#36c1bf] text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {userRole === "admin" && (
              <div className="rounded-2xl border border-[#36c1bf] px-4 py-3 text-sm font-medium text-[#36c1bf]">
                Admin Panel
              </div>
            )}
          </nav>
        </aside>

        <main className="rounded-3xl bg-white p-6 shadow-sm">{children}</main>
      </div>
    </div>
  );
}
