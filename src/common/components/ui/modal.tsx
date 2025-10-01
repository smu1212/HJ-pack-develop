'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (typeof window === 'undefined' || !isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50'
      onClick={onClose}
    >
      <div
        className='w-full max-w-[400px] rounded-[14px] bg-white p-[30px]'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
