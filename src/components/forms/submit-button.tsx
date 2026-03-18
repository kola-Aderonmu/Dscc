"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  text: string;
  pendingText: string;
};

export default function SubmitButton({ text, pendingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-[#36c1bf] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2eb5b6] disabled:opacity-70"
    >
      {pending ? pendingText : text}
    </button>
  );
}
