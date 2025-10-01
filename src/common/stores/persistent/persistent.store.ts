/** DOC: 이 스토어는, 계속 값을 유지하고 있어야 하는 상태를 관리함. */
'use client';

import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

interface PersistentState {}

interface PersistentActions {}

export type PersistentStore = PersistentState & PersistentActions;

/** DOC: 초기 상태 */
export const PersistentStoreInitState: PersistentState = {};

export const createPersistentStore = (
  initState: PersistentState = PersistentStoreInitState,
) => {
  return createStore(
    persist<PersistentStore>(
      () => ({
        ...initState,
      }),
      {
        name: 'persistent-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};

export const sharedPersistentStore = createPersistentStore();
