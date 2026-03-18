import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function ProfilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profiles = await prisma.profile.findMany({
    where: {
      user: {
        authId: user?.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Profiles</h2>
          <p className="mt-2 text-slate-500">
            Manage your smart digital complementary card profiles.
          </p>
        </div>

        <Link
          href="/profiles/new"
          className="inline-flex items-center justify-center rounded-full bg-[#36c1bf] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6]"
        >
          Create New Profile
        </Link>
      </div>

      {profiles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center">
          <h3 className="text-xl font-semibold text-slate-700">
            No profiles yet
          </h3>
          <p className="mt-2 text-slate-500">
            Create your first profile to start building your smart card
            identity.
          </p>

          <Link
            href="/profiles/new"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#36c1bf] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6]"
          >
            Create Your First Profile
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="rounded-3xl border border-slate-200 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-sm capitalize text-slate-500">
                    {profile.profileType}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    profile.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {profile.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-700">Full Name:</span>{" "}
                  {profile.fullName}
                </p>

                {profile.title && (
                  <p>
                    <span className="font-medium text-slate-700">Title:</span>{" "}
                    {profile.title}
                  </p>
                )}

                {profile.organizationName && (
                  <p>
                    <span className="font-medium text-slate-700">
                      Organization:
                    </span>{" "}
                    {profile.organizationName}
                  </p>
                )}

                {profile.email && (
                  <p>
                    <span className="font-medium text-slate-700">Email:</span>{" "}
                    {profile.email}
                  </p>
                )}

                {profile.phone && (
                  <p>
                    <span className="font-medium text-slate-700">Phone:</span>{" "}
                    {profile.phone}
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {profile.isDefault ? "Default Profile" : "Custom Profile"}
                </span>

                <Link
                  href={`/profiles/${profile.id}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
