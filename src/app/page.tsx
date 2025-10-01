'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';

import BrandValueSection from '@domains/main/components/brand-value/BrandValueSection';
import MainSloganSection from '@domains/main/components/main-slogan/MainSloganSection';
import PortfolioSection from '@domains/main/components/portfolio/PortfolioSection';
import SubSloganSection from '@domains/main/components/sub-slogan/SubSloganSection';
import MainTechnologySection from '@domains/main/components/technology/MainTechnologySection';

export default function Page() {
  return (
    <div>
      <Header />
      <MainSloganSection />
      <SubSloganSection />
      <MainTechnologySection />
      <BrandValueSection />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
