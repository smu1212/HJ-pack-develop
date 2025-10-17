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
      
      <h1 className="text-[48px] font-bold text-center mt-[72px]">공지사항</h1>

      <div className="mt-[160px] mb-[32px] flex justify-center gap-[16px] mb-[104px]">
        <button
          onClick={() => setActiveTab('notice')}
          className={`rounded-full w-[224px] h-[60px] font-medium text-[24px] transition-colors ${
            activeTab === 'notice'
              ? 'bg-[#fec2c2] text-black'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          공 지
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`rounded-full w-[224px] h-[60px] font-medium text-[24px] transition-colors ${
            activeTab === 'report'
              ? 'bg-[#fec2c2] text-black'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          보도자료
        </button>
      </div>

      <div className="flex-[4px]">
        {error && (
          <div className="mb-[16px] p-[12px] bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <table className="w-full border-t border-gray-400 text-center">
          <thead>
            <tr className="border-b border-gray-300 bg-[#ededed]">
              <th className="py-[8px] w-[60px]">번호</th>
              <th className="py-[8px]"></th>
              <th className="py-[8px] w-[120px]">이름</th>
              <th className="py-[8px] w-[120px]">날짜</th>
              <th className="py-[8px] w-[90px]">조회</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-[32px] text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : notices.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-[32px] text-center text-gray-500">
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
                  <td className="py-[14px]">{notice.id}</td>
                  <td className="py-[14px] text-left pl-[32px]">{notice.title}</td>
                  <td className="py-[14px]">홍길*</td>
                  <td className="py-[14px]">{formatDate(notice.createdAt)}</td>
                  <td className="py-[14px]">0</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center mt-[16px] justify-between">
            <div className="flex items-center gap-[8px]">
                <div className="flex gap-[28px]">
                <label className="flex items-center gap-[4px]">
                    <input
                    type="radio"
                    name="searchType"
                    value="author"
                    checked={searchType === 'author'}
                    onChange={(e) => setSearchType(e.target.value as 'author')}
                    />
                        이름
                </label>
                <label className="flex items-center gap-[4px]">
                    <input
                    type="radio"
                    name="searchType"
                    value="title"
                    checked={searchType === 'title'}
                    onChange={(e) => setSearchType(e.target.value as 'title')}
                    />
                        제목
                </label>
                <label className="flex items-center gap-[4px]">
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
                className="border w-[140px] px-[8px] ml-[20px]"
                />
                <button
                onClick={handleSearch}
                className="border px-[8px] text-gray-500 hover:bg-gray-300 -ml-[4px]"
                disabled={loading}
                >
                    검색
                </button>
            </div>

            <button 
                onClick={onWriteClick}
                className="w-[88px] h-[32px] bg-blue-100 border-[2px] border-blue-800 text-blue-800 font-medium hover:bg-blue-300 mr-[8px]"
            >
                글쓰기
            </button>
        </div>

        <div className="flex justify-center mt-[80px] mb-[112px] space-x-[8px] text-gray-400">
          <button
            onClick={() => handlePageChange(1)}
            className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100"
            disabled={loading || currentPage === 1}
          >
            {'<<'}
          </button>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100"
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
              className={`w-[12px] py-[4px] h-[28pxs] ${
                currentPage === page
                  ? 'text-blue-800 border-b-[2px] border-blue-800'
                  : 'hover:text-blue-800'
              } ${page === 1 ? 'ml-[16px]' : 'ml-[8px]'}`}
              disabled={loading}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(Math.min(Math.ceil(total / itemsPerPage), currentPage + 1))}
            className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100 ml-[16px]"
            disabled={loading || currentPage === Math.ceil(total / itemsPerPage)}
          >
            {'>'}
          </button>
          <button
            onClick={() => handlePageChange(Math.ceil(total / itemsPerPage))}
            className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100"
            disabled={loading || currentPage === Math.ceil(total / itemsPerPage)}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}