"use client";

import { useEffect, useState } from "react";
import ButtonEM from "../ButtonEM";

type SideModalProps = {
  children: React.ReactNode;
  title: string;
  visibleConfirmBtn: boolean;
  visibleCancelBtn: boolean;
  confirmText: string;
  cancelText: string;
  setOpen: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

const SideModalEM = ({
  children,
  title,
  visibleConfirmBtn,
  visibleCancelBtn,
  confirmText,
  cancelText,
  setOpen,
  onCancel,
  onSubmit,
}: SideModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(setOpen);
  }, [setOpen]);

  if (visible) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/40"
          //onClick={onClose} // kliknięcie w tło zamyka modal
        ></div>
        <div
          className="fixed top-0 right-0 p-5 flex flex-col gap-10 h-full w-1/3 bg-gray-200 z-999"
          role="dialog"
          aria-modal="true"
        >
          <p className="text-2xl text-center border-t border-b border-gray-400 italic">
            <strong> {title}</strong>
          </p>
          <div className="w-full overflow-auto">{children}</div>
          <div className="flex w-full justify-between border-t border-gray-400 pt-5 mt-auto">
            <ButtonEM
              type="button"
              kind="primary"
              text="Cofnij"
              onClick={onCancel}
            />
            <ButtonEM
              kind="primary"
              type="submit"
              text="Zapisz zmiany"
              form="edit-event-form"
            />
          </div>
        </div>
      </>
    );
  }
};

export default SideModalEM;
