// brand 페이지

'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import { PageBannerBackground, PageBannerContent } from '@comp/ui/page-banner';

import CertificationsSection from '@domains/brand/components/certifications/CertificationsSection';
import CompanySection from '@domains/brand/components/company/CompanySection';
import HistorySection from '@domains/brand/components/history/HistorySection';
import LocationSection from '@domains/brand/components/location/LocationSection';
import OrgChartSection from '@domains/brand/components/org-chart/OrgChartSection';

export default function Page() {
  return (
    <div>
      <Header />
      <PageBannerBackground
        src='/assets/images/brand_banner.png'
        alt='brand banner 이미지'
      >
        <PageBannerContent
          title='우리는 상품의 옷을 짓는 사람들입니다'
          subTitle='브랜드의 첫인상, 포장은 곧 당신의 이야기입니다.'
        />
      </PageBannerBackground>
      <CompanySection />
      <HistorySection />
      <OrgChartSection />
      <CertificationsSection />
      <LocationSection />
      <Footer />
    </div>
  );
}
