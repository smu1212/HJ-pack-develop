// support 페이지

'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import Estimate1 from '@domains/support/components/estimate/Estimate1';
import Estimate2 from '@domains/support/components/estimate/Estimate2';

import { useState } from 'react';

export default function Page() {
  const [showEstimate2, setShowEstimate2] = useState(false);

  if (showEstimate2) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-[120px]">
          <Estimate2 />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[120px]">
        <Estimate1 onButtonClick={() => setShowEstimate2(true)} />
      </main>
      <Footer />
    </div>
  );
}
