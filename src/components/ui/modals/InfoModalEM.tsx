import { useEffect, useState } from "react";
import { Button } from "../button";

type ModalProps = {
  children: React.ReactNode;
  onCancel: () => void;
  setOpen: boolean;
  actionBtn?: boolean;
  formId?: string;
};

const InfoModalEM = ({
  children,
  onCancel,
  setOpen,
  actionBtn,
  formId,
}: ModalProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(setOpen);
  }, [setOpen]);

  if (visible) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onCancel}
        ></div>
        <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="text-gray-700">{children}</div>
          <div
            className={`flex ${
              actionBtn ? "justify-between" : "justify-end"
            }  gap-2 mt-6`}
          >
            <Button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg hover:cursor-pointer border border-black-700 bg-gray-100 hover:bg-gray-200 transition text-black"
            >
              Zamknij
            </Button>
            {actionBtn && (
              <Button
                type="submit"
                form={formId}
                className="px-4 py-2 rounded-lg hover:cursor-pointer border border-black-700 bg-blue-300 hover:bg-blue-400 transition text-black"
              >
                Potwierdź
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default InfoModalEM;
