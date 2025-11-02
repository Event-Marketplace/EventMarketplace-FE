import GlobalLayout from "@/components/layout/GlobalLayout";
import { CheckAuthorization } from "@/services/checkAutorization";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelOrg from "./components/PanelOrg";

export default async function OrganizerPanelRoute() {
  await CheckAuthorization();

  return (
    <GlobalLayout>
      <PanelOrg />
    </GlobalLayout>
  );
}
