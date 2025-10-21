'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@store/global/authStore';
import { useNoticeStore } from '@domains/notice/store/NoticeStore';
import { cn } from '@util/index';

interface NoticeDetailProps {
  noticeId: number;
  onBackClick?: () => void;
  onPrevClick?: (id: number) => void;
  onNextClick?: (id: number) => void;
  onAuthRequired?: () => void;
}

const styles = {
  button: {
    base: 'px-[24px] py-[8px] font-medium',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    edit: 'bg-blue-400 text-white hover:bg-blue-600',
    danger: 'bg-red-400 text-white hover:bg-red-600',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  },
};

export default function NoticeDetail({ 
  noticeId, 
  onBackClick, 
  onPrevClick,
  onNextClick,
  onAuthRequired
}: NoticeDetailProps) {
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((s) => s.accessToken);

  const {
    detail: notice,
    detailLoading: loading,
    detailError: error,
    isEditing,
    editTitle,
    editContent,
    setIsEditing,
    setEditTitle,
    setEditContent,
    fetchNoticeDetail,
    updateNotice,
    deleteNotice,
  } = useNoticeStore();

  useEffect(() => {
    fetchNoticeDetail(noticeId);
  }, [noticeId, fetchNoticeDetail]);

  useEffect(() => {
    if (searchParams.get('edit') === 'true' && accessToken) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [accessToken, searchParams, setIsEditing]);

  useEffect(() => {
    if (!searchParams.get('edit') && isEditing) {
      setIsEditing(false);
    }
  }, [searchParams, isEditing, setIsEditing]);

  const handleEditClick = () => {
  if (!accessToken) {
    onAuthRequired?.();
    return;
  }
  
  setIsEditing(true);
  
  const url = new URL(window.location.href);
  url.searchParams.set('edit', 'true');
  window.history.pushState({}, '', url.toString());
};

  const handleCancelEdit = () => {
  if (notice) {
    setEditTitle(notice.title);
    setEditContent(notice.content);
  }
  
  setIsEditing(false);
  
  const url = new URL(window.location.href);
  url.searchParams.delete('edit');
  window.history.pushState({}, '', url.toString());
};

  const handleUpdateNotice = async () => {
  if (!notice || !accessToken) return;
  
  if (!editTitle.trim()) {
    alert('제목을 입력해주세요.');
    return;
  }
  
  if (!editContent.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }

  const success = await updateNotice(notice.id, accessToken);
  if (success) {
    alert('공지사항이 수정되었습니다.');
    
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    window.history.pushState({}, '', url.toString());
  }
};

  const handleDeleteNotice = async () => {
    if (!notice || !accessToken) return;
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;

    const success = await deleteNotice(notice.id, accessToken);
    if (success) {
      alert('공지사항이 삭제되었습니다.');
      onBackClick?.();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className="py-[16px]">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-[8px] text-[24px] font-bold pb-[12px]"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-[12px] h-[256px] text-[18px] leading-relaxed"
          />
        </div>
      );
    }

    return (
      <div className="py-[32px]">
        <h2 className="text-[30px] font-bold pb-[16px] pl-[16px]">{notice!.title}</h2>
        <div className="flex justify-between items-center py-[16px] border-b border-[#929292]">
          <div className="text-gray-600">
            <span className="mr-[24px] pl-[16px]">작성일: {formatDate(notice!.createdAt)}</span>
            <span>수정일: {formatDate(notice!.updatedAt)}</span>
          </div>
        </div>
        <div className="py-[24px] text-[18px] leading-relaxed whitespace-pre-wrap pl-[16px]">
          {notice!.content}
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <div className="flex justify-center gap-[12px] py-[48px]">
          <button
            onClick={handleUpdateNotice}
            className={cn(styles.button.base, styles.button.primary)}
          >
            수정 완료
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={cn(styles.button.base, styles.button.secondary)}
          >
            취소
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-center gap-[12px] py-[48px]">
        <button
          onClick={handleEditClick}
          className={cn(styles.button.base, styles.button.edit)}
        >
          수정
        </button>
        <button
          onClick={onBackClick}
          className={cn(styles.button.base, styles.button.secondary)}
        >
          목록으로
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full px-[450px] py-[60px]">
        <div className="text-center py-8">로딩 중...</div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="w-full px-[450px] py-[60px]">
        <div className="text-center py-8 text-red-600">
          {error || '공지사항을 불러올 수 없습니다.'}
        </div>
        <button
          onClick={onBackClick}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-[48px] font-bold text-center pt-[72px] pb-[104px]">
        공지사항
      </h1>

      <div className="flex flex-col space-y-[48px] border-t-[2px] border-[#929292]">

          {renderContent()}

          <div className="border-t border-[#929292]">
            {notice.prevNotice && (
              <div
                className="flex items-center border-b border-[#929292] py-[12px] hover:bg-gray-50 cursor-pointer"
                onClick={() => onPrevClick?.(notice.prevNotice!.id)}
              >
                <span className="text-gray-600 pr-[16px] pl-[16px]">이전글</span>
                <span className="flex-1">{notice.prevNotice.title}</span>
              </div>
            )}
            {notice.nextNotice && (
              <div
                className="flex items-center py-[12px] hover:bg-gray-50 cursor-pointer"
                onClick={() => onNextClick?.(notice.nextNotice!.id)}
              >
                <span className="text-gray-600 pl-[16px] pr-[16px]">다음글</span>
                <span className="flex-1">{notice.nextNotice.title}</span>
              </div>
            )}
          </div>

        {renderActionButtons()}
      </div>
    </div>
  );
}
