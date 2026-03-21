import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteProfileForm from "@/components/profiles/delete-profile-form";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

type ProfileDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfileDetailsPage({
  params,
}: ProfileDetailsPageProps) {
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{profile.name}</h2>
          <p className="mt-2 text-slate-500">
            Full details of this smart profile.
          </p>
        </div>

        <Link
          href="/profiles"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
        >
          Back to Profiles
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DetailCard label="Profile Name" value={profile.name} />
        <DetailCard label="Profile Type" value={profile.profileType} />
        <DetailCard label="Full Name" value={profile.fullName} />
        <DetailCard label="Title" value={profile.title} />
        <DetailCard
          label="Organization Name"
          value={profile.organizationName}
        />
        <DetailCard label="Email" value={profile.email} />
        <DetailCard label="Phone" value={profile.phone} />
        <DetailCard label="WhatsApp" value={profile.whatsapp} />
        <DetailCard label="Website" value={profile.website} />
        <DetailCard label="LinkedIn URL" value={profile.linkedinUrl} />
        <DetailCard label="Twitter / X URL" value={profile.twitterUrl} />
        <DetailCard label="Address" value={profile.address} />
        <DetailCard
          label="Status"
          value={profile.isActive ? "Active" : "Inactive"}
        />
        <DetailCard
          label="Default Profile"
          value={profile.isDefault ? "Yes" : "No"}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800">Bio</h3>
        <p className="mt-3 whitespace-pre-line text-slate-600">
          {profile.bio || "No bio provided."}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800">Skills</h3>
        {profile.skills.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#e8f8f7] px-4 py-2 text-sm font-medium text-[#248b89]"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-slate-600">No skills added.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/profiles/${profile.id}/card`}
          className="inline-flex items-center justify-center rounded-full bg-[#111827] px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Create Smart Card
        </Link>

        <Link
          href={`/profiles/${profile.id}/edit`}
          className="inline-flex items-center justify-center rounded-full bg-[#36c1bf] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6]"
        >
          Edit Profile
        </Link>

        <DeleteProfileForm profileId={profile.id} />
      </div>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-base font-medium text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}
