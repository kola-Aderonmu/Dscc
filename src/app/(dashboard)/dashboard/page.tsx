export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Overview</h2>
        <p className="mt-2 text-slate-500">
          This is your smart digital complementary card workspace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total Profiles</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">0</h3>
        </div>

        <div className="rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Active Cards</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">0</h3>
        </div>

        <div className="rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total Scans</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">0</h3>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No profile created yet
        </h3>
        <p className="mt-2 text-slate-500">
          Your first smart profile will appear here once we build the profile
          creation flow.
        </p>
      </div>
    </div>
  );
}
