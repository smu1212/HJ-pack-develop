'use client';

import Image from 'next/image';

import { PageIcon, PageIconBackground } from '@comp/ui/page-icon-banner';

import { CERTIFICATIONS } from '@domains/brand/constants/certifications.constant';

export default function CertificationsSection() {
  return (
    <section id='certifications'>
      <div className='h-[1780px] w-full bg-white'>
        <PageIconBackground
          src='/assets/images/certifications_banner_bg.png'
          alt='인증 현황 배경 이미지'
        >
          <PageIcon
            src='/assets/images/certifications_banner_icon.png'
            alt='인증 현황 아이콘'
            width={63}
            height={58}
            text='품질과 신뢰, 수치로 증명합니다.'
          />
        </PageIconBackground>

        {/* 인증서 리스트 */}
        <div className='mx-auto flex max-w-[1200px] flex-wrap justify-center py-[70px]'>
          {CERTIFICATIONS.map((item, index) => (
            <div
              key={item.id}
              style={{ marginTop: `${(index % 4) * 80}px` }}
              className='w-[280px] px-[10px] text-center'
            >
              <Image
                src={item.certificationsSrc}
                alt={item.certificationsAlt}
                width={260}
                height={360}
                className='size-auto object-contain'
              />
              <p className='whitespace-pre-line pt-[14px] text-[14px] font-medium'>
                {item.certificationsAlt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
