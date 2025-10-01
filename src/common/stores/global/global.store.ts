'use client';

import { createStore } from 'zustand/vanilla';

interface GlobalState {}

interface GlobalActions {}
export type GlobalStore = GlobalState & GlobalActions;

export const globalStoreInitState: GlobalState = {};

export const createGlobalStore = (
  initState: GlobalState = globalStoreInitState,
) => {
  return createStore<GlobalStore>(() => ({
    ...initState,
  }));
};

export const sharedGlobalStore = createGlobalStore();
