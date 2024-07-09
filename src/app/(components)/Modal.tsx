import React, { MouseEvent, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

export const Modal = ({ children, open, onClose }: ModalProps) => {
  if (!open) return null;

  const handleOnBackDropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "backdrop")
      onClose && onClose();
  };

  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20 inset-0 flex items-center justify-center"
    >
      {children}
    </div>
  );
};
