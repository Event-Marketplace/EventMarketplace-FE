import { SignalRProvider } from "@/lib/signalR/SignalRProvider";
import OrganizerEventList from "./components/OrganizerEventList";

export default function OrganizerEvents() {
  return (
    <SignalRProvider>
      <OrganizerEventList />
    </SignalRProvider>
  );
}
