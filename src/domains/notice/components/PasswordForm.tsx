'use client';

import { useState } from 'react';

import type { SignInResult } from '@api/auth.signin';

import { signIn } from '@api/auth.signin';
import { useAuthStore } from '@store/global/authStore';
import { useModalStore } from '@store/global/modal.store';

import { sha256Hex } from '@util/crypto';

export default function PasswordForm() {
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((s) => s.setToken);
  const closeModal = useModalStore((s) => s.closeModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashed = sha256Hex(password);
    const res: SignInResult = await signIn(hashed);

    if (res.status === 'success') {
      setToken(res.token);
      setPassword('');
      closeModal();
    } else {
      console.error(res.message);
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e).catch(console.error);
      }}
    >
      <p className='pb-[20px] text-[16px] font-bold'>비밀번호 입력</p>
      <input
        type='password'
        className='w-full rounded border px-[12px] py-[8px]'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='비밀번호'
      />
      <button
        type='submit'
        className='mt-[10px] w-full cursor-pointer rounded bg-[#3551A1] py-[8px] text-white'
      >
        확인
      </button>
    </form>
  );
}
