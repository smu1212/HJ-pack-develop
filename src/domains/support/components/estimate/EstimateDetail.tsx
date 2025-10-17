// 견적문의 답변 컴포넌트

import React, { useState } from "react";

interface EstimateDetailProps {
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

export default function EstimateDetail({ inquiryData, onBack }: EstimateDetailProps) {
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
      <h1 className="text-[48px] font-bold text-center mt-[72px]">주문제작 문의</h1>

      <div className="border-t-[3px] border-gray-300 mt-[160px]" />

      <div className="mb-[40px] text-gray-700 mt-[12px]">
        
        <p className="mb-[12px] ml-[12px] text-[18px]">{inquiryData.title}</p>
        <hr className="mb-[24px] border-[1px] border-gray-200" />
        
        <div className="h-[320px] space-y-[4px] ml-[12px] text-[18px]">
          <p>이름: {inquiryData.name}</p>
          <p>제작 규격: {inquiryData.specification}</p>
          <p>제작 수량: {inquiryData.number}</p>
          <p>포장 내용물: {inquiryData.content}</p>
        </div>
      </div>

      <div className="flex justify-end text-gray-500 mb-[24px]">
        <span>{inquiryData.name.substring(0, 2)}*</span>
        <span className="ml-[12px]">{inquiryData.date}</span>
      </div>

      <hr className="mb-[24px] border-[1px] border-gray-200" />

      <div className="flex justify-center">
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          className="w-[98%] border border-[2px] border-gray-300 p-[12px] focus:outline-none focus:ring-2 focus:ring-blue-800 min-h-[120px] text-[18px]"
          placeholder="답변 기재창"
        />
      </div>

      <div className="flex justify-end gap-[12px] mt-[16px] mr-[10px] mb-[160px]">
        <button
          onClick={handleDelete}
          className="px-[32px] h-[32px] border-[2px] border-gray-400 text-gray-500 font-bold hover:bg-gray-300"
        >
          삭 제
        </button>
        <button
          onClick={handleReply}
          className="px-[32px] h-[32px] bg-blue-100 border-[2px] border-blue-800 text-blue-800 font-bold hover:bg-blue-500"
        >
          답 변
        </button>
      </div>
    </div>
  );
}