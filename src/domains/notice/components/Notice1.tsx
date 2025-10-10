// 공지사항 목록 컴포넌트

'use client';

import { useState } from 'react';

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

interface Notice1Props {
  onWriteClick?: () => void;
}

export default function Notice1({ onWriteClick }: Notice1Props) {
  const [activeTab, setActiveTab] = useState<'notice' | 'report'>('notice');
  const [searchType, setSearchType] = useState<'title' | 'content' | 'author'>('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 더미 데이터
  const notices: Notice[] = Array.from({ length: 10 }, (_, i) => ({
    id: 10 - i,
    title: i === 0 ? '2025년 여름휴가 안내' : '핵전쟁 공식 홈페이지 오픈 안내',
    author: '홍길*',
    date: '2025/08/26',
    views: 0,
  }));

  const totalPages = 5;

  const handleSearch = () => {
    console.log('검색:', searchType, searchQuery);
  };

  const renderPagination = () => {
    const pages = [];
    
    pages.push(
      <button
        key="first"
        onClick={() => setCurrentPage(1)}
        className="px-3 py-1 text-gray-400 hover:text-gray-600"
      >
        «
      </button>
    );
    
    pages.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="px-3 py-1 text-gray-400 hover:text-gray-600"
      >
        ‹
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 ${
            currentPage === i
              ? 'font-bold text-black'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {i}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 text-gray-400 hover:text-gray-600"
      >
        ›
      </button>
    );

    pages.push(
      <button
        key="last"
        onClick={() => setCurrentPage(totalPages)}
        className="px-3 py-1 text-gray-400 hover:text-gray-600"
      >
        »
      </button>
    );

    return pages;
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      
      <h1 className="text-5xl font-bold text-center mt-18">공지사항</h1>

      <div className="mt-40 mb-8 flex justify-center gap-4 mb-26">
        <button
          onClick={() => setActiveTab('notice')}
          className={`rounded-full w-56 h-15 font-medium text-2xl transition-colors ${
            activeTab === 'notice'
              ? 'bg-[#fec2c2] text-black'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          공 지
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`rounded-full w-56 h-15 font-medium text-2xl transition-colors ${
            activeTab === 'report'
              ? 'bg-[#fec2c2] text-black'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          보도자료
        </button>
      </div>

      <div className="flex-1">
        <table className="w-full border-t border-gray-400 text-center">
          <thead>
            <tr className="border-b border-gray-300 bg-[#ededed]">
              <th className="py-2 w-[60px]">번호</th>
              <th className="py-2"></th>
              <th className="py-2 w-[120px]">이름</th>
              <th className="py-2 w-[120px]">날짜</th>
              <th className="py-2 w-[90px]">조회</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} className="border-b border-gray-300">
                <td className="py-3.5">{notice.id}</td>
                <td className="py-3.5 text-left pl-8">{notice.title}</td>
                <td className="py-3.5">{notice.author}</td>
                <td className="py-3.5">{notice.date}</td>
                <td className="py-3.5">{notice.views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center mt-4 justify-between">
            <div className="flex items-center gap-2">
                <div className="flex gap-7">
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="searchType"
                    value="title"
                    checked={searchType === 'title'}
                    onChange={(e) => setSearchType(e.target.value as 'title')}
                    />
                        이름
                </label>
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="searchType"
                    value="content"
                    checked={searchType === 'content'}
                    onChange={(e) => setSearchType(e.target.value as 'content')}
                    />
                        제목
                </label>
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="searchType"
                    value="author"
                    checked={searchType === 'author'}
                    onChange={(e) => setSearchType(e.target.value as 'author')}
                    />
                        내용
                </label>
                </div>

                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border w-35 px-2 ml-5"
                />
                <button
                onClick={handleSearch}
                className="border px-2 text-gray-500 hover:bg-gray-300 -ml-1"
                >
                    검색
                </button>
            </div>

            <button 
                onClick={onWriteClick}
                className="w-22 h-8 bg-blue-100 border-2 border-blue-800 text-blue-800 font-medium hover:bg-blue-200"
            >
                글쓰기
            </button>
        </div>

        <div className="flex justify-center mt-20 mb-28 space-x-2 text-gray-400">
          <button
            onClick={() => setCurrentPage(1)}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            {'<<'}
          </button>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            {'<'}
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-3 py-1 h-7 ${
                currentPage === page
                  ? 'text-blue-800 border-b-2 border-blue-800'
                  : 'hover:text-blue-800'
              } ${page === 1 ? 'ml-4' : 'ml-2'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 ml-4"
          >
            {'>'}
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}