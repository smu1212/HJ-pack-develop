'use client';

import { useModalStore } from '@store/global/modal.store';

import Modal from '@comp/ui/modal';

import PasswordForm from '@domains/notice/components/PasswordForm';

export default function AuthModalHost() {
  const { isOpen, type, closeModal } = useModalStore();

  // 전역 모달 렌더링 (layout.tsx)

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {type === 'auth' ? <PasswordForm /> : null}
    </Modal>
  );
}
