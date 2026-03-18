"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const MAX_BIO_LENGTH = 180;
const MAX_ADDRESS_LENGTH = 100;
const MAX_SKILLS = 5;
const MAX_SKILL_LENGTH = 25;

export type UpdateProfileState = {
  error?: string;
};

export async function updateProfile(
  prevState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileId = String(formData.get("id") || "");

  const existingProfile = await prisma.profile.findFirst({
    where: {
      id: profileId,
      user: {
        authId: user.id,
      },
    },
  });

  if (!existingProfile) {
    return {
      error: "Profile not found or access denied.",
    };
  }

  const bioRaw = String(formData.get("bio") || "").trim();
  const addressRaw = String(formData.get("address") || "").trim();
  const skillsRaw = String(formData.get("skills") || "").trim();

  if (bioRaw.length > MAX_BIO_LENGTH) {
    return {
      error: `Bio must not exceed ${MAX_BIO_LENGTH} characters.`,
    };
  }

  if (addressRaw.length > MAX_ADDRESS_LENGTH) {
    return {
      error: `Address must not exceed ${MAX_ADDRESS_LENGTH} characters.`,
    };
  }

  const skills = skillsRaw
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (skills.length > MAX_SKILLS) {
    return {
      error: `You can only add up to ${MAX_SKILLS} skills.`,
    };
  }

  const invalidSkill = skills.find((skill) => skill.length > MAX_SKILL_LENGTH);

  if (invalidSkill) {
    return {
      error: `Each skill must not exceed ${MAX_SKILL_LENGTH} characters.`,
    };
  }

  await prisma.profile.update({
    where: {
      id: existingProfile.id,
    },
    data: {
      name: String(formData.get("name") || "").trim(),
      profileType: String(formData.get("profileType") || "custom") as
        | "executive"
        | "investor"
        | "official"
        | "tech"
        | "personal"
        | "custom",
      fullName: String(formData.get("fullName") || "").trim(),
      title: String(formData.get("title") || "").trim() || null,
      organizationName:
        String(formData.get("organizationName") || "").trim() || null,
      bio: bioRaw || null,
      skills,
      email: String(formData.get("email") || "").trim() || null,
      phone: String(formData.get("phone") || "").trim() || null,
      whatsapp: String(formData.get("whatsapp") || "").trim() || null,
      website: String(formData.get("website") || "").trim() || null,
      linkedinUrl: String(formData.get("linkedinUrl") || "").trim() || null,
      twitterUrl: String(formData.get("twitterUrl") || "").trim() || null,
      address: addressRaw || null,
      isActive: formData.get("isActive") === "on",
      isDefault: formData.get("isDefault") === "on",
    },
  });

  redirect(`/profiles/${existingProfile.id}`);
}
