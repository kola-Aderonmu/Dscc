import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { syncUserToDatabase } from "@/lib/auth/sync-user";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await syncUserToDatabase({
    authId: user.id,
    email: user.email ?? "",
    fullName:
      (user.user_metadata?.full_name as string | undefined) ?? "New User",
  });

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-base">
        Welcome, {user.user_metadata?.full_name || user.email}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Your DSCC account is now connected to the app database.
      </p>
    </main>
  );
}
