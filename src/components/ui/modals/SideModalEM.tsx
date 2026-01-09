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
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onCancel} // kliknięcie w tło zamyka modal
      ></div>
      <div
        className="fixed top-0 right-0 p-5 flex flex-col gap-10 h-full w-1/3 bg-gray-200 z-999 max-w-[700px]"
        role="dialog"
        aria-modal="true"
      >
        <p className="text-3xl font-semibold text-center">{title}</p>
        <div className="w-full overflow-auto">{children}</div>
        <div className="flex w-full justify-between  pt-5 mt-auto">
          <ButtonEM
            type="button"
            kind="primary"
            text={cancelText}
            onClick={onCancel}
          />
          <ButtonEM
            kind="primary"
            type="submit"
            text={confirmText}
            form={formId}
          />
        </div>
      </div>
    </>
  );
};

export default SideModalEM;
