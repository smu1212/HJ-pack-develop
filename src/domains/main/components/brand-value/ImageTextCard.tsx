'use client';

import Image from 'next/image';

import type { BrandValueCard } from '@domains/main/constants/brandValue.constant';

export default function ImageTextCard({
  imageUrl,
  alt = 'card image',
  title,
  description,
}: BrandValueCard) {
  return (
    <div className='w-[345px] overflow-hidden text-start'>
      <div className='relative h-[370px]'>
        {/* 카드 이미지 */}
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes='345px'
          className='object-cover'
          priority
        />
      </div>

      <div className='h-[130px] justify-center bg-white p-[20px]'>
        {/* 카드 내 title */}
        <p className='text-[30px] font-bold text-[#3551A1]'>{title}</p>
      </div>
      {/* 카드 밖 description */}
      <p className='pt-[30px] text-[16px] text-white'>{description}</p>
    </div>
  );
}
