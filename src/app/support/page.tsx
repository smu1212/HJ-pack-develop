// support 페이지

'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import Estimate1 from '@domains/support/components/estimate/Estimate1';
import Estimate2 from '@domains/support/components/estimate/Estimate2';
import Estimate3 from '@domains/support/components/estimate/Estimate3';

import { useState } from 'react';

export interface InquiryData {
  id: number;
  title: string;
  name: string;
  date: string;
  views: number;
}

export interface InquiryDetailData {
  title: string;
  name: string;
  specification: string;
  number: string;
  content: string;
  date?: string; 
}

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const [inquiries, setInquiries] = useState<InquiryData[]>([
    { id: 10, title: "주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 9, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 7, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 6, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 5, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 4, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 3, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 2, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
    { id: 1, title: "[답변완료] 주문제작 견적 문의드립니다.", name: "홍길동", date: "2025/08/26", views: 0 },
  ]);

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryDetailData | null>(null);

  const handleAddInquiry = (inquiryData: InquiryDetailData) => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
    
    const newId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1;
    
    const newInquiry: InquiryData = {
      id: newId,
      title: inquiryData.title,
      name: inquiryData.name,
      date: dateStr,
      views: 0,
    };
    
    setInquiries([newInquiry, ...inquiries]);
    setSelectedInquiry({ ...inquiryData, date: dateStr });
  };

  const renderContent = () => {
    switch(currentStep) {
      case 1:
        return <Estimate1 inquiries={inquiries} onButtonClick={() => setCurrentStep(2)} />;
      case 2:
        return <Estimate2 onSubmit={(inquiryData) => {
          handleAddInquiry(inquiryData);
          setCurrentStep(3);
        }} />;
      case 3:
        return <Estimate3 inquiryData={selectedInquiry} onBack={() => setCurrentStep(1)} />;
      default:
        return <Estimate1 inquiries={inquiries} onButtonClick={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[120px]">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
