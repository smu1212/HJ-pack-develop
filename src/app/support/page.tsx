'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import EstimateList from '@domains/support/components/estimate/EstimateList';
import EstimateWrite from '@domains/support/components/estimate/EstimateWrite';
import EstimateDetail from '@domains/support/components/estimate/EstimateDetail';
import { useEffect } from 'react';
import { useEstimateStore } from '@domains/support/store/EstimateStore';

export default function Page() {
  // Zustand store에서 값과 함수 가져오기
  const {
    currentStep,
    setCurrentStep,
    inquiries,
    selectedInquiry,
    addInquiry
  } = useEstimateStore();

  // 페이지 이동 함수
  const changeStep = (step: number) => {
    setCurrentStep(step);
    if (step === 2) {
      localStorage.setItem('currentStep', '2');
    } else {
      localStorage.setItem('currentStep', '1');
    }
    window.history.pushState({ step }, '');
  };

  // 새로고침 및 뒤로가기 처리
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
        localStorage.setItem('currentStep', state.step.toString());
      } else {
        setCurrentStep(1);
        localStorage.setItem('currentStep', '1');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setCurrentStep]);

  // 현재 스텝에 따라 렌더링
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <EstimateList onButtonClick={() => changeStep(2)} />
      case 2:
        return (
          <EstimateWrite
            onSubmit={(inquiryData) => {
              addInquiry(inquiryData); // Zustand 사용
              changeStep(1);
            }}
          />
        );
      case 3:
        return <EstimateDetail onBack={() => changeStep(1)} />
      default:
        return <EstimateList onButtonClick={() => changeStep(2)} />
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
