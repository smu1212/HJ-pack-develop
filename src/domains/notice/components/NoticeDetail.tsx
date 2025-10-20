'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@store/global/authStore';
import { useNoticeStore } from '@domains/notice/store/NoticeStore';

interface NoticeDetailProps {
  noticeId: number;
  onBackClick?: () => void;
  onPrevClick?: (id: number) => void;
  onNextClick?: (id: number) => void;
  onAuthRequired?: () => void;
}

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
  };

  const handleDeleteClick = () => {
    if (!accessToken) {
      onAuthRequired?.();
      return;
    }
    handleDeleteNotice();
  };

  const handleUpdateNotice = async () => {
    if (!notice || !accessToken) return;

    const success = await updateNotice(notice.id, accessToken);
    if (success) {
      alert('공지사항이 수정되었습니다.');
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
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-[48px] font-bold text-center mt-[72px]">공지사항</h1>

      <div className="border-t-[2px] border-gray-300 mt-[160px]" />

      <div className="mt-[32px]">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-[8px] text-[24px] font-bold mb-[16px]"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-[12px] h-[256px] text-[18px] leading-relaxed"
            />
          </>
        ) : (
          <>
            <h2 className="text-[30px] font-bold mb-[16px]">{notice.title}</h2>
            <div className="flex justify-between items-center py-[16px] border-b border-gray-300">
              <div className="text-gray-600">
                <span className="mr-[24px]">작성일: {formatDate(notice.createdAt)}</span>
                <span>수정일: {formatDate(notice.updatedAt)}</span>
              </div>
            </div>
            <div className="mt-[32px] mb-[32px] text-[18px] leading-relaxed whitespace-pre-wrap">
              {notice.content}
            </div>
          </>
        )}

        {notice.images && notice.images.length > 0 && !isEditing && (
          <div className="mt-[32px] mb-[32px]">
            <h3 className="text-[20px] font-bold mb-[16px]">첨부 이미지</h3>
            <div className="grid grid-cols-2 gap-[16px]">
              {notice.images.map((image) => (
                <div key={image.id} className="border border-gray-300 rounded overflow-hidden">
                  <img src={image.url} alt="공지사항 이미지" className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-300 mt-[32px] mb-[32px]">
          {notice.prevNotice && (
            <div
              className="flex items-center py-[12px] border-b border-gray-200 hover:bg-gray-10 cursor-pointer"
              onClick={() => onPrevClick?.(notice.prevNotice!.id)}
            >
              <span className="text-gray-600 mr-[16px]">이전글</span>
              <span className="flex-1">{notice.prevNotice.title}</span>
            </div>
          )}
          {notice.nextNotice && (
            <div
              className="flex items-center py-[12px] hover:bg-gray-10 cursor-pointer"
              onClick={() => onNextClick?.(notice.nextNotice!.id)}
            >
              <span className="text-gray-600 mr-[16px]">다음글</span>
              <span className="flex-1">{notice.nextNotice.title}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-[12px] mt-[48px] mb-[112px]">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateNotice}
              className="px-[24px] py-[8px] bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              수정 완료
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-[24px] py-[8px] bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="px-[24px] py-[8px] bg-blue-400 text-white font-medium rounded hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-[24px] py-[8px] bg-red-400 text-white font-medium rounded hover:bg-red-600"
            >
              삭제
            </button>
            <button
              onClick={onBackClick}
              className="px-[24px] py-[8px] bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
            >
              목록으로
            </button>
          </>
        )}
      </div>
    </div>
  );
}