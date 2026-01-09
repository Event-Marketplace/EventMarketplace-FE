"use client";

import SideModalEM from "@/components/ui/modals/SideModalEM";
import { EventComment } from "./AdminEventList";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

type CommentSideModalProps = {
  comments: EventComment[];
  open: boolean;
  onClose: () => void;
};

const CommentSideModal = ({
  comments,
  open,
  onClose,
}: CommentSideModalProps) => {
  const handleSubmit = () => {};

  const currentUserId = useSelector((state: AppState) => state.auth.userId);

  return (
    <SideModalEM
      isOpen={open}
      title="Komentarze"
      visibleCancelBtn
      visibleConfirmBtn
      cancelText="Cofnij"
      confirmText="Utwórz komentarz"
      onCancel={onClose}
      onSubmit={() => handleSubmit}
    >
      <div className="flex flex-col gap-3 overflow-auto w-full">
        {comments.map((item, index) => (
          <div className="flex flex-col gap-3 w-full">
            <div
              className={`flex ${
                currentUserId === item.userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col max-w-[70%] rounded-xl p-3 ${
                  currentUserId === item.userId ? "bg-blue-200" : "bg-gray-300"
                }`}
              >
                <p className="text-md">{item.content}</p>

                <span className="mt-1 text-xs text-gray-500 text-right">
                  {item.user}, {item.createdAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SideModalEM>
  );
};

export default CommentSideModal;
