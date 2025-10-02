// 주문제작문의 버튼 및 문의 목록 띄우는 컴포넌트

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

  // 임시 목록 -> 추후 실제 문의 목록에 연결
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
    <section className="w-full px-[450px] py-[60px]">
      <h1 className="text-5xl font-bold text-center mt-18">주문제작 문의</h1>

         <div className="text-center mt-40 mb-26">
            <button 
            onClick={onButtonClick}
            className="bg-red-200 text-2xl px-12 py-5 rounded-full text-black hover:bg-red-300"
            >
            주문제작 견적문의
            </button>
        </div>

      <div className="flex-1">
        <table className="w-full border-t border-gray-400 text-center">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-200">
              <th className="py-2 w-[60px]">번호</th>
              <th className="py-2"></th>
              <th className="py-2 w-[120px]">이름</th>
              <th className="py-2 w-[120px]">날짜</th>
              <th className="py-2 w-[60px]">조회</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(({ id, title, name, date, views }) => (
              <tr key={id} className="border-b border-gray-300">
                <td className="py-3.5">{id}</td>
                <td className="py-3.5 text-left pl-8">{title}</td>
                <td className="py-3.5">{name}</td>
                <td className="py-3.5">{date}</td>
                <td className="py-3.5">{views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center gap-7 text-1xl mt-4">
          <div className="flex gap-7">
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

          <input
            type="text"
            className="border w-35"
          />
          <button className="border px-2 text-gray-500 hover:bg-gray-300 -ml-6">
            검색
          </button>
        </div>

        <div className="flex justify-center mt-20 mb-28 space-x-2 text-gray-400">
          <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'<<'}</button>
          <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'<'}</button>
          <button className="px-1 py-1 text-blue-800 border-b-2 border-blue-800 ml-4">1</button>
          <button className="px-1 py-1 hover:text-blue-800 ml-2">2</button>
          <button className="px-1 py-1 hover:text-blue-800 ml-2">3</button>
          <button className="px-1 py-1 hover:text-blue-800 ml-2">4</button>
          <button className="px-1 py-1 hover:text-blue-800 ml-2">5</button>
          <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 ml-4">{'>'}</button>
          <button className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100">{'>>'}</button>
        </div>
        </div>
    </section>
  );
}
