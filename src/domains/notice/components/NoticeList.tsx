'use client';

import { useEffect } from 'react';
import { useNoticeStore } from '@domains/notice/store/NoticeStore';
import { cn } from '@util/index';

interface NoticeListProps {
  onWriteClick?: () => void;
  onDetailClick?: (id: number) => void;
}

const styles = {
  tabButton: {
    base: 'rounded-full w-[224px] h-[60px] font-medium text-[24px] transition-colors',
    active: 'bg-[#ffc8bd] text-black',
    inactive: 'bg-[#dedede]',
  },
  border: {
    primary: 'border-[#929292]',
    hover: 'hover:border-[#355194]',
    active: 'border-[#355194]',
  },
  text: {
    primary: 'text-[#929292]',
    primaryHover: 'hover:text-[#355194]',
    active: 'text-[#355194]',
  },
  pagination: {
    button: 'w-[32px] h-[32px] border border-[#c8c8c8] rounded-full hover:border-[#355194] hover:text-[#355194]',
  },
};

export default function NoticeList({ onWriteClick, onDetailClick }: NoticeListProps) {
  const {
    activeTab,
    searchType,
    searchQuery,
    currentPage,
    notices,
    total,
    loading,
    error,
    setActiveTab,
    setSearchType,
    setSearchQuery,
    fetchNotices,
    handleSearch,
  } = useNoticeStore();

  const itemsPerPage = 10;

  useEffect(() => {
    fetchNotices(1);
  }, [fetchNotices]);

  const handlePageChange = (page: number) => {
    fetchNotices(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const getTabButtonClass = (isActive: boolean) => {
    return cn(
      styles.tabButton.base,
      isActive ? styles.tabButton.active : styles.tabButton.inactive
    );
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="py-[32px] text-center text-gray-500">
            로딩 중...
          </td>
        </tr>
      );
    }

    if (notices.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="py-[32px] text-center text-gray-500">
            공지사항이 없습니다.
          </td>
        </tr>
      );
    }

    return notices.map((notice) => (
      <tr 
        key={notice.id} 
        className="border-b border-[#a8a9a9] hover:bg-gray-10 cursor-pointer"
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
    ));
  };

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-[48px] font-bold text-center pt-[72px]">공지사항</h1>

      <div className="pt-[160px] pb-[32px] flex justify-center gap-[16px] pb-[104px]">
        <button
          onClick={() => setActiveTab('notice')}
          className={getTabButtonClass(activeTab === 'notice')}
        >
          공 지
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={getTabButtonClass(activeTab === 'report')}
        >
          보도자료
        </button>
      </div>

      <div className="flex-1">
        {error && (
          <div className="pb-[16px] p-[12px] bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <table className="w-full border-t border-gray-400 text-center">
          <thead>
            <tr className="border-b border-[#a8a9a9] bg-[#fafafa] text-[#626262]">
              <th className="py-[8px] w-[60px]">번호</th>
              <th className="py-[8px]"></th>
              <th className="py-[8px] w-[120px]">이름</th>
              <th className="py-[8px] w-[120px]">날짜</th>
              <th className="py-[8px] w-[90px]">조회</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>

        <div className="flex items-center justify-between py-[16px]">
          <div className="flex items-center pl-[12px]">
            <div className="flex gap-[28px]">
              <label className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="searchType"
                  value="author"
                  checked={searchType === 'author'}
                  onChange={(e) => setSearchType(e.target.value as 'author')}
                />
                이름
              </label>
              <label className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="searchType"
                  value="title"
                  checked={searchType === 'title'}
                  onChange={(e) => setSearchType(e.target.value as 'title')}
                />
                제목
              </label>
              <label className="flex items-center gap-[6px] mr-[32px]"> 
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

            <div className="flex items-center gap-[3px]"> 
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'border w-[140px] h-[28px] text-[14px]',
                  styles.border.primary,
                  styles.border.hover
                )}
              />

              <button
                onClick={handleSearch}
                className={cn(
                  'border h-[28px] px-[10px]',
                  styles.border.primary,
                  styles.text.primary,
                  styles.border.hover,
                  styles.text.primaryHover
                )}
                disabled={loading}
              >
                검색
              </button>
            </div>
          </div>

          <button
            onClick={onWriteClick}
            className={cn(
              'w-[96px] h-[32px] flex items-center justify-center bg-[#d6e4ff] border-[2px] font-medium hover:bg-blue-300 text-[#355194]',
              styles.border.active
            )}
          >
            글쓰기
          </button>
        </div>

        <div className="flex justify-center items-center gap-[24px] pt-[60px] pb-[112px] text-[#c8c8c8]">
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => handlePageChange(1)}
              className={styles.pagination.button}
              disabled={loading || currentPage === 1}
            >
              {'<<'}
            </button>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={styles.pagination.button}
              disabled={loading || currentPage === 1}
            >
              {'<'}
            </button>
          </div>

          <div className="flex items-center gap-[32px] text-[16px] px-[4px]">
            {Array.from({ length: Math.ceil(total / itemsPerPage) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  'flex items-center justify-center w-[12px] h-[24px]',
                  currentPage === page
                    ? 'text-[#355194] border-b-[2px] border-[#355194] font-semibold'
                    : 'hover:text-[#355194]'
                )}
                disabled={loading}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[8px]"> 
            <button
              onClick={() =>
                handlePageChange(
                  Math.min(Math.ceil(total / itemsPerPage), currentPage + 1)
                )
              }
              className={styles.pagination.button}
              disabled={loading || currentPage === Math.ceil(total / itemsPerPage)}
            >
              {'>'}
            </button>
            <button
              onClick={() => handlePageChange(Math.ceil(total / itemsPerPage))}
              className={styles.pagination.button}
              disabled={loading || currentPage === Math.ceil(total / itemsPerPage)}
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
