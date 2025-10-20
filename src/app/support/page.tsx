'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import EstimateList from '@domains/support/components/estimate/EstimateList';
import EstimateWrite from '@domains/support/components/estimate/EstimateWrite';
import EstimateDetail from '@domains/support/components/estimate/EstimateDetail';
import { useEffect } from 'react';
import { useEstimateStore } from '@domains/support/store/EstimateStore';

export default function Page() {
  const {
    currentStep,
    setCurrentStep,
    inquiries,
    addInquiry,
    selectedInquiry,
    setSelectedInquiry,
  } = useEstimateStore();

  // 🔹 브라우저 새로고침 시 step 유지 처리
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload =
      navigationEntries.length > 0 &&
      (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";

    const savedStep = localStorage.getItem('currentStep');
    if (isReload && savedStep === '2') {
      setCurrentStep(2);
      window.history.replaceState({ step: 2 }, '');
    } else {
      setCurrentStep(1);
      localStorage.setItem('currentStep', '1');
      window.history.replaceState({ step: 1 }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.step) {
        setCurrentStep(state.step);
        localStorage.setItem('currentStep', String(state.step));
      } else {
        setCurrentStep(1);
        localStorage.setItem('currentStep', '1');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setCurrentStep]);

  // 🔹 페이지 전환 핸들러
  const changeStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem('currentStep', String(step));
    window.history.pushState({ step }, '');
  };

  // 🔹 화면 렌더링
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EstimateList onButtonClick={() => changeStep(2)} />
        );
      case 2:
        return (
          <EstimateWrite
            onSubmit={(inquiryData) => {
              addInquiry(inquiryData); // Zustand store 이용
              changeStep(1);
            }}
          />
        );
      case 3:
        return (
          <EstimateDetail
            inquiryData={selectedInquiry}
            onBack={() => changeStep(1)}
          />
        );
      default:
        return (
          <EstimateList onButtonClick={() => changeStep(2)} />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[120px]">{renderContent()}</main>
      <Footer />
    </div>
  );
}
