'use client';

import Image from 'next/image';

import { PORTFOLIO_IMAGES } from '@domains/main/constants/portfolio.constant';

export default function PortfolioImageGrid() {
  return (
    <div className='relative flex w-full flex-col items-center pt-[54px]'>
      {/* 상단 선 */}
      <div className='h-[2px] w-[1100px] bg-black' />

      {/* 이미지 그리드 */}
      <div className='grid w-[1100px] grid-cols-3 gap-[14px] py-[20px]'>
        {PORTFOLIO_IMAGES.map((image) => (
          <div key={image.id} className='relative aspect-[3/2] w-full'>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className='object-cover'
            />
          </div>
        ))}
      </div>

      {/* 하단 선 */}
      <div className='h-[2px] w-[1100px] bg-black' />
    </div>
  );
}
