'use client';

import Image from 'next/image';

import { BRAND_JOY_PACK } from '@domains/brand/constants/company.constant';

export default function CompanyJoyPack() {
  return (
    <section className='relative w-full bg-[#E3F1FF]'>
      {/* 콘텐츠 영역 */}
      <div className='flex h-[520px] items-center justify-center gap-[80px] px-[40px]'>
        {/* 조이팩 로고 */}
        <Image
          src='/assets/images/joypack_logo.png'
          alt='조이팩 로고'
          width={268}
          height={250}
          priority
          className='size-auto'
        />

        {/* 오른쪽 텍스트 */}
        <div className='max-w-[600px]'>
          {/* 상단 태그 */}
          <div className='inline-block rounded-full border border-[#3551A1] bg-white px-[36px] py-[6px] text-[22px] font-bold text-[#3551A1]'>
            Family Brand
          </div>

          {/* 제목 */}
          <p className='whitespace-pre-line pt-[36px] text-[36px] font-bold text-[#3551A1]'>
            {BRAND_JOY_PACK.title}
          </p>

          {/* 본문 */}
          <p className='whitespace-pre-line pt-[34px] text-[20px]'>
            {BRAND_JOY_PACK.subTitle}
          </p>
        </div>
      </div>

      {/* 하단 구분선 */}
      <div className='h-[10px] w-full bg-[#3551A1]' />
    </section>
  );
}
