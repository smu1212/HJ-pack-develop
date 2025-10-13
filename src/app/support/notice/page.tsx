'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import PasswordForm from '@domains/notice/components/PasswordForm';
import Notice1 from '@domains/notice/components/Notice1';
import Notice2 from '@domains/notice/components/Notice2';
import Notice3 from '@domains/notice/components/Notice3';
import { useAuthStore } from '@store/global/authStore';
import Header from '@comp/Header';
import Footer from '@comp/Footer';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((s) => s.accessToken);

  const view = searchParams.get('step') as 'password' | 'list' | 'write' | 'detail' || 'password';
  const noticeId = searchParams.get('id') ? Number(searchParams.get('id')) : null;

  const goStep = (step: 'password' | 'list' | 'write' | 'detail', id?: number) => {
    const params = new URLSearchParams();
    params.set('step', step);
    if (id) params.set('id', String(id));
    // ✅ 현재 페이지 경로 유지하면서 쿼리만 변경
    router.push(`?${params.toString()}`);
  };

  const handleAddNotice = (newNotice: { title: string; content: string }) => {
    console.log('새 공지사항:', newNotice);
    goStep('list');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[120px]">
        {view === 'password' && <PasswordForm onSuccess={() => goStep('list')} />}
        {view === 'list' && <Notice1 
          onWriteClick={() => goStep('write')}
          onDetailClick={(id) => goStep('detail', id)}
        />}
        {view === 'write' && <Notice2 
          onBackClick={() => goStep('list')}
          onAddNotice={handleAddNotice}
          accessToken={accessToken}
        />}
        {view === 'detail' && <Notice3 
          noticeId={noticeId || 0}
          onBackClick={() => goStep('list')}
          onPrevClick={(id) => goStep('detail', id)}
          onNextClick={(id) => goStep('detail', id)}
        />}
      </main>
      <Footer />
    </div>
  );
}
