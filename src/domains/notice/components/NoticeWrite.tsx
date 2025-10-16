'use client';

import { useState } from 'react';

interface NoticeWriteProps {
  onBackClick?: () => void;
  onAddNotice?: (notice: { title: string; content: string }) => void;
  accessToken?: string | null; // ✅ accessToken 추가
}

export default function Notice2({ onBackClick, onAddNotice, accessToken }: NoticeWriteProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = () => accessToken;

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      const token = getAccessToken();
      if (!token) throw new Error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');

      const response = await fetch('https://api.dev.hj-pack.eoe.sh/notice', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || '공지사항 생성에 실패했습니다.');
      }

      const data = await response.json();
      onAddNotice?.(data);
      handleDelete();
      onBackClick?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setTitle('');
    setContent('');
    setError(null);
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-5xl font-bold text-center mt-18">공지사항</h1>

      <div className="border-t-3 border-gray-300 mt-40" />

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg py-2 mt-1 mb-1 focus:outline-none ml-4"
        disabled={loading}
      />

      <hr className="border-1 border-gray-200" />

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-140 p-4 mt-3 mb-6 text-lg resize-none focus:outline-none"
        disabled={loading}
      />

      <hr className="border-1 border-gray-200 mb-4" />

      <div className="flex items-center w-full justify-between mb-40">
        <div className="flex gap-2 mr-2 ml-auto">
          <button
            onClick={handleDelete}
            className="w-24 h-8 border-2 border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-50"
            disabled={loading}
          >
            삭 제
          </button>
          <button
            onClick={handleSubmit}
            className="w-24 h-8 bg-blue-100 border-2 border-blue-800 text-blue-800 font-medium hover:bg-blue-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '저장 중...' : '글쓰기'}
          </button>
        </div>
      </div>
    </div>
  );
}
