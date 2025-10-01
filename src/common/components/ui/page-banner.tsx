'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';

// depth1 페이지 시작 시 상단에 위치하는 page banner

export function PageBannerBackground({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ImageProps) {
  return (
    <div className='relative mt-[118px] h-[400px] w-full overflow-hidden text-white'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0'>
        <Image fill className='object-cover' priority {...props} />
      </div>
      {children}
    </div>
  );
}

// 배너 내부 title, sub title

export function PageBannerContent({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className='relative z-10 flex h-full flex-col items-center justify-center whitespace-pre-line text-center font-semibold'>
      <p className='text-[42px]'>{title}</p>
      <p className='pt-[20px] text-[24px]'>{subTitle}</p>
    </div>
  );
}
