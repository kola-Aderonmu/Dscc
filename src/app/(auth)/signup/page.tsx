"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (data.user) {
      setMessage(
        "Account created successfully. Please check your email to confirm your account.",
      );
      setMessageType("success");
      setLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 2500);

      return;
    }

    setLoading(false);
  }

  return (
    <AuthShell
      mode="signup"
      title="Create Account"
      subtitle="Create your account and start building your smart digital identity."
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-full border border-slate-200 text-indigo-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            placeholder="Adekola Gabriel"
            required
          />
        </div>

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
            className="w-full rounded-full border border-slate-200 text-indigo-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#36c1bf] px-4 py-3 font-medium text-white transition hover:bg-[#29aeb2] disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {loading && (
          <div className="w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-2 w-1/2 animate-pulse rounded-full bg-green-500" />
          </div>
        )}

        {message && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              messageType === "success"
                ? "border border-green-300 bg-green-100 text-green-800"
                : "border border-red-300 bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </AuthShell>
  );
}
