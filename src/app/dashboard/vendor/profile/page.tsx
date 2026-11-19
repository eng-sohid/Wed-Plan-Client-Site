import ProfileForm from "../../../components/dashboard/profile-form";
import { PageTitle } from "../../../components/shared/page-title";

export default function VendorProfilePage() {
  return (
    <div>
      <PageTitle
        title="Profile Settings"
        subtitle="Update your personal and business information"
      />
      <ProfileForm />
    </div>
  );
}
