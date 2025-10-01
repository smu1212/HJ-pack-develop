'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setToken: (token) => set({ accessToken: token }),
      clearToken: () => set({ accessToken: null }),
    }),
    { name: 'hj-pack', storage: createJSONStorage(() => sessionStorage) },
  ),
);
