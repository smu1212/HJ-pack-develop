// 견적문의 답변 컴포넌트

import React, { useState } from "react";

interface Estimate3Props {
  inquiryData: {
    title: string;
    name: string;
    specification: string;
    number: string;
    content: string;
    date?: string;
  } | null;
  onBack: () => void;
}

export default function Estimate3({ inquiryData, onBack }: Estimate3Props) {
  const [inquiryContent, setInquiryContent] = useState("");
  const [answer, setAnswer] = useState("");

  const handleInquiryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInquiryContent(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      onBack();
    }
  };

  const handleReply = () => {
    alert("답변: " + answer);
    onBack();
  };

  if (!inquiryData) {
    return <div>문의 내용이 없습니다.</div>;
  }

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-5xl font-bold text-center mt-18">주문제작 문의</h1>

      <div className="border-t-3 border-gray-300 mt-40" />

      <div className="mb-10 text-gray-700 mt-3">
        
        <p className="mb-3 ml-3 text-lg">{inquiryData.title}</p>
        <hr className="mb-6 border-1 border-gray-200" />
        
        <div className="h-80 space-y-1 ml-3 text-lg">
          <p>이름: {inquiryData.name}</p>
          <p>제작 규격: {inquiryData.specification}</p>
          <p>제작 수량: {inquiryData.number}</p>
          <p>포장 내용물: {inquiryData.content}</p>
        </div>
      </div>

      <div className="flex justify-end text-gray-500 mb-6">
        <span>{inquiryData.name.substring(0, 2)}*</span>
        <span className="ml-3">{inquiryData.date}</span>
      </div>

      <hr className="mb-6 border-1 border-gray-200" />

      <div className="flex justify-center">
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          className="w-[98%] border border-2 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-800 min-h-[120px] text-lg"
          placeholder="답변 기재창"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4 mr-2.5 mb-40">
        <button
          onClick={handleDelete}
          className="px-8 h-8 border-2 border-gray-400 text-gray-500 font-bold hover:bg-gray-300"
        >
          삭 제
        </button>
        <button
          onClick={handleReply}
          className="px-8 h-8 bg-blue-100 border-2 border-blue-800 text-blue-800 font-bold hover:bg-blue-500"
        >
          답 변
        </button>
      </div>
    </div>
  );
}