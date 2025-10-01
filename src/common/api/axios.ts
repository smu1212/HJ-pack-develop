import axios from 'axios';

import { useAuthStore } from '@store/global/authStore';
import { useModalStore } from '@store/global/modal.store';

// 공용 axios 인스턴스

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

/* 요청 인터셉터 
토큰이 있을 때 Authorization 헤더 자동으로 붙음
/signin 요청은 토큰 필요 없어서 제외
*/

api.interceptors.request.use((config) => {
  const isSignIn = (config.url ?? '').includes('/signin');
  if (!isSignIn) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }
  }
  return config;
});

/* 응답 인터셉터
401일 때 토큰 삭제 + 재인증 모달 오픈
*/

let authModalLock = false;
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      useAuthStore.getState().clearToken();
      if (!authModalLock) {
        authModalLock = true;
        useModalStore.getState().openModal('auth');
        setTimeout(() => (authModalLock = false), 500);
      }
    }

    return Promise.reject(err);
  },
);
