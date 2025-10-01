import Image from 'next/image';

import { PageIcon, PageIconBackground } from '@comp/ui/page-icon-banner';

import { TECH_CAPABILITY_TEXT } from '@domains/technology/constants/techCapability.constant';

export default function TechCapabilitySection() {
  return (
    <section id='tech-capability'>
      <div className='h-[2170px] w-full bg-white'>
        {/* banner */}
        <PageIconBackground
          src='/assets/images/tech_capability_banner.png'
          alt='시스템/기술역량 배너 이미지'
        >
          <PageIcon
            src='/assets/images/tech_capability_icon.png'
            alt='시스템/기술역량 아이콘'
            width={62}
            height={62}
            text='체계적인 관리를 통한 결과물 품질 관리'
          />
        </PageIconBackground>

        {/* 시스템/기술역량 content */}
        <div className='mx-auto flex flex-col items-center justify-center py-[220px]'>
          <div className='pb-[86px] text-[42px]'>
            <span>{TECH_CAPABILITY_TEXT.title}</span>
            <span className='font-bold'>{TECH_CAPABILITY_TEXT.boldTitle}</span>
          </div>

          <Image
            src='/assets/images/tech_capability_content.png'
            alt='시스템/기술역량 content'
            width={950}
            height={577}
            className='size-auto object-contain'
          />
        </div>

        {/* 하단 closing */}
        <ClosingMessage />
      </div>
    </section>
  );
}

function ClosingMessage() {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='rotate-[30deg] transform text-[26px] font-light'>/</div>

      <div className='p-[20px] text-[60px]'>
        <p className='font-bold text-[#3551A1]'>
          {TECH_CAPABILITY_TEXT.closing.line1}
        </p>
        <p className='pt-[20px] leading-none'>
          {TECH_CAPABILITY_TEXT.closing.line2}
        </p>
        <p className='font-bold text-[#E95539]'>
          {TECH_CAPABILITY_TEXT.closing.line3}
        </p>
      </div>

      <div className='rotate-[30deg] transform text-[26px] font-light'>/</div>
    </div>
  );
}
