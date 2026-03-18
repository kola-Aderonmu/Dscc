"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function deleteProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileId = String(formData.get("id") || "").trim();

  if (!profileId) {
    throw new Error("Profile ID is missing.");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      authId: user.id,
    },
  });

  if (!dbUser) {
    throw new Error("Authenticated user not found in local database.");
  }

  const existingProfile = await prisma.profile.findFirst({
    where: {
      id: profileId,
      userId: dbUser.id,
    },
  });

  if (!existingProfile) {
    throw new Error("Profile not found or access denied.");
  }

  await prisma.profile.delete({
    where: {
      id: existingProfile.id,
    },
  });

  redirect("/profiles");
}
