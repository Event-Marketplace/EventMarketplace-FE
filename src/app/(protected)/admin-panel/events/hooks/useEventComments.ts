import { useEffect, useState } from "react";
import { useSignalR } from "@/lib/signalR/SignalRProvider";
import { EventComment } from "@/app/(protected)/admin-panel/events/components/AdminEventList";

type UseEventCommentsProps = {
  eventId: string;
  initialComments?: EventComment[];
  userId: string;
};

export const useEventComments = ({
  eventId,
  initialComments = [],
  userId,
}: UseEventCommentsProps) => {
  const conn = useSignalR();
  const [comments, setComments] = useState<EventComment[]>(initialComments);

  // join / leave grupy
  useEffect(() => {
    if (!conn || conn.state !== "Connected") return;

    conn.invoke("JoinEventGroup", eventId);

    return () => {
      conn.invoke("LeaveEventGroup", eventId);
    };
  }, [conn, eventId]);

  // odbieranie nowych komentarzy
  useEffect(() => {
    if (!conn) return;

    const onReceiveComment = (receivedEventId: string, comment: EventComment) => {
      if (receivedEventId !== eventId) return;

      const updatedComment =
        comment.userId === userId ? comment : { ...comment, wasRead: false };

      setComments(prev => [...prev, updatedComment]);
    };

    conn.on("ReceiveComment", onReceiveComment);
    return () => conn.off("ReceiveComment", onReceiveComment);
  }, [conn, eventId, userId]);

  // odbieranie odczytania komentarzy
  useEffect(() => {
    if (!conn) return;

    const onCommentsRead = (receivedEventId: string) => {
      if (receivedEventId !== eventId) return;
      setComments(prev => prev.map(c => ({ ...c, wasRead: true })));
    };

    conn.on("CommentsRead", onCommentsRead);
    return () => conn.off("CommentsRead", onCommentsRead);
  }, [conn, eventId]);

  const addComment = async (content: string, context?: string | null) => {
    if (!conn) return;
    await conn.invoke("AddComment", eventId, content, context);
  };

  const markAsRead = async () => {
    if (!conn) return;
    setComments(prev => prev.map(c => ({ ...c, wasRead: true })));
    await conn.invoke("ReadComments", eventId);
  };

  const unReadCount = comments.filter(c => !c.wasRead && c.userId !== userId).length;

  return {
    comments,
    unReadCount,
    addComment,
    markAsRead,
  };
};
