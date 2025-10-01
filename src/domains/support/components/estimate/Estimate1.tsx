"use client";

import Link from 'next/link';
import { useState } from "react";

// props 추가
interface Estimate1Props {
  onButtonClick?: () => void;
}

export default function Estimate1({ onButtonClick }: Estimate1Props) {
  const [searchType, setSearchType] = useState("이름");
  const [searchText, setSearchText] = useState("");

  const dummyData = [
    { id: 10, title: "주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 9, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 7, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 6, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 5, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 4, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 3, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 2, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 1, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  ];

  const handleSearch = () => {
    console.log("검색:", searchType, searchText);
  };

  return (
    <section className="w-full px-[100px] py-[60px]">
      <h1 className="text-5xl font-bold text-center mb-6">주문제작 문의</h1>

      {/* 버튼 */}
         <div className="text-center mt-36 mb-6">
            <button 
            onClick={onButtonClick}
            className="bg-red-200 text-2xl px-12 py-5 rounded-full text-black hover:bg-red-300"
            >
            주문제작 견적문의
            </button>
        </div>

      {/* 문의 목록 테이블 */}
      <div className="flex-1">
        <table className="w-full border-t border-gray-300 text-center">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100">
              <th className="py-2 w-[60px]">번호</th>
              <th className="py-2">제목</th>
              <th className="py-2 w-[120px]">이름</th>
              <th className="py-2 w-[120px]">날짜</th>
              <th className="py-2 w-[60px]">조회</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(({ id, title, name, date, views }) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="py-2">{id}</td>
                <td className="py-2 text-left pl-4">{title}</td>
                <td className="py-2">{name}</td>
                <td className="py-2">{date}</td>
                <td className="py-2">{views}</td>
              </tr>
            ))}
          </tbody>
        </table>

          {/* 검색 영역 */}
      <div className="flex items-center gap-4 text-1xl mt-4">
        {/* 라디오 버튼 */}
        <div className="flex gap-6">
          <label className="flex items-center gap-1">
            <input type="radio" name="searchType" defaultChecked /> 이름
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="searchType" /> 제목
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="searchType" /> 내용
          </label>
        </div>

        {/* 검색창 */}
        <input
          type="text"
          className="border w-40"
        />
        <button className="border px-2 text-gray-500 hover:bg-gray-300 -ml-3">
          검색
        </button>
      </div>

          {/* 페이징 */}
      <div className="flex justify-center mt-16 space-x-2 text-gray-400 text-sm">
        <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'<<'}</button>
        <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'<'}</button>
        <button className="px-3 py-1 text-blue-600 border-b-2 border-blue-600">1</button>
        <button className="px-3 py-1 hover:text-blue-600">2</button>
        <button className="px-3 py-1 hover:text-blue-600">3</button>
        <button className="px-3 py-1 hover:text-blue-600">4</button>
        <button className="px-3 py-1 hover:text-blue-600">5</button>
        <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'>'}</button>
        <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'>>'}</button>
      </div>
        </div>
    </section>
  );
}
