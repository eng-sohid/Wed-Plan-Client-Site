import { UserRound, ShieldCheck } from "lucide-react";

import ProfileForm from "../../../components/dashboard/profile-form";
import { PageTitle } from "../../../components/shared/page-title";

export default function CustomerProfilePage() {
  return (
    <div className="space-y-7">
      <PageTitle
        title="Profile Settings"
        subtitle="Manage your personal information and account details."
      />

      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#20211e]">
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5 sm:px-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d8b68c]/10 text-[#d8b68c]">
            <UserRound size={21} />
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-[#faf9f6]">
              Personal Information
            </h2>
            <p className="text-xs text-white/40">
              Keep your profile information up to date.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <ProfileForm />
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#d8b68c]/15 bg-[#d8b68c]/[0.05] p-4">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#d8b68c]" />

        <div>
          <h3 className="text-sm font-semibold text-[#d8b68c]">
            Your account security
          </h3>
          <p className="mt-1 text-xs leading-5 text-white/45">
            Keep your personal information accurate to make managing your
            wedding bookings easier.
          </p>
        </div>
      </div>
    </div>
  );
}
