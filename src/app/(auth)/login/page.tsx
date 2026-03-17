"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const loginRequest = supabase.auth.signInWithPassword({
      email,
      password,
    });

    const minimumLoader = new Promise((resolve) => setTimeout(resolve, 4000));

    const [{ error }] = await Promise.all([loginRequest, minimumLoader]);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
    setLoading(false);
  }

  return (
    <AuthShell
      mode="login"
      title="Sign in to DSCC"
      subtitle="Access your profiles, QR cards, and smart digital contact tools."
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-slate-200 text-indigo-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-slate-800 text-indigo-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#36c1bf] px-4 py-3 font-medium text-white transition hover:bg-[#29aeb2] disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#cbeeed] bg-[#f1fbfb] px-4 py-4 text-center">
            <div className="hourglass-loader" />
            <p className="text-sm font-medium text-[#237b80]">
              Signing you in, please wait...
            </p>
            <div className="w-full overflow-hidden rounded-full bg-[#d8f3f1]">
              <div className="login-progress-bar h-2 rounded-full bg-[#36c1bf]" />
            </div>
          </div>
        )}

        {message && (
          <div className="rounded-2xl border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-800">
            {message}
          </div>
        )}
      </form>
    </AuthShell>
  );
}
