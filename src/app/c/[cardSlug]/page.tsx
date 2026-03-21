import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CardTemplatePreview from "@/components/cards/card-template-preview";

type PublicCardPageProps = {
  params: Promise<{
    cardSlug: string;
  }>;
};

export default async function PublicCardPage({ params }: PublicCardPageProps) {
  const { cardSlug } = await params;

  const card = await prisma.profileCard.findFirst({
    where: {
      cardSlug,
      status: "active",
    },
    include: {
      profile: true,
      template: true,
    },
  });

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Digital Smart Complementary Card
          </h1>
          <p className="mt-2 text-slate-500">
            View profile details and save contact information.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <CardTemplatePreview
            template={card.template}
            profile={card.profile}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              Profile Details
            </h2>

            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <Detail label="Full Name" value={card.profile.fullName} />
              <Detail label="Title" value={card.profile.title} />
              <Detail
                label="Organization"
                value={card.profile.organizationName}
              />
              <Detail label="Email" value={card.profile.email} />
              <Detail label="Phone" value={card.profile.phone} />
              <Detail label="WhatsApp" value={card.profile.whatsapp} />
              <Detail label="Website" value={card.profile.website} />
              <Detail label="LinkedIn" value={card.profile.linkedinUrl} />
              <Detail label="Twitter / X" value={card.profile.twitterUrl} />
              <Detail label="Address" value={card.profile.address} />
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">About</h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {card.profile.bio || "No bio provided."}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-800">Skills</h3>

              {card.profile.skills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#e8f8f7] px-4 py-2 text-xs font-medium text-[#248b89]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No skills added.</p>
              )}
            </div>
          </section>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">
            Quick Actions
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {card.profile.email && (
              <a
                href={`mailto:${card.profile.email}`}
                className="rounded-full bg-[#36c1bf] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6]"
              >
                Send Email
              </a>
            )}

            {card.profile.phone && (
              <a
                href={`tel:${card.profile.phone}`}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
              >
                Call Now
              </a>
            )}

            {card.profile.website && (
              <a
                href={card.profile.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
              >
                Visit Website
              </a>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-700">{value || "Not provided"}</p>
    </div>
  );
}
