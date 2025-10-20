'use client';

import { useEstimateStore } from '@domains/support/store/EstimateStore';

export default function EstimateDetail({ onBack }: { onBack: () => void }) {
  const { selectedInquiry, answer, setAnswer } = useEstimateStore();

  if (!selectedInquiry) return <div>문의 내용이 없습니다.</div>;

  return (
    <div className="w-full px-[450px] py-[60px]">
      <h1 className="text-[48px] font-bold text-center mt-[72px]">주문제작 문의</h1>

      <div className="border-t-[3px] border-gray-300 mt-[160px]" />

      <div className="mb-[40px] text-gray-700 mt-[12px]">
        <p className="mb-[12px] ml-[12px] text-[18px]">{selectedInquiry.title}</p>
        <hr className="mb-[24px] border-[1px] border-gray-200" />

        <div className="h-[320px] space-y-[4px] ml-[12px] text-[18px]">
          <p>이름: {selectedInquiry.name}</p>
          <p>제작 규격: {selectedInquiry.specification}</p>
          <p>제작 수량: {selectedInquiry.number}</p>
          <p>포장 내용물: {selectedInquiry.content}</p>
        </div>
      </div>

      <div className="flex justify-end text-gray-500 mb-[24px]">
        <span>{selectedInquiry.name.substring(0, 2)}*</span>
        <span className="ml-[12px]">{selectedInquiry.date}</span>
      </div>

      <hr className="mb-[24px] border-[1px] border-gray-200" />

      <div className="flex justify-center">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-[98%] border border-[2px] border-gray-300 p-[12px] focus:outline-none focus:ring-2 focus:ring-blue-800 min-h-[120px] text-[18px]"
          placeholder="답변 기재창"
        />
      </div>

      <div className="flex justify-end gap-[12px] mt-[16px] mr-[10px] mb-[160px]">
        <button
          onClick={() => onBack()}
          className="px-[32px] h-[32px] border-[2px] border-gray-400 text-gray-500 font-bold hover:bg-gray-300"
        >
          삭 제
        </button>
        <button
          onClick={() => {
            alert('답변: ' + answer);
            onBack();
          }}
          className="px-[32px] h-[32px] bg-blue-100 border-[2px] border-blue-800 text-blue-800 font-bold hover:bg-blue-500"
        >
          답 변
        </button>
      </div>
    </div>
  );
}
