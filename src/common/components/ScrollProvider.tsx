'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

// URL 쿼리 파라미터(section)에 따라 해당 섹션으로 스크롤 이동

export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sectionId = searchParams.get('section');

    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const timeoutId = setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchParams]);

  return <>{children}</>;
}
