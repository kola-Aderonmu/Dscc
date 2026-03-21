"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { generateQrDataUrl } from "@/lib/qr";

export async function createProfileCard(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileId = String(formData.get("profileId") || "").trim();
  const templateId = String(formData.get("templateId") || "").trim();

  const dbUser = await prisma.user.findUnique({
    where: {
      authId: user.id,
    },
  });

  if (!dbUser) {
    throw new Error("Authenticated user not found in local database.");
  }

  const profile = await prisma.profile.findFirst({
    where: {
      id: profileId,
      userId: dbUser.id,
    },
  });

  if (!profile) {
    throw new Error("Profile not found or access denied.");
  }

  const template = await prisma.cardTemplate.findUnique({
    where: {
      id: templateId,
    },
  });

  if (!template) {
    throw new Error("Selected template not found.");
  }

  const cardSlug = `${profile.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${nanoid(6)}`;

  const publicToken = nanoid(24);

  const publicCardPath = `/c/${cardSlug}`;
  const qrCodeUrl = await generateQrDataUrl(publicCardPath);

  const card = await prisma.profileCard.create({
    data: {
      profileId: profile.id,
      templateId: template.id,
      cardSlug,
      publicToken,
      status: "active",
      qrCodeUrl,
    },
  });

  redirect(`/profiles/${profile.id}/card/${card.id}`);
}
