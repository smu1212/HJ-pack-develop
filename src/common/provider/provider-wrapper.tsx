'use client';

import React from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { GlobalStoreProvider } from '@store/global/global.provider';
import { PersistentStoreProvider } from '@store/persistent/persistent.provider';
import { SessionStoreProvider } from '@store/session/session.provider';

import TanStackProvider from './tanstack.provider';

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 세션스토리지 스토어 provider */}
      <SessionStoreProvider>
        {/* 로컬스토리지 스토어 provider */}
        <PersistentStoreProvider>
          {/* 전역 스토어 provider */}
          <GlobalStoreProvider>
            {/* nuqs provider */}
            <NuqsAdapter>
              <TanStackProvider>{children}</TanStackProvider>
            </NuqsAdapter>
          </GlobalStoreProvider>
        </PersistentStoreProvider>
      </SessionStoreProvider>
    </>
  );
}
