import AuthGlobalLayout from "@/components/layout/protected/AuthGlobalLayout";
import GlobalLayout from "@/components/layout/public/GlobalLayout";
import { CheckAuthorization } from "@/services/checkAutorization";
import ProtectedLayout from "../../layout";
import CreateEventView from "@/components/protected/events/create/CreateEventView";

export default async function CreateEvent() {
  await CheckAuthorization();

  return <CreateEventView />;
}
