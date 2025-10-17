'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PasswordForm from '@domains/notice/components/PasswordForm';
import NoticeList from '@domains/notice/components/NoticeList';
import NoticeWrite from '@domains/notice/components/NoticeWrite';
import NoticeDetail from '@domains/notice/components/NoticeDetail';
import { useAuthStore } from '@store/global/authStore';
import Header from '@comp/Header';
import Footer from '@comp/Footer';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((s) => s.accessToken);

  const view = searchParams.get('step') as 'list' | 'password' | 'write' | 'detail' || 'list';
  const noticeId = searchParams.get('id') ? Number(searchParams.get('id')) : null;



  const goStep = (step: 'list' | 'password' | 'write' | 'detail', id?: number, edit?: boolean) => {
    const params = new URLSearchParams();
    params.set('step', step);
    if (id) params.set('id', String(id));
    if (edit) params.set('edit', 'true');
    router.push(`?${params.toString()}`);
  };

  const handleWriteClick = () => {
    if (accessToken) {
      goStep('write');
    } else {
      router.push(`?step=password&returnTo=write`);
    }
  };

  const handlePasswordSuccess = () => {
    const returnTo = searchParams.get('returnTo') as 'write' | 'detail' | null;
    if (returnTo === 'write') {
      goStep('write');
    } else if (returnTo === 'detail') {
      const noticeId = searchParams.get('noticeId');
      const params = new URLSearchParams();
      params.set('step', 'detail');
      params.set('id', String(noticeId));
      params.set('edit', 'true');
      router.replace(`?${params.toString()}`);
    } else {
      goStep('write');
    }
  };

  const handleDetailAuthRequired = () => {
    const params = new URLSearchParams();
    params.set('step', 'password');
    params.set('returnTo', 'detail');
    params.set('noticeId', String(noticeId));
    router.replace(`?${params.toString()}`);
  };

  const handleAddNotice = (newNotice: { title: string; content: string }) => {
    console.log('새 공지사항:', newNotice);
    goStep('list');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[120px]">
        {view === 'list' && (
          <NoticeList 
            onWriteClick={handleWriteClick}
            onDetailClick={(id) => goStep('detail', id)}
          />
        )}
        {view === 'password' && (
          <PasswordForm onSuccess={handlePasswordSuccess} />
        )}
        {view === 'write' && (
          <NoticeWrite 
            onBackClick={() => goStep('list')}
            onAddNotice={handleAddNotice}
            accessToken={accessToken}
          />
        )}
        {view === 'detail' && (
          <NoticeDetail 
            noticeId={noticeId || 0}
            onBackClick={() => goStep('list')}
            onPrevClick={(id) => goStep('detail', id)}
            onNextClick={(id) => goStep('detail', id)}
            onAuthRequired={handleDetailAuthRequired}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}