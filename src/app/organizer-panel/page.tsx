import GlobalLayout from "@/components/layout/GlobalLayout";
import { CheckTokenExist } from "@/services/checkTokenExist";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrganizerPanelRoute() {
  await CheckTokenExist();

  return (
    <GlobalLayout>
      <div>sss</div>
    </GlobalLayout>
  );
}
