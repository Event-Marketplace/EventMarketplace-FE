// hooks/useEventGroup.ts
import { useEffect } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import { useSignalR } from "@/lib/signalR/SignalRProvider";

export const useEventGroup = (
  eventId: string,
  onComment: (eventId: string, comment: string, userId: string) => void
) => {
  const conn = useSignalR();

  useEffect(() => {
    if (!conn) return;

    const joinGroup = async () => {
      if (conn.state === HubConnectionState.Disconnected) {
        await conn.start();
      }
      await conn.invoke("JoinEventGroup", eventId);

      conn.on("ReceiveComment", onComment);
    };

    joinGroup();

    return () => {
      if (conn) {
        conn.off("ReceiveComment", onComment);
        conn.invoke("LeaveEventGroup", eventId).catch(() => {});
      }
    };
  }, [conn, eventId]);
};
