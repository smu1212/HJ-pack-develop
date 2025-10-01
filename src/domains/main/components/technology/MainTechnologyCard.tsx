'use client';

import { useRouter } from 'next/navigation';

import type { MainTechnologyCardType } from '@domains/main/constants/mainTechnology.constant';

import { ArrowCircleButton } from '@comp/ui/arrow-circle-button';

import ImageCircleCard from '@domains/main/components/technology/ImageCircleCard';
import { cn } from '@util/index';

export default function MainTechnologyCard({
  id,
  imgSrc,
  alt,
  title,
  subtitle,
  descriptionTitle,
  description,
  caption,
  link,
}: MainTechnologyCardType) {
  const router = useRouter();
  const isOdd = id % 2 === 1;

  const handleClick = () => {
    router.push(link);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-[80px]',
        isOdd && 'flex-row-reverse',
      )}
    >
      {/* 원형 이미지 카드 */}
      <ImageCircleCard imgSrc={imgSrc} alt={alt} />

      {/* 텍스트 카드 영역 */}
      <div className='max-w-[500px] whitespace-pre-line'>
        {/* 타이틀, 서브타이틀 */}
        <div className='font-bold text-[#3551A1]'>
          <p className='text-[48px]'>{title}</p>
          <p className='pt-[4px] text-[20px]'>{subtitle}</p>
        </div>

        {/* 설명 제목 및 본문 */}
        <p className='pt-[40px] text-[28px]'>{descriptionTitle}</p>
        <p className='pt-[16px] text-[16px]'>{description}</p>

        {/* 캡션 (회색 텍스트) */}
        <p className='pt-[24px] text-[14px] font-semibold text-[#646464]'>
          {caption}
        </p>

        {/* Arrow 버튼 */}
        <div className='pt-[24px]'>
          <ArrowCircleButton onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
