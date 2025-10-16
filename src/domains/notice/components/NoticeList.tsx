// 문의 목록

'use client';

import { useState, useEffect } from 'react';

interface Notice {
  id: number;
  title: string;
  createdAt: string;
}

interface ApiResponse {
  list: Notice[];
  pageCount: number;
  total: number;
}

interface NoticeListProps {
  onWriteClick?: () => void;
  onDetailClick?: (id: number) => void;
  notices?: any[];
}

export default function NoticeList({ onWriteClick, onDetailClick, notices: initialNotices }: NoticeListProps) {
  const [activeTab, setActiveTab] = useState<'notice' | 'report'>('notice');
  const [searchType, setSearchType] = useState<'title' | 'content' | 'author'>('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  const fetchNotices = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        take: '10',
        sort: 'latest',
      });

      // searchType에 따라 다른 파라미터 추가
      if (searchQuery) {
        if (searchType === 'title') {
          params.append('title', searchQuery);
        } else if (searchType === 'content') {
          params.append('content', searchQuery);
        } else if (searchType === 'author') {
          params.append('author', searchQuery);
        }
      }

      const response = await fetch(
        `https://api.dev.hj-pack.eoe.sh/notice?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('공지사항을 불러오지 못했습니다.');
      }

      const data: ApiResponse = await response.json();
      setNotices(data.list);
      setTotal(data.total);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      // 초기 더미 데이터 사용
      if (initialNotices && initialNotices.length > 0) {
        setNotices(initialNotices);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(1);
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchNotices(1);
  };

  const handlePageChange = (page: number) => {
    fetchNotices(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      
      <h1 className="text-[48px] font-bold text-center mt-18">공지사항</h1>

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
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

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
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : notices.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  공지사항이 없습니다.
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr 
                  key={notice.id} 
                  className="border-b border-gray-300 hover:bg-gray-10 cursor-pointer"
                  onClick={() => {
                    console.log('클릭됨:', notice.id);
                    onDetailClick?.(notice.id);
                  }}
                >
                  <td className="py-3.5">{notice.id}</td>
                  <td className="py-3.5 text-left pl-8">{notice.title}</td>
                  <td className="py-3.5">홍길*</td>
                  <td className="py-3.5">{formatDate(notice.createdAt)}</td>
                  <td className="py-3.5">0</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center mt-4 justify-between">
            <div className="flex items-center gap-2">
                <div className="flex gap-7">
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="searchType"
                    value="author"
                    checked={searchType === 'author'}
                    onChange={(e) => setSearchType(e.target.value as 'author')}
                    />
                        이름
                </label>
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="searchType"
                    value="title"
                    checked={searchType === 'title'}
                    onChange={(e) => setSearchType(e.target.value as 'title')}
                    />
                        제목
                </label>
                <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="searchType"
                    value="content"
                    checked={searchType === 'content'}
                    onChange={(e) => setSearchType(e.target.value as 'content')}
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
                disabled={loading}
                >
                    검색
                </button>
            </div>

            <button 
                onClick={onWriteClick}
                className="w-22 h-8 bg-blue-100 border-2 border-blue-800 text-blue-800 font-medium hover:bg-blue-300 mr-2"
            >
                글쓰기
            </button>
        </div>

        <div className="flex justify-center mt-20 mb-28 space-x-2 text-gray-400">
          <button
            onClick={() => handlePageChange(1)}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100"
            disabled={loading || currentPage === 1}
          >
            {'<<'}
          </button>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100"
            disabled={loading || currentPage === 1}
          >
            {'<'}
          </button>
          {Array.from(
            { length: Math.ceil(total / itemsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-3 py-1 h-7 ${
                currentPage === page
                  ? 'text-blue-800 border-b-2 border-blue-800'
                  : 'hover:text-blue-800'
              } ${page === 1 ? 'ml-4' : 'ml-2'}`}
              disabled={loading}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(Math.min(Math.ceil(total / itemsPerPage), currentPage + 1))}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 ml-4"
            disabled={loading || currentPage === Math.ceil(total / itemsPerPage)}
          >
            {'>'}
          </button>
          <button
            onClick={() => handlePageChange(Math.ceil(total / itemsPerPage))}
            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100"
            disabled={loading || currentPage === Math.ceil(total / itemsPerPage)}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}