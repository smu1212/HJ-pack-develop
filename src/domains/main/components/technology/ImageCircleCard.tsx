'use client';

import Image from 'next/image';

type ImageCircleCardProps = {
  imgSrc: string;
  alt?: string;
};

export default function ImageCircleCard({
  imgSrc,
  alt = '이미지',
}: ImageCircleCardProps) {
  return (
    <div className='relative size-[480px]'>
      <div className='relative z-10 size-[480px] overflow-hidden rounded-full'>
        <Image src={imgSrc} alt={alt} fill priority className='object-cover' />
      </div>

      {/* 파란 원 그림자 */}
      <div className='absolute left-[20px] top-[20px] z-0 size-[480px]'>
        <Image
          src='/assets/images/blue_circle.svg'
          alt='파란 원'
          fill
          sizes='480px'
          className='object-contain'
        />
      </div>

      {/* 왼쪽 상단 빨간 원 */}
      <div className='absolute left-[20px] top-[60px] z-20 size-[60px]'>
        <Image
          src='/assets/images/red_circle.svg'
          alt='빨간 원'
          fill
          sizes='60px'
          className='object-contain'
        />
      </div>
    </div>
  );
}
