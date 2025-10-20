'use client';

import { useNoticeStore } from '@domains/notice/store/NoticeStore';

interface NoticeWriteProps {
  onBackClick?: () => void;
  onAddNotice?: (notice: { title: string; content: string }) => void;
  accessToken?: string | null;
}

export default function NoticeWrite({ onBackClick, onAddNotice, accessToken }: NoticeWriteProps) {
  const {
    writeTitle: title,
    writeContent: content,
    writeLoading: loading,
    writeError: error,
    setWriteTitle,
    setWriteContent,
    createNotice,
    clearWriteForm,
  } = useNoticeStore();

  const handleSubmit = async () => {
    if (!accessToken) {
      alert('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    const success = await createNotice(accessToken);
    if (success) {
      onAddNotice?.({ title, content });
      onBackClick?.();
    }
  };

  const handleDelete = () => {
    clearWriteForm();
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-[48px] font-bold text-center mt-[72px]">공지사항</h1>

      <div className="border-t-[3px] border-gray-300 mt-[160px]" />

      {error && (
        <div className="mb-[16px] p-[12px] bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setWriteTitle(e.target.value)}
        className="w-full text-[18px] py-[8px] mt-[4px] mb-[4px] focus:outline-none ml-[16px]"
        disabled={loading}
      />

      <hr className="border-[1px] border-gray-200" />

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setWriteContent(e.target.value)}
        className="w-full h-[560px] p-[16px] mt-[12px] mb-[24px] text-[18px] resize-none focus:outline-none"
        disabled={loading}
      />

      <hr className="border-[1px] border-gray-200 mb-[16px]" />

      <div className="flex items-center w-full justify-between mb-[160px]">
        <div className="flex gap-[8px] mr-[8px] ml-auto">
          <button
            onClick={handleDelete}
            className="w-[96px] h-[32px] border-[2px] border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-50"
            disabled={loading}
          >
            삭 제
          </button>
          <button
            onClick={handleSubmit}
            className="w-[96px] h-[32px] bg-blue-100 border-[2px] border-blue-800 text-blue-800 font-medium hover:bg-blue-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '저장 중...' : '글쓰기'}
          </button>
        </div>
      </div>
    </div>
  );
}