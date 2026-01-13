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

  // join / leave group
  useEffect(() => {
    if (!conn || conn.state !== "Connected") return;

    conn.invoke("JoinEventGroup", eventId);
    return () => {
      conn.invoke("LeaveEventGroup", eventId);
    };
  }, [conn, eventId]);

  // receive comment
  useEffect(() => {
    if (!conn) return;

    const onReceiveComment = (id: string, comment: EventComment) => {
      if (id !== eventId) return;

      setComments(prev => [
        ...prev,
        {
          ...comment,
          wasRead: comment.userId === userId,
        },
      ]);
    };

    conn.on("ReceiveComment", onReceiveComment);
    return () => conn.off("ReceiveComment", onReceiveComment);
  }, [conn, eventId, userId]);

  const markAsRead = () => {
    setComments(prev =>
      prev.map(c =>
        c.userId !== userId ? { ...c, wasRead: true } : c
      )
    );

    conn?.invoke("ReadComments", eventId);
  };

  const addComment = async (content: string, context?: string | null) => {
    await conn?.invoke("AddComment", eventId, content, context);
  };

  const unReadCount = comments.filter(
    c => !c.wasRead && c.userId !== userId
  ).length;

  return {
    comments,
    unReadCount,
    addComment,
    markAsRead,
  };
};
