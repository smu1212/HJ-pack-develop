'use client';

import { useAuthStore } from '@store/global/authStore';
import { useModalStore } from '@store/global/modal.store';

import Modal from '@comp/ui/modal';

import PasswordForm from '@domains/notice/components/PasswordForm';

export default function Page() {
  const { isOpen, type, openModal, closeModal } = useModalStore();
  const accessToken = useAuthStore((s) => s.accessToken);
  const clearToken = useAuthStore((s) => s.clearToken);

  const isAuthOpen = isOpen && type === 'auth';

  return (
    <div className='space-y-[20px] p-[40px]'>
      <p>현재 토큰: {accessToken ?? '없음'}</p>

      <button
        type='button'
        className='cursor-pointer rounded bg-[#3551A1] px-[16px] py-[8px] text-white'
        onClick={() => openModal('auth')}
      >
        토큰 발급
      </button>

      <button
        type='button'
        className='ml-[8px] cursor-pointer rounded bg-[#b5b5b5] px-[16px] py-[8px] text-white'
        onClick={() => clearToken()}
      >
        토큰 삭제
      </button>

      {/* 모달 렌더링 */}
      {isAuthOpen && (
        <Modal isOpen={isAuthOpen} onClose={closeModal}>
          <PasswordForm />
        </Modal>
      )}
    </div>
  );
}
