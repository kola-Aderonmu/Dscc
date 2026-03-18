"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createProfile, type CreateProfileState } from "./profile-actions";
import SubmitButton from "@/components/forms/submit-button";

const initialState: CreateProfileState = {};

export default function NewProfilePage() {
  const [state, formAction] = useActionState(createProfile, initialState);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Create New Profile
          </h2>
          <p className="mt-2 text-slate-500">
            Build a new smart identity profile for a specific audience or
            purpose.
          </p>
        </div>

        <Link
          href="/profiles"
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#36c1bf] hover:text-[#36c1bf]"
        >
          Back to Profiles
        </Link>
      </div>

      <form action={formAction} className="space-y-8">
        {state.error && (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Profile Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Investor Meeting Profile"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Profile Type
            </label>
            <select
              name="profileType"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
              required
              defaultValue="custom"
            >
              <option value="executive">Executive</option>
              <option value="investor">Investor</option>
              <option value="official">Official</option>
              <option value="tech">Tech</option>
              <option value="personal">Personal</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Adekola Gabriel"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Cybersecurity Officer"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Organization Name
            </label>
            <input
              name="organizationName"
              type="text"
              placeholder="Messrs"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="+234..."
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              WhatsApp
            </label>
            <input
              name="whatsapp"
              type="text"
              placeholder="+234..."
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Website
            </label>
            <input
              name="website"
              type="text"
              placeholder="https://yourwebsite.com"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              LinkedIn URL
            </label>
            <input
              name="linkedinUrl"
              type="text"
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Twitter / X URL
            </label>
            <input
              name="twitterUrl"
              type="text"
              placeholder="https://x.com/..."
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Address
            </label>
            <input
              name="address"
              type="text"
              maxLength={100}
              placeholder="Abuja, Nigeria"
              className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
            />
            <p className="text-xs text-slate-400">Maximum 100 characters.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Skills</label>
          <input
            name="skills"
            type="text"
            maxLength={180}
            placeholder="Attention to detail, Resourceful, Leadership"
            className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
          />
          <p className="text-xs text-slate-400">
            Separate skills with commas. Maximum 5 skills, 25 characters per
            skill.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Bio</label>
          <textarea
            name="bio"
            rows={5}
            maxLength={180}
            placeholder="Write a short professional summary..."
            className="w-full rounded-2xl border border-slate-300 text-slate-800 px-4 py-3 outline-none transition focus:border-[#36c1bf]"
          />
          <p className="text-xs text-slate-400">Maximum 180 characters.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4">
            <input name="isActive" type="checkbox" defaultChecked />
            <span className="text-sm font-medium text-slate-700">
              Set profile as active
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4">
            <input name="isDefault" type="checkbox" />
            <span className="text-sm font-medium text-slate-700">
              Make this the default profile
            </span>
          </label>
        </div>

        <div className="flex justify-end">
          <SubmitButton text="Save Profile" pendingText="Saving..." />
        </div>
      </form>
    </div>
  );
}
