'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@store/global/authStore';
import { useModalStore } from '@store/global/modal.store';
import { useNoticeStore } from '@domains/notice/store/NoticeStore';

interface PasswordFormProps {
  onSuccess?: () => void;
  returnTo?: 'write' | 'detail';
}

export default function PasswordForm({ onSuccess }: PasswordFormProps) {
  const {
    password,
    passwordLoading: loading,
    passwordError: error,
    showPassword,
    setPassword,
    setShowPassword,
    submitPassword,
  } = useNoticeStore();

  const accessToken = useAuthStore((s) => s.accessToken);
  const setToken = useAuthStore((s) => s.setToken);
  const closeModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    if (accessToken) {
      closeModal();
      onSuccess?.();
    }
  }, [accessToken, closeModal, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submitPassword(setToken);
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[384px] mx-auto mt-[120px]">
      <h2 className="mb-[24px] text-[20px] font-bold text-gray-900">비밀번호 입력</h2>

      {error && (
        <div className="mb-[16px] p-[12px] bg-red-50 border border-red-200 rounded-lg text-red-700 text-[14px] font-medium animate-in fade-in">
          <div className="flex items-center gap-[8px]">
            <span className="text-[18px]">⚠️</span>
            {error}
          </div>
        </div>
      )}

      <div className="mb-[16px] relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          disabled={loading}
          className="w-full px-[16px] py-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3551A1] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !password.trim()}
        className="w-full py-[12px] px-[16px] bg-[#3551A1] hover:bg-[#2a3f7f] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-[8px]">
            <span className="inline-block animate-spin">⏳</span>
            확인 중...
          </span>
        ) : (
          '확인'
        )}
      </button>
    </form>
  );
}