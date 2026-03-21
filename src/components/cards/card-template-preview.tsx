import { CardTemplate, Profile } from "@prisma/client";

type CardTemplatePreviewProps = {
  template: CardTemplate;
  profile: Profile;
  compact?: boolean;
};

export default function CardTemplatePreview({
  template,
  profile,
  compact = false,
}: CardTemplatePreviewProps) {
  if (compact) {
    return <CompactTemplatePreview template={template} profile={profile} />;
  }

  return <FullTemplatePreview template={template} profile={profile} />;
}

function CompactTemplatePreview({
  template,
  profile,
}: {
  template: CardTemplate;
  profile: Profile;
}) {
  const shortName = profile.fullName.split(" ").slice(0, 3).join(" ");

  const title = profile.title || "Professional Profile";

  switch (template.slug) {
    case "executive-dark":
      return (
        <div className="h-52 rounded-[28px] bg-[#071227] p-5 text-white shadow-[0_18px_45px_rgba(2,6,23,0.28)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="h-[3px] w-12 rounded-full bg-[#2dd4bf]" />
              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.25em] text-white/55">
                Custom
              </p>
              <h3 className="mt-3 max-w-[80%] text-[1.15rem] font-bold leading-[1.05] tracking-[-0.03em]">
                {shortName}
              </h3>
              <p className="mt-2 text-[0.8rem] text-white/70 line-clamp-1">
                {title}
              </p>
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/40">
              Premium Dark
            </p>
          </div>
        </div>
      );

    case "corporate-wave-blue":
      return (
        <div className="relative h-52 overflow-hidden rounded-[28px] bg-white shadow-[0_14px_35px_rgba(15,79,168,0.12)]">
          <div className="absolute inset-y-0 left-0 w-[48%] rounded-r-[80px] bg-[#0f4fa8]" />
          <div className="absolute inset-y-0 left-[31%] w-8 rounded-r-[32px] bg-white" />
          <div className="relative z-10 flex h-full">
            <div className="flex w-[56%] flex-col justify-center px-5 text-white">
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-blue-100/70">
                Profile
              </p>
              <h3 className="mt-3 text-[1.1rem] font-bold leading-[1.05] tracking-[-0.03em]">
                {shortName}
              </h3>
              <p className="mt-2 text-[0.78rem] text-blue-100/85 line-clamp-1">
                {title}
              </p>
            </div>
            <div className="ml-auto flex w-[36%] items-end justify-end px-4 pb-5">
              <div className="h-10 w-10 rounded-xl bg-[#0f4fa8]/10" />
            </div>
          </div>
        </div>
      );

    case "crimson-arc":
      return (
        <div className="relative h-52 overflow-hidden rounded-[28px] bg-[#f8fafc] shadow-[0_14px_35px_rgba(220,38,38,0.12)]">
          <div className="absolute right-0 top-0 h-full w-[40%] bg-[#31384b]" />
          <div className="absolute right-[24%] top-[-15%] h-[130%] w-20 rounded-full bg-[#ef1111]" />
          <div className="absolute right-[30%] top-[-10%] h-[118%] w-7 rounded-full bg-[#f8fafc]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div>
              <div className="h-[3px] w-10 rounded-full bg-[#ef1111]" />
              <h3 className="mt-4 max-w-[62%] text-[1.1rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#111827]">
                {shortName}
              </h3>
              <p className="mt-2 max-w-[58%] text-[0.78rem] text-slate-600 line-clamp-1">
                {title}
              </p>
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-400">
              Bold Corporate
            </p>
          </div>
        </div>
      );

    case "minimal-white-editorial":
      return (
        <div className="h-52 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
          <div className="flex h-full flex-col justify-center">
            <h3 className="font-serif text-[1.2rem] font-bold leading-[1.1] tracking-[-0.025em] text-[#111111]">
              {shortName}
            </h3>
            <p className="mt-2 text-[0.82rem] text-slate-600 line-clamp-1">
              {title}
            </p>
            <div className="mt-5 h-px w-16 bg-slate-300" />
            <p className="mt-5 text-[0.68rem] uppercase tracking-[0.14em] text-slate-400">
              Minimal Editorial
            </p>
          </div>
        </div>
      );

    case "split-contrast":
      return (
        <div className="grid h-52 overflow-hidden rounded-[28px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] grid-cols-2">
          <div className="flex flex-col justify-center bg-white px-4">
            <h3 className="text-[1rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#111827]">
              {shortName}
            </h3>
            <p className="mt-2 text-[0.75rem] text-slate-600 line-clamp-1">
              {title}
            </p>
          </div>
          <div className="flex items-end bg-[#111111] p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/50">
              Contrast
            </p>
          </div>
        </div>
      );

    case "glass-frost":
      return (
        <div className="h-52 rounded-[28px] bg-[linear-gradient(135deg,#ddd6fe_0%,#ffffff_35%,#cffafe_100%)] p-4 shadow-[0_14px_35px_rgba(139,92,246,0.14)]">
          <div className="h-full rounded-[24px] border border-white/60 bg-white/55 p-5 backdrop-blur-xl">
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">
              Glass
            </p>
            <h3 className="mt-4 text-[1.15rem] font-bold leading-[1.08] tracking-[-0.03em] text-slate-900">
              {shortName}
            </h3>
            <p className="mt-2 text-[0.8rem] text-slate-600 line-clamp-1">
              {title}
            </p>
          </div>
        </div>
      );

    case "tech-grid-neon":
      return (
        <div className="relative h-52 overflow-hidden rounded-[28px] bg-[#020617] p-5 text-cyan-100 shadow-[0_18px_45px_rgba(2,6,23,0.34)]">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#22d3ee22_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee22_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-cyan-300">
                Custom
              </p>
              <h3 className="mt-4 max-w-[80%] text-[1.12rem] font-bold leading-[1.06] tracking-[-0.03em] text-white">
                {shortName}
              </h3>
              <p className="mt-2 text-[0.8rem] text-cyan-100/80 line-clamp-1">
                {title}
              </p>
            </div>
            <div className="h-[2px] w-16 rounded-full bg-cyan-400/80" />
          </div>
        </div>
      );

    case "official-clean":
      return (
        <div className="h-52 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(29,78,216,0.08)]">
          <div className="h-full border-l-[4px] border-[#1d4ed8] pl-4">
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#1d4ed8]">
              Official Profile
            </p>
            <h3 className="mt-4 max-w-[78%] text-[1.12rem] font-bold leading-[1.06] tracking-[-0.03em] text-slate-900">
              {shortName}
            </h3>
            <p className="mt-2 text-[0.8rem] text-slate-600 line-clamp-1">
              {title}
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-52 rounded-[28px] border border-slate-200 bg-white p-5">
          <h3 className="text-[1.1rem] font-bold text-slate-900">
            {shortName}
          </h3>
          <p className="mt-2 text-[0.8rem] text-slate-600">{title}</p>
        </div>
      );
  }
}

function FullTemplatePreview({
  template,
  profile,
}: {
  template: CardTemplate;
  profile: Profile;
}) {
  const contactItems = [
    profile.phone,
    profile.email,
    profile.website,
    profile.address,
  ].filter(Boolean);

  switch (template.slug) {
    case "executive-dark":
      return (
        <div className="min-h-[380px] rounded-[36px] bg-[#0b1220] p-8 text-white shadow-[0_18px_50px_rgba(2,6,23,0.35)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="h-[3px] w-16 rounded-full bg-[#2dd4bf]" />
              <p className="mt-6 text-[0.75rem] uppercase tracking-[0.22em] text-white/55">
                {profile.profileType}
              </p>
              <h3 className="mt-4 max-w-[80%] text-[2.35rem] font-bold leading-[1.02] tracking-[-0.04em]">
                {profile.fullName}
              </h3>
              <p className="mt-3 text-[1.08rem] text-white/78">
                {profile.title || "Professional Profile"}
              </p>
              {profile.organizationName && (
                <p className="mt-1 text-[0.98rem] text-white/50">
                  {profile.organizationName}
                </p>
              )}
              {profile.bio && (
                <p className="mt-7 max-w-[75%] text-[0.95rem] leading-7 text-white/78">
                  {profile.bio}
                </p>
              )}
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2 text-[0.88rem] text-white/82">
                {contactItems.slice(0, 3).map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/5 px-4 py-5 text-right">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-white/45">
                  DSCC
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "corporate-wave-blue":
      return (
        <div className="relative min-h-[380px] overflow-hidden rounded-[36px] bg-white shadow-[0_16px_45px_rgba(15,79,168,0.12)]">
          <div className="absolute inset-y-0 left-0 w-[47%] rounded-r-[120px] bg-[#0f4fa8]" />
          <div className="absolute inset-y-0 left-[27%] w-12 rounded-r-[48px] bg-white" />
          <div className="relative z-10 flex h-full">
            <div className="flex w-[52%] flex-col justify-center px-8 text-white">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-blue-100/75">
                Professional Profile
              </p>
              <h3 className="mt-4 text-[2.2rem] font-bold leading-[1.02] tracking-[-0.04em]">
                {profile.fullName}
              </h3>
              <p className="mt-3 text-[1.05rem] text-blue-100">
                {profile.title || "Professional Profile"}
              </p>
            </div>

            <div className="ml-auto flex w-[40%] flex-col justify-center px-7 text-[#111827]">
              {profile.organizationName && (
                <p className="text-[1.2rem] font-semibold leading-tight">
                  {profile.organizationName}
                </p>
              )}
              <div className="mt-6 space-y-2 text-[0.9rem] text-slate-600">
                {contactItems.slice(0, 4).map((item) => (
                  <p key={item} className="line-clamp-1">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "crimson-arc":
      return (
        <div className="relative min-h-[380px] overflow-hidden rounded-[36px] bg-[#f8fafc] shadow-[0_18px_45px_rgba(220,38,38,0.12)]">
          <div className="absolute right-0 top-0 h-full w-[42%] bg-[#31384b]" />
          <div className="absolute right-[24%] top-[-14%] h-[132%] w-24 rounded-full bg-[#ef1111]" />
          <div className="absolute right-[30%] top-[-10%] h-[118%] w-8 rounded-full bg-[#f8fafc]" />
          <div className="relative z-10 flex h-full items-center">
            <div className="w-[55%] px-8 text-[#111827]">
              <div className="mb-6 h-[3px] w-14 rounded-full bg-[#ef1111]" />
              <h3 className="text-[2.2rem] font-bold leading-[1.02] tracking-[-0.04em]">
                {profile.fullName}
              </h3>
              <p className="mt-3 text-[1.05rem] text-slate-600">
                {profile.title || "Professional Profile"}
              </p>

              <div className="mt-7 space-y-2 text-[0.9rem] text-slate-600">
                {contactItems.slice(0, 4).map((item) => (
                  <p key={item} className="line-clamp-1">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="ml-auto w-[28%] px-6 text-center text-white">
              <p className="text-[1.3rem] font-bold leading-tight">
                {profile.organizationName || "BUSINESS"}
              </p>
            </div>
          </div>
        </div>
      );

    case "minimal-white-editorial":
      return (
        <div className="min-h-[380px] rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="flex h-full flex-col justify-center">
            <h3 className="font-serif text-[2.35rem] font-bold leading-[1.04] tracking-[-0.03em] text-[#111111]">
              {profile.fullName}
            </h3>
            <p className="mt-3 text-[1.02rem] text-slate-600">
              {profile.title || "Professional Profile"}
            </p>
            <div className="mt-7 h-px w-24 bg-slate-300" />
            <div className="mt-7 space-y-2 text-[0.92rem] text-slate-500">
              {contactItems.slice(0, 4).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      );

    case "split-contrast":
      return (
        <div className="grid min-h-[380px] overflow-hidden rounded-[36px] shadow-[0_14px_35px_rgba(15,23,42,0.1)] md:grid-cols-2">
          <div className="flex flex-col justify-center bg-white px-8 py-10 text-[#111827]">
            <h3 className="text-[2.2rem] font-bold leading-[1.03] tracking-[-0.04em]">
              {profile.fullName}
            </h3>
            <p className="mt-3 text-[1rem] text-slate-600">
              {profile.title || "Professional Profile"}
            </p>
            {profile.organizationName && (
              <p className="mt-5 text-[0.9rem] text-slate-500">
                {profile.organizationName}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center bg-[#111111] px-8 py-10 text-white">
            <div className="space-y-2 text-[0.92rem] text-white/82">
              {contactItems.slice(0, 4).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      );

    case "glass-frost":
      return (
        <div className="min-h-[380px] rounded-[36px] bg-[linear-gradient(135deg,#ddd6fe_0%,#ffffff_35%,#cffafe_100%)] p-6 shadow-[0_16px_45px_rgba(139,92,246,0.14)]">
          <div className="h-full rounded-[30px] border border-white/60 bg-white/55 p-8 backdrop-blur-xl">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-500">
              {profile.profileType}
            </p>
            <h3 className="mt-4 text-[2.25rem] font-bold leading-[1.03] tracking-[-0.04em] text-slate-900">
              {profile.fullName}
            </h3>
            <p className="mt-3 text-[1rem] text-slate-600">
              {profile.title || "Professional Profile"}
            </p>

            {profile.bio && (
              <p className="mt-7 max-w-[80%] text-[0.95rem] leading-7 text-slate-600">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      );

    case "tech-grid-neon":
      return (
        <div className="relative min-h-[380px] overflow-hidden rounded-[36px] bg-[#020617] p-8 text-[#dbeafe] shadow-[0_18px_50px_rgba(2,6,23,0.45)]">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#22d3ee22_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee22_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-cyan-300">
                {profile.profileType}
              </p>
              <h3 className="mt-4 text-[2.25rem] font-bold leading-[1.03] tracking-[-0.04em] text-white">
                {profile.fullName}
              </h3>
              <p className="mt-3 text-[1rem] text-cyan-100">
                {profile.title || "Professional Profile"}
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3 py-1 text-[0.76rem] text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-[0.88rem] text-cyan-200/75">
                {contactItems.slice(0, 2).map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "official-clean":
      return (
        <div className="min-h-[380px] rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(29,78,216,0.08)]">
          <div className="h-full border-l-[5px] border-[#1d4ed8] pl-6">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#1d4ed8]">
              Official Profile
            </p>
            <h3 className="mt-4 text-[2.2rem] font-bold leading-[1.03] tracking-[-0.04em] text-slate-900">
              {profile.fullName}
            </h3>
            <p className="mt-3 text-[1rem] text-slate-600">
              {profile.title || "Professional Profile"}
            </p>
            {profile.organizationName && (
              <p className="mt-3 text-[0.92rem] text-slate-500">
                {profile.organizationName}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className="min-h-[380px] rounded-[36px] border border-slate-200 bg-white p-8">
          <h3 className="text-[2.2rem] font-bold text-slate-900">
            {profile.fullName}
          </h3>
          <p className="mt-3 text-[1rem] text-slate-600">
            {profile.title || "Professional Profile"}
          </p>
        </div>
      );
  }
}
