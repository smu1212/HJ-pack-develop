'use client';

import { useState } from 'react';
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

  const setToken = useAuthStore((s) => s.setToken);
  const closeModal = useModalStore((s) => s.closeModal);

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
      closeModal();
      onSuccess?.(); // ✅ 성공 시 호출
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e).catch(console.error)}>
      <p className="pb-[20px] text-[16px] font-bold">비밀번호 입력</p>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <input
        type="password"
        className="w-full rounded border px-[12px] py-[8px]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        disabled={loading}
      />
      <button
        type="submit"
        className="mt-[10px] w-full cursor-pointer rounded bg-[#3551A1] py-[8px] text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '확인 중...' : '확인'}
      </button>
    </form>
  );
}
