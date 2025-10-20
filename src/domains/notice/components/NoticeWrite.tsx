'use client';

import { useState } from 'react';
import { useNoticeStore } from '@domains/notice/store/NoticeStore';

interface NoticeWriteProps {
  onBackClick?: () => void;
  onAddNotice?: (notice: { title: string; content: string }) => void;
  accessToken?: string | null;
}

// 재사용 가능한 스타일 정의
const styles = {
  container: 'w-full px-[450px] py-[60px]',
  title: 'text-[48px] font-bold text-center mt-[72px]',
  divider: {
    top: 'border-t-[2px] border-[#929292] mt-[160px]',
    thin: 'h-[1px] border-[#929292]',
  },
  input: {
    title: 'w-full text-[18px] py-[8px] mt-[4px] mb-[4px] focus:outline-none ml-[16px]',
    textarea: 'w-full h-[560px] p-[16px] mt-[12px] mb-[24px] text-[18px] resize-none focus:outline-none',
    password: 'border border-[#929292] w-[200px] h-[32px] ml-[12px] hover:border-[#355194]',
  },
  border: {
    primary: 'border-[#929292]',
    active: 'border-[#355194]',
  },
  text: {
    primary: 'text-[#929292]',
    active: 'text-[#355194]',
    danger: 'text-[#d50000]',
    error: 'text-[#ff0000]',
  },
  button: {
    base: 'w-[96px] h-[32px] border-[2px] disabled:opacity-50',
    delete: 'border-[#929292] text-[#929292] hover:bg-gray-100',
    submit: 'bg-[#d6e4ff] border-[#355194] text-[#355194] font-medium hover:bg-blue-300',
  },
  spacing: {
    mb16: 'mb-[16px]',
    mt24: 'mt-[24px]',
    mb160: 'mb-[160px]',
  },
  error: 'mb-[16px] p-[12px] bg-red-100 text-red-700 rounded',
};

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

  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!accessToken) {
      alert('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
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
    setPassword('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>공지사항</h1>

      <div className={styles.divider.top} />

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setWriteTitle(e.target.value)}
        className={styles.input.title}
        disabled={loading}
      />

      <hr className={styles.divider.thin} />

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setWriteContent(e.target.value)}
        className={styles.input.textarea}
        disabled={loading}
      />

      <hr className={`${styles.divider.thin} ${styles.spacing.mb16}`} />

      <div className={`flex items-center w-full justify-between ${styles.spacing.mb160} ${styles.spacing.mt24}`}>
        <div className="flex items-center">
          <label className="ml-[16px] mr-[8x] font-medium" htmlFor="pw-input">
            <span className="text-black">PW</span>
            <span className={styles.text.danger}>*</span>
          </label>
          <input
            id="pw-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input.password}
            disabled={loading}
          />
          <span className={`ml-[16px] ${styles.text.error}`}>자동 잠금</span>
        </div>

        <div className="flex gap-[8px]">
          <button
            onClick={handleDelete}
            className={`${styles.button.base} ${styles.button.delete}`}
            disabled={loading}
          >
            삭 제
          </button>
          <button
            onClick={handleSubmit}
            className={`${styles.button.base} ${styles.button.submit}`}
            disabled={loading}
          >
            {loading ? '저장 중...' : '글쓰기'}
          </button>
        </div>
      </div>
    </div>
  );
}