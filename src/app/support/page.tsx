// support 페이지

'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import Estimate1 from '@domains/support/components/estimate/Estimate1';
import Estimate2 from '@domains/support/components/estimate/Estimate2';
import Estimate3 from '@domains/support/components/estimate/Estimate3';

import { useState } from 'react';

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderContent = () => {
    switch(currentStep) {
      case 1:
        return <Estimate1 onButtonClick={() => setCurrentStep(2)} />;
      case 2:
        return <Estimate2 onSubmit={() => setCurrentStep(3)} />;
      case 3:
        return <Estimate3 />;
      default:
        return <Estimate1 onButtonClick={() => setCurrentStep(2)} />;
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
