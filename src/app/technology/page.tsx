// technology 페이지

'use client';

import Footer from '@comp/Footer';
import Header from '@comp/Header';
import { PageBannerBackground, PageBannerContent } from '@comp/ui/page-banner';

import FacilitySection from '@domains/technology/components/facility/FacilitySection';
import ProcessSection from '@domains/technology/components/process/ProcessSection';
import TechCapabilitySection from '@domains/technology/components/tech-capability/TechCapabilitySection';
import TechnologyShareBg from '@domains/technology/components/TechnologyShareBg';

export default function Page() {
  return (
    <div>
      <Header />
      <PageBannerBackground
        src='/assets/images/technology_banner.jpg'
        alt='technology banner 이미지'
      >
        <PageBannerContent
          title='좋은 포장은 결국, 좋은 공정에서 나옵니다'
          subTitle={`보이지 않는 과정을 철저히 다루는 것,\n그것이 혁진팩이 좋은 포장을 만드는 방식입니다`}
        />
      </PageBannerBackground>
      <TechnologyShareBg>
        <FacilitySection />
        <ProcessSection />
      </TechnologyShareBg>
      <TechCapabilitySection />
      <Footer />
    </div>
  );
}
