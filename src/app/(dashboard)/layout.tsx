import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { syncUserToDatabase } from "@/lib/auth/sync-user";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await syncUserToDatabase({
    authId: user.id,
    email: user.email ?? "",
    fullName:
      (user.user_metadata?.full_name as string | undefined) ?? "New User",
  });

  return (
    <DashboardShell
      userEmail={dbUser.email}
      userName={dbUser.fullName}
      userRole={dbUser.role}
    >
      {children}
    </DashboardShell>
  );
}
