import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { createProfileCard } from "./card-actions";

type CardSelectionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CardSelectionPage({
  params,
}: CardSelectionPageProps) {
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

  const templates = await prisma.cardTemplate.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Choose Card Template
          </h2>
          <p className="mt-2 text-slate-500">
            Select a template for{" "}
            <span className="font-medium">{profile.name}</span>.
          </p>
        </div>

        <Link
          href={`/profiles/${profile.id}`}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
        >
          Back to Profile
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <form
            key={template.id}
            action={createProfileCard}
            className="rounded-3xl border border-slate-200 p-5 shadow-sm transition hover:shadow-md"
          >
            <input type="hidden" name="profileId" value={profile.id} />
            <input type="hidden" name="templateId" value={template.id} />

            <div className="rounded-3xl border border-slate-200 p-5">
              <div
                className={`h-44 rounded-2xl ${
                  template.slug === "executive-dark"
                    ? "bg-slate-900"
                    : template.slug === "clean-corporate"
                      ? "bg-slate-100"
                      : "bg-white/30 backdrop-blur border border-slate-200"
                } flex items-end p-4`}
              >
                <div>
                  <p
                    className={`text-sm ${
                      template.slug === "executive-dark"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    DSCC Preview
                  </p>
                  <h3
                    className={`mt-1 text-xl font-bold ${
                      template.slug === "executive-dark"
                        ? "text-white"
                        : "text-slate-800"
                    }`}
                  >
                    {profile.fullName}
                  </h3>
                  <p
                    className={`text-sm ${
                      template.slug === "executive-dark"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {profile.title || "Professional Profile"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-slate-800">
                  {template.name}
                </h4>
                <p className="mt-1 text-sm capitalize text-slate-500">
                  {template.themeType} theme
                </p>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-[#36c1bf] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6]"
              >
                Use This Template
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
