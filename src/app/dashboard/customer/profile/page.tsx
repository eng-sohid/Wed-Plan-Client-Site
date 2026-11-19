import ProfileForm from "../../../components/dashboard/profile-form";
import { PageTitle } from "../../../components/shared/page-title";

export default function CustomerProfilePage() {
  return (
    <div>
      <PageTitle
        title="Profile Settings"
        subtitle="Update your personal information"
      />
      <ProfileForm />
    </div>
  );
}
