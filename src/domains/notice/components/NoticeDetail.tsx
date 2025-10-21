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
  container: 'w-full px-[450px] py-[60px]',
  title: 'text-[48px] font-bold text-center mt-[72px]',
  border: {
    primary: 'border-[#929292]',
    top: 'border-t',
    bottom: 'border-b',
    divider: 'border-t-[2px] border-[#929292]',
  },
  input: {
    base: 'w-full border border-[#929292] rounded p-[8px]',
    title: 'text-[24px] font-bold mb-[16px]',
    textarea: 'p-[12px] h-[256px] text-[18px] leading-relaxed',
  },
  navigation: {
    item: 'flex items-center py-[12px] hover:bg-gray-10 cursor-pointer',
    label: 'text-gray-600 mr-[16px]',
    content: 'flex-1',
  },
  button: {
    base: 'px-[24px] py-[8px] font-medium',
    primary: 'bg-blue-400 text-white hover:bg-blue-600',
    success: 'bg-blue-500 text-white hover:bg-blue-600',
    danger: 'bg-red-400 text-white hover:bg-red-600',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  },
  spacing: {
    mt32: 'mt-[32px]',
    mb32: 'mb-[32px]',
    mt48: 'mt-[48px]',
    mb112: 'mb-[112px]',
    mt160: 'mt-[160px]',
  },
  text: {
    content: 'text-[18px] leading-relaxed',
    subtitle: 'text-[20px] font-bold mb-[16px]',
    detailTitle: 'text-[30px] font-bold mb-[16px]',
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
      <div className={styles.container}>
        <div className="text-center py-8">로딩 중...</div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className={styles.container}>
        <div className="text-center py-8 text-red-600">
          {error || '공지사항을 불러올 수 없습니다.'}
        </div>
        <button
          onClick={onBackClick}
          className={cn('mt-4 px-4 py-2', styles.button.secondary)}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>공지사항</h1>

      <div className={cn(styles.border.divider, styles.spacing.mt160)} />

      <div className={styles.spacing.mt32}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={cn(styles.input.base, styles.input.title)}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={cn(styles.input.base, styles.input.textarea)}
            />
          </>
        ) : (
          <>
            <h2 className={styles.text.detailTitle}>{notice.title}</h2>
            <div className={cn(
              'flex justify-between items-center py-[16px]',
              styles.border.bottom,
              styles.border.primary
            )}>
              <div className="text-gray-600">
                <span className="mr-[24px]">작성일: {formatDate(notice.createdAt)}</span>
                <span>수정일: {formatDate(notice.updatedAt)}</span>
              </div>
            </div>
            <div className={cn(
              styles.spacing.mt32,
              styles.spacing.mb32,
              styles.text.content,
              'whitespace-pre-wrap'
            )}>
              {notice.content}
            </div>
          </>
        )}

        {notice.images && notice.images.length > 0 && !isEditing && (
          <div className={cn(styles.spacing.mt32, styles.spacing.mb32)}>
            <h3 className={styles.text.subtitle}>첨부 이미지</h3>
            <div className="grid grid-cols-2 gap-[16px]">
              {notice.images.map((image) => (
                <div key={image.id} className={cn('border rounded overflow-hidden', styles.border.primary)}>
                  <img src={image.url} alt="공지사항 이미지" className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={cn(
          styles.border.top,
          styles.border.primary,
          styles.spacing.mt32,
          styles.spacing.mb32
        )}>
          {notice.prevNotice && (
            <div
              className={cn(
                styles.navigation.item,
                styles.border.bottom,
                styles.border.primary
              )}
              onClick={() => onPrevClick?.(notice.prevNotice!.id)}
            >
              <span className={styles.navigation.label}>이전글</span>
              <span className={styles.navigation.content}>{notice.prevNotice.title}</span>
            </div>
          )}
          {notice.nextNotice && (
            <div
              className={styles.navigation.item}
              onClick={() => onNextClick?.(notice.nextNotice!.id)}
            >
              <span className={styles.navigation.label}>다음글</span>
              <span className={styles.navigation.content}>{notice.nextNotice.title}</span>
            </div>
          )}
        </div>
      </div>

      <div className={cn('flex justify-center gap-[12px]', styles.spacing.mt48, styles.spacing.mb112)}>
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateNotice}
              className={cn(styles.button.base, styles.button.success)}
            >
              수정 완료
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={cn(styles.button.base, styles.button.secondary)}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className={cn(styles.button.base, styles.button.primary)}
            >
              수정
            </button>
            <button
              onClick={handleDeleteClick}
              className={cn(styles.button.base, styles.button.danger)}
            >
              삭제
            </button>
            <button
              onClick={onBackClick}
              className={cn(styles.button.base, styles.button.secondary)}
            >
              목록으로
            </button>
          </>
        )}
      </div>
    </div>
  );
}