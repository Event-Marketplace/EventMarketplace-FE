"use client";

import SideModalEM from "@/components/ui/modals/SideModalEM";
import { EventComment } from "./AdminEventList";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";
import { Field, Form, Formik, useFormikContext } from "formik";
import { textarea } from "framer-motion/client";
import InputEM from "@/components/ui/InputEM";
import { useEffect, useRef, useState } from "react";

type CommentSideModalProps = {
  comments: EventComment[];
  open: boolean;
  onClose: () => void;
  onCreateComment: (comment: string) => Promise<void>;
  onSuccess?: () => void;
  formId: string;
};

const CommentSideModal = ({
  comments,
  open,
  onClose,
  onCreateComment,
  onSuccess,
  formId,
}: CommentSideModalProps) => {
  const currentUserId = useSelector((state: AppState) => state.auth.userId);

  useEffect(() => {
    if (open) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments, open]);

  const commentsEndRef = useRef<HTMLDivElement>(null);

  return (
    <SideModalEM
      isOpen={open}
      title="Wiadomości"
      visibleCancelBtn
      visibleConfirmBtn
      cancelText="Cofnij"
      confirmText="Utwórz komentarz"
      onCancel={onClose}
      formId={formId}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-3 w-full overflow-y-auto">
          {comments.map((item, index) => (
            <div className="flex flex-col gap-3 w-full" key={index}>
              <div
                className={`flex ${
                  currentUserId === item.userId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col max-w-[70%] rounded-xl p-3 ${
                    currentUserId === item.userId
                      ? "bg-blue-200"
                      : "bg-gray-300"
                  }`}
                >
                  <p className="text-md">{item.content}</p>

                  <span className="mt-1 text-sm text-gray-500 text-right">
                    {item.user}, {item.createdAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={commentsEndRef}></div>
        </div>

        <div className="mt-5">
          <Formik
            initialValues={{ comment: "" }}
            onSubmit={(values, { setFieldValue }) => {
              onCreateComment(values.comment);
              setFieldValue("comment", "");
              if (onSuccess) {
                onSuccess();
              }
            }}
          >
            <Form id={formId} className="border">
              <Field
                as={InputEM}
                type="text"
                name="comment"
                textarea
                height={100}
                placeholder="Wpisz komentarz"
              />
            </Form>
          </Formik>
        </div>
      </div>
    </SideModalEM>
  );
};

export default CommentSideModal;
