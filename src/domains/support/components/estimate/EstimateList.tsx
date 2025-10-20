"use client";

import { useEstimateStore } from '@domains/support/store/EstimateStore';

interface EstimateListProps {
  onButtonClick?: () => void;
}

export default function EstimateList({ onButtonClick }: EstimateListProps) {
  const {
    inquiries,
    searchType,
    setSearchType,
    searchText,
    setSearchText,
  } = useEstimateStore();

  const handleSearch = () => {
    console.log("검색:", searchType, searchText);
    // 실제 검색 로직은 추후 구현 가능
  };

  return (
    <section className="px-[450px] py-[60px]">
      <h1 className="text-[48px] font-bold text-center mt-[72px]">주문제작 문의</h1>

      <div className="text-center mt-40 mb-26">
        <button
          onClick={onButtonClick}
          className="bg-red-200 text-[24px] w-[280px] h-[60px] rounded-full text-black hover:bg-red-300 font-medium"
        >
          주문제작 견적문의
        </button>
      </div>

      <div className="flex-1">
        <table className="w-[100%] border-t border-gray-400 text-center">
          <thead>
            <tr className="border-b border-gray-300 bg-[#ededed]">
              <th className="py-[8px] w-[60px]">번호</th>
              <th className="py-[8px]">제목</th>
              <th className="py-[8px] w-[120px]">이름</th>
              <th className="py-[8px] w-[120px]">날짜</th>
              <th className="py-[8px] w-[90px]">조회</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(({ id, title, name, date, views }) => (
              <tr key={id} className="border-b border-gray-300">
                <td className="py-[14px]">{id}</td>
                <td className="py-[14px] text-left pl-[32px]">{title}</td>
                <td className="py-[14px]">{name}</td>
                <td className="py-[14px]">{date}</td>
                <td className="py-[14px]">{views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 검색 영역 */}
        <div className="flex items-center gap-[28px] text-[16px] mt-[16px]">
          <div className="flex gap-[28px]">
            <label className="flex items-center gap-[4px]">
              <input
                type="radio"
                name="searchType"
                checked={searchType === "이름"}
                onChange={() => setSearchType("이름")}
              /> 이름
            </label>
            <label className="flex items-center gap-[4px]">
              <input
                type="radio"
                name="searchType"
                checked={searchType === "제목"}
                onChange={() => setSearchType("제목")}
              /> 제목
            </label>
            <label className="flex items-center gap-[4px]">
              <input
                type="radio"
                name="searchType"
                checked={searchType === "내용"}
                onChange={() => setSearchType("내용")}
              /> 내용
            </label>
          </div>

          <input
            type="text"
            className="border w-[140px] px-[4px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="border px-[8px] text-gray-500 hover:bg-gray-300 -ml-[24px]"
          >
            검색
          </button>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-[80px] mb-[112px] space-x-[8px] text-gray-400">
          <button className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100">{'<<'}</button>
          <button className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100">{'<'}</button>
          <button className="px-[4px] py-[4px] h-[28px] text-blue-800 border-b-[2px] border-blue-800 ml-[16px]">1</button>
          <button className="px-[4px] py-[4px] h-[28px] hover:text-blue-800 ml-[8px]">2</button>
          <button className="px-[4px] py-[4px] h-[28px] hover:text-blue-800 ml-[8px]">3</button>
          <button className="px-[4px] py-[4px] h-[28px] hover:text-blue-800 ml-[8px]">4</button>
          <button className="px-[4px] py-[4px] h-[28px] hover:text-blue-800 ml-[8px]">5</button>
          <button className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100 ml-[16px]">{'>'}</button>
          <button className="w-[32px] h-[32px] border border-gray-300 rounded-full hover:bg-gray-100">{'>>'}</button>
        </div>
      </div>
    </section>
  );
}
