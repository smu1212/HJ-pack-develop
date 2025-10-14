'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@store/global/authStore';

interface Image {
  id: number;
  url: string;
  createdAt: string;
}

interface RelatedNotice {
  id: number;
  title: string;
}

interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  prevNotice: RelatedNotice | null;
  nextNotice: RelatedNotice | null;
}

interface Notice3Props {
  noticeId: number;
  onBackClick?: () => void;
  onPrevClick?: (id: number) => void;
  onNextClick?: (id: number) => void;
  onAuthRequired?: () => void;
}

export default function Notice3({ 
  noticeId, 
  onBackClick, 
  onPrevClick,
  onNextClick,
  onAuthRequired
}: Notice3Props) {
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    fetchNoticeDetail();
  }, [noticeId]);

  const fetchNoticeDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.dev.hj-pack.eoe.sh/notice/${noticeId}`
      );

      if (!response.ok) {
        throw new Error('공지사항을 불러오지 못했습니다.');
      }

      const data: NoticeDetail = await response.json();
      setNotice(data);
      setEditTitle(data.title);
      setEditContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
    if (!notice) return;

    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('content', editContent);
    formData.append('removeImage', 'true');

    try {
      const response = await fetch(`https://api.dev.hj-pack.eoe.sh/notice/${notice.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('공지사항 수정에 실패했습니다.');
      }

      const updated = await response.json();
      console.log('수정된 공지사항:', updated);

      await fetchNoticeDetail();
      setIsEditing(false);
      alert('공지사항이 수정되었습니다.');
    } catch (err) {
      alert(err instanceof Error ? err.message : '수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteNotice = async () => {
    if (!notice) return;
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`https://api.dev.hj-pack.eoe.sh/notice/${notice.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('공지사항 삭제에 실패했습니다.');
      }

      alert('공지사항이 삭제되었습니다.');
      onBackClick?.(); 
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.');
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
      <h1 className="text-5xl font-bold text-center mt-18">공지사항</h1>

      <div className="border-t-2 border-gray-300 mt-40" />

      <div className="mt-8">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-2xl font-bold mb-4"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-3 h-64 text-lg leading-relaxed"
            />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">{notice.title}</h2>
            <div className="flex justify-between items-center py-4 border-b border-gray-300">
              <div className="text-gray-600">
                <span className="mr-6">작성일: {formatDate(notice.createdAt)}</span>
                <span>수정일: {formatDate(notice.updatedAt)}</span>
              </div>
            </div>
            <div className="mt-8 mb-8 text-lg leading-relaxed whitespace-pre-wrap">
              {notice.content}
            </div>
          </>
        )}

        {notice.images && notice.images.length > 0 && !isEditing && (
          <div className="mt-8 mb-8">
            <h3 className="text-xl font-bold mb-4">첨부 이미지</h3>
            <div className="grid grid-cols-2 gap-4">
              {notice.images.map((image) => (
                <div key={image.id} className="border border-gray-300 rounded overflow-hidden">
                  <img src={image.url} alt="공지사항 이미지" className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-300 mt-8 pt-8">
          {notice.prevNotice && (
            <div
              className="flex items-center py-3 border-b border-gray-200 hover:bg-gray-10 cursor-pointer"
              onClick={() => onPrevClick?.(notice.prevNotice!.id)}
            >
              <span className="text-gray-600 mr-4">이전글</span>
              <span className="flex-1">{notice.prevNotice.title}</span>
            </div>
          )}
          {notice.nextNotice && (
            <div
              className="flex items-center py-3 hover:bg-gray-10 cursor-pointer"
              onClick={() => onNextClick?.(notice.nextNotice!.id)}
            >
              <span className="text-gray-600 mr-4">다음글</span>
              <span className="flex-1">{notice.nextNotice.title}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-12 mb-28">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateNotice}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              수정 완료
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="px-6 py-2 bg-blue-400 text-white font-medium rounded hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-6 py-2 bg-red-400 text-white font-medium rounded hover:bg-red-600"
            >
              삭제
            </button>
            <button
              onClick={onBackClick}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
            >
              목록으로
            </button>
          </>
        )}
      </div>
    </div>
  );
}