'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@store/global/authStore';
import { useModalStore } from '@store/global/modal.store';
import * as crypto from 'crypto';

interface PasswordFormProps {
  onSuccess?: () => void;
}

export default function PasswordForm({ onSuccess }: PasswordFormProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const accessToken = useAuthStore((s) => s.accessToken);
  const setToken = useAuthStore((s) => s.setToken);
  const closeModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    if (accessToken) {
      closeModal();
      onSuccess?.();
    }
  }, [accessToken, closeModal, onSuccess]);

  const sha256Hex = (str: string): string => {
    return crypto.createHash('sha256').update(str).digest('hex');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const hashed = sha256Hex(password);

      const response = await fetch('https://api.dev.hj-pack.eoe.sh/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: hashed }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || '로그인에 실패하였습니다.');
      }

      const data = await response.json();

      setToken(data.accessToken);
      setPassword('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-30">
      <h2 className="mb-6 text-xl font-bold text-gray-900 text-center">비밀번호 입력</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            {error}
          </div>
        </div>
      )}

      <div className="mb-4 relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3551A1] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !password.trim()}
        className="w-full py-3 px-4 bg-[#3551A1] hover:bg-[#2a3f7f] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
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