"use client";

import { useState } from "react";
import { deleteProfile } from "@/app/(dashboard)/profiles/[id]/delete-profile-action";

export default function DeleteProfileForm({
  profileId,
}: {
  profileId: string;
}) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center justify-center rounded-full border border-red-300 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Delete Profile
      </button>
    );
  }

  return (
    <form action={deleteProfile} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="id" value={profileId} />

      <span className="text-sm text-slate-600">Are you sure?</span>

      <button
        type="submit"
        className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Yes, Delete
      </button>

      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400"
      >
        Cancel
      </button>
    </form>
  );
}
