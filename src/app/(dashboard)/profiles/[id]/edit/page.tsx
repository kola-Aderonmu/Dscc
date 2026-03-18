import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import EditProfileForm from "@/components/profiles/edit-profile-form";

type EditProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProfilePage({
  params,
}: EditProfilePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const profile = await prisma.profile.findFirst({
    where: {
      id,
      user: {
        authId: user.id,
      },
    },
  });

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Edit Profile</h2>
          <p className="mt-2 text-slate-500">
            Update the details of this smart profile.
          </p>
        </div>

        <Link
          href={`/profiles/${profile.id}`}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
        >
          Back to Details
        </Link>
      </div>

      <EditProfileForm profile={profile} />
    </div>
  );
}
