// 견적문의 답변 컴포넌트

import React from "react";
import { useEstimateStore } from "@domains/support/store/EstimateStore";

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

const styles = {
  container: 'w-full px-[450px] py-[60px]',
  title: 'text-[48px] font-bold text-center mt-[72px]',
  divider: {
    top: 'border-t-[3px] border-[#929292] mt-[160px]',
    thin: 'border-[1px] border-gray-200',
  },
  border: {
    primary: 'border-[#929292]',
    active: 'border-[#355194]',
    blue: 'border-blue-800',
  },
  text: {
    size18: 'text-[18px]',
    primary: 'text-[#929292]',
    blue: 'text-blue-800',
  },
  spacing: {
    mb12: 'mb-[12px]',
    mb24: 'mb-[24px]',
    mb40: 'mb-[40px]',
    mb160: 'mb-[160px]',
    mt12: 'mt-[12px]',
    mt16: 'mt-[16px]',
    ml12: 'ml-[12px]',
    mr10: 'mr-[10px]',
    gap12: 'gap-[12px]',
  },
  content: {
    section: 'h-[320px] space-y-[4px]',
  },
  textarea: 'w-[98%] border border-[2px] border-[#929292] p-[12px] focus:outline-none focus:ring-2 focus:border-[#355194] min-h-[120px] text-[18px]',
  button: {
    base: 'px-[32px] h-[32px] border-[2px] font-bold',
    delete: 'border-[#929292] text-[#929292] hover:bg-gray-300',
    submit: 'bg-blue-100 border-blue-800 text-blue-800 hover:bg-blue-500',
  },
};

export default function EstimateDetail({ inquiryData, onBack }: EstimateDetailProps) {
  const { inquiryContent, setInquiryContent, answer, setAnswer } = useEstimateStore();

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
    <div className={styles.container}>
      <h1 className={styles.title}>주문제작 문의</h1>

      <div className={styles.divider.top} />

      <div className={`${styles.spacing.mb40} ${styles.spacing.mt12}`}>
        <p className={`${styles.spacing.mb12} ${styles.spacing.ml12} ${styles.text.size18}`}>
          {inquiryData.title}
        </p>
        <hr className={`${styles.spacing.mb24} ${styles.divider.thin}`} />

        <div className={`${styles.content.section} ${styles.spacing.ml12} ${styles.text.size18}`}>
          <p>이름: {inquiryData.name}</p>
          <p>제작 규격: {inquiryData.specification}</p>
          <p>제작 수량: {inquiryData.number}</p>
          <p>포장 내용물: {inquiryData.content}</p>
        </div>
      </div>

      <div className={`flex justify-end ${styles.text.primary} ${styles.spacing.mb24}`}>
        <span>{inquiryData.name.substring(0, 2)}*</span>
        <span className={styles.spacing.ml12}>{inquiryData.date}</span>
      </div>

      <hr className={`${styles.spacing.mb24} ${styles.divider.thin}`} />

      <div className="flex justify-center">
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          className={styles.textarea}
          placeholder="답변 기재창"
        />
      </div>

      <div className={`flex justify-end ${styles.spacing.gap12} ${styles.spacing.mt16} ${styles.spacing.mr10} ${styles.spacing.mb160}`}>
        <button
          onClick={handleDelete}
          className={`${styles.button.base} ${styles.button.delete}`}
        >
          삭 제
        </button>
        <button
          onClick={handleReply}
          className={`${styles.button.base} ${styles.button.submit}`}
        >
          답 변
        </button>
      </div>
    </div>
  );
}