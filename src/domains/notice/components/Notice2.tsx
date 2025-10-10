// 공지사항 작성 컴포넌트

'use client';

import { useState } from 'react';

interface Notice2Props {
  onBackClick?: () => void;
}

export default function Notice2({ onBackClick }: Notice2Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('PW:', password);
    // 여기서 API 호출 또는 상위 컴포넌트 전달 가능
  };

  const handleDelete = () => {
    setTitle('');
    setContent('');
    setPassword('');
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-5xl font-bold text-center mt-18">공지사항</h1>

      <div className="border-t-3 border-gray-300 mt-40" />

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg py-2 mt-1 mb-1 focus:outline-none ml-4"
      />

      <hr className="border-1 border-gray-200" />

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-140 p-4 mt-3 mb-6 text-lg resize-none focus:outline-none"
      />

      <hr className="border-1 border-gray-200 mb-4" />

      <div className="flex items-center w-full justify-between mb-30">
        <div className="flex items-center gap-2">
          <label className="font-medium">PW<span className="text-red-500">*</span></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-2 h-8 ml-2"
          />
          <span className="text-red-500 ml-2">자동 잠금</span>
        </div>

        <div className="flex gap-2 mr-2">
          <button
            onClick={handleDelete}
            className="w-22 h-7 border-2 border-gray-300 text-gray-400 hover:bg-gray-100"
          >
            삭 제
          </button>
          <button
            onClick={handleSubmit}
            className="w-22 h-7 bg-blue-200 border-2 border-blue-800 text-blue-800 font-medium hover:bg-blue-300"
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
