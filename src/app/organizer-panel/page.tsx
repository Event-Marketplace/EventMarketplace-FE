import GlobalLayout from "@/components/layout/GlobalLayout";
import { CheckAuthorization } from "@/services/checkAutorization";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrganizerPanelRoute() {
  await CheckAuthorization();

  return (
    <GlobalLayout>
      <div>Tutaj będzie panel organizatora</div>
    </GlobalLayout>
  );
}
