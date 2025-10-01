// business 페이지

'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import { PageBannerBackground, PageBannerContent } from '@comp/ui/page-banner';

import ClientsSection from '@domains/business/components/clients/ClientsSection';
import IntroSection from '@domains/business/components/intro/IntroSection';

export default function Page() {
  return (
    <div>
      <Header />
      <PageBannerBackground
        src='/assets/images/intro_banner.png'
        alt='business banner 이미지'
      >
        <PageBannerContent
          title='실적은 숫자가 아니라, 지속적인 관계의 결과입니다.'
          subTitle={`혁진팩은 단기 성과보다 \n 신뢰와 파트너십을 우선으로 고객과 함께 성장해왔습니다.`}
        />
      </PageBannerBackground>
      <IntroSection />
      <ClientsSection />
      <Footer />
    </div>
  );
}
