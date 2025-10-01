'use client';

import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';

import ModalHost from '@comp/AuthModalHost';
import ScrollProvider from '@comp/ScrollProvider';

import { pretendard, suit } from '@common/font';
import ProviderWrapper from '@common/provider/provider-wrapper';

import '@styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} ${suit.variable}`}>
        <NextTopLoader
          color='#33aaff'
          height={4}
          shadow={false}
          showSpinner={false}
        />
        <ProviderWrapper>
          <Suspense>
            <ScrollProvider>
              {children}
              <ModalHost />
            </ScrollProvider>
          </Suspense>
        </ProviderWrapper>
      </body>
    </html>
  );
}
