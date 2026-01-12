"use client";

import { useEffect, useState } from "react";
import ButtonEM from "../ButtonEM";
import { form } from "framer-motion/client";

type SideModalProps = {
  children: React.ReactNode;
  title: string;
  visibleConfirmBtn: boolean;
  visibleCancelBtn: boolean;
  confirmText: string;
  cancelText: string;
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  formId?: string;
};

const SideModalEM = ({
  children,
  title,
  visibleConfirmBtn,
  visibleCancelBtn,
  confirmText,
  cancelText,
  isOpen,
  onCancel,
  onSubmit,
  formId,
}: SideModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40" onClick={onCancel} />

      <div
        className="fixed top-0 right-0 h-full w-1/3 max-w-[700px]
                   p-5 flex flex-col bg-gray-200 z-999"
        role="dialog"
        aria-modal="true"
      >
        <p className="text-3xl font-semibold text-center bg-gray-50 rounded-md mb-5 italic">
          {title}
        </p>

        <div className="flex-1 overflow-auto pt-5 pb-3">{children}</div>

        <div className="flex w-full justify-between pt-5 border border-t border-t-gray-300">
          {visibleCancelBtn && (
            <ButtonEM
              type="button"
              kind="primary"
              text={cancelText}
              onClick={onCancel}
            />
          )}

          {visibleConfirmBtn && (
            <ButtonEM
              kind="primary"
              type="submit"
              text={confirmText}
              form={formId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SideModalEM;
