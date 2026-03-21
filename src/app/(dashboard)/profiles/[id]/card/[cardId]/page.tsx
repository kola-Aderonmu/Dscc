import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import CardTemplatePreview from "@/components/cards/card-template-preview";

type ProfileCardPageProps = {
  params: Promise<{
    id: string;
    cardId: string;
  }>;
};

export default async function ProfileCardPage({
  params,
}: ProfileCardPageProps) {
  const { id, cardId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const card = await prisma.profileCard.findFirst({
    where: {
      id: cardId,
      profile: {
        id,
        user: {
          authId: user.id,
        },
      },
    },
    include: {
      profile: true,
      template: true,
    },
  });

  if (!card) {
    notFound();
  }

  const publicUrl = `/c/${card.cardSlug}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Card Created</h2>
          <p className="mt-2 text-slate-500">
            Your smart card and QR code are ready.
          </p>
        </div>

        <Link
          href={`/profiles/${card.profile.id}`}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
        >
          Back to Profile
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800">Card Preview</h3>

          <div className="mt-5">
            <CardTemplatePreview
              template={card.template}
              profile={card.profile}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800">QR & Sharing</h3>

          {card.qrCodeUrl ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <img
                src={card.qrCodeUrl}
                alt="QR code for public card"
                className="mx-auto h-56 w-56"
              />
            </div>
          ) : (
            <p className="text-sm text-slate-500">QR not generated yet.</p>
          )}

          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">Template:</span>{" "}
              {card.template.name}
            </p>
            <p>
              <span className="font-medium text-slate-800">Card Slug:</span>{" "}
              {card.cardSlug}
            </p>
            <p>
              <span className="font-medium text-slate-800">Status:</span>{" "}
              {card.status}
            </p>
            <p>
              <span className="font-medium text-slate-800">Public Path:</span>{" "}
              {publicUrl}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={publicUrl}
              target="_blank"
              className="rounded-full bg-[#36c1bf] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6]"
            >
              Open Public Card
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
