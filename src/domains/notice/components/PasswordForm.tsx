'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@store/global/authStore';
import { useModalStore } from '@store/global/modal.store';
import { useNoticeStore } from '@domains/notice/store/NoticeStore';
import { cn } from '@util/index';

interface PasswordFormProps {
  onSuccess?: () => void;
  returnTo?: 'write' | 'detail';
}

const styles = {
  form: 'w-full max-w-[384px] mx-auto mt-[120px]',
  title: 'mb-[24px] text-[20px] font-bold text-gray-900',
  error: {
    container: 'mb-[16px] p-[12px] bg-red-50 border border-red-200 text-red-700 text-[14px] font-medium animate-in fade-in',
    content: 'flex items-center gap-[8px]',
    icon: 'text-[18px]',
  },
  input: {
    container: 'mb-[16px] relative',
    field: 'w-full px-[16px] py-[12px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3551A1] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed',
    toggleButton: 'absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50',
  },
  button: {
    submit: 'w-full py-[12px] px-[16px] bg-[#3551A1] hover:bg-[#2a3f7f] text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98',
    loading: 'flex items-center justify-center gap-[8px]',
    spinner: 'inline-block animate-spin',
  },
  spacing: {
    gap8: 'gap-[8px]',
  },
};

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

  const getInputType = () => {
    return showPassword ? 'text' : 'password';
  };

  const getToggleButtonLabel = () => {
    return showPassword ? '비밀번호 숨기기' : '비밀번호 보기';
  };

  const getToggleButtonIcon = () => {
    return showPassword ? '👁️' : '👁️‍🗨️';
  };

  const renderSubmitButtonContent = () => {
    if (loading) {
      return (
        <span className={styles.button.loading}>
          <span className={styles.button.spinner}>⏳</span>
          확인 중...
        </span>
      );
    }

    return '확인';
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>비밀번호 입력</h2>

      {error && (
        <div className={styles.error.container}>
          <div className={styles.error.content}>
            <span className={styles.error.icon}>⚠️</span>
            {error}
          </div>
        </div>
      )}

      <div className={styles.input.container}>
        <input
          type={getInputType()}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          disabled={loading}
          className={styles.input.field}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading}
          className={styles.input.toggleButton}
          aria-label={getToggleButtonLabel()}
        >
          {getToggleButtonIcon()}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !password.trim()}
        className={styles.button.submit}
      >
        {renderSubmitButtonContent()}
      </button>
    </form>
  );
}