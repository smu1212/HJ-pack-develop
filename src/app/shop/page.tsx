// shop 페이지

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// 페이지 임시 접근 차단 (스마트스토어 링크 연결 예정)

export default function Page() {
  const router = useRouter();
  const alerted = useRef(false);

  useEffect(() => {
    if (alerted.current) return;
    alerted.current = true;

    alert('해당 페이지는 현재 준비 중입니다.');
    router.replace('/');
  }, [router]);

  return null;
}
