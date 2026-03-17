"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppSplash from "@/components/app-splash";
import { motion } from "framer-motion";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    let current = 0;

    const interval = setInterval(() => {
      current += 2;
      if (current <= 100) {
        setProgress(current);
      }
    }, 100);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  if (showSplash) {
    return <AppSplash progress={progress} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7fafc] px-4">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full max-w-lg rounded-[28px] bg-white p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#56d6cc] to-[#2db2b5] text-2xl font-bold text-white">
          DS
        </div>

        <h1 className="mt-5 text-3xl font-bold text-slate-800">
          Welcome to DSCC
        </h1>
        <p className="mt-2 text-slate-500">
          Create, manage, and share smart professional profiles instantly.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="rounded-full bg-[#36c1bf] px-6 py-3 font-medium text-white transition hover:bg-[#29aeb2]"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#29aeb2]"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
