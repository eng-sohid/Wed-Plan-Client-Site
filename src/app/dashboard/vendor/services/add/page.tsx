import ServiceForm from "../../../../components/dashboard/service-form";
import { PageTitle } from "../../../../components/shared/page-title";

export default function AddServicePage() {
  return (
    <div>
      <PageTitle
        title="Add Service"
        subtitle="New services are reviewed by an admin before going live"
      />
      <ServiceForm />
    </div>
  );
}
