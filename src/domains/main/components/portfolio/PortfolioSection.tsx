'use client';

import Image from 'next/image';

import FadeUp from '@comp/FadeUp';

import { PORTFOLIO } from '@domains/main/constants/portfolio.constant';

import ClosingSection from '../closing/ClosingSection';
import PortfolioImageGrid from './PortfolioImageGrid';

export default function PortfolioSection() {
  return (
    <div className='relative h-[1680px] w-full py-[180px]'>
      {/* 배경 이미지 */}
      <Image
        src='/assets/images/portfolio_bg.png'
        alt='portfolio 배경 이미지'
        fill
        className='object-cover'
        priority
      />

      <div className='relative z-10 flex h-full flex-col items-center whitespace-pre-line text-center'>
        <FadeUp>
          {/* Title, SubTitle 영역 */}
          <p className='text-[46px] font-semibold'>{PORTFOLIO.title}</p>
          <p className='mt-[24px] text-[22px]'>{PORTFOLIO.subTitle}</p>
        </FadeUp>
        <PortfolioImageGrid />
        <ClosingSection />
      </div>
    </div>
  );
}
