'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import FadeUp from '@comp/FadeUp';
import { ArrowCircleButton } from '@comp/ui/arrow-circle-button';

import ImageTextCard from '@domains/main/components/brand-value/ImageTextCard';
import { BRAND_VALUE } from '@domains/main/constants/brandValue.constant';

export default function BrandValueSection() {
  const router = useRouter();

  const handleClick = () => {
    router.push(BRAND_VALUE.link);
  };

  return (
    <div className='relative h-[1600px] w-full py-[140px]'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0'>
        <Image
          src='/assets/images/brand_value_bg.png'
          alt='brand value 배경 이미지'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Title, SubTitle + 버튼 */}
      <div className='relative z-10 flex h-full flex-col justify-start whitespace-pre-line'>
        <FadeUp className='flex flex-col items-center text-center text-white'>
          <p className='text-[46px] font-semibold'>{BRAND_VALUE.title}</p>
          <p className='mt-[24px] text-[22px]'>{BRAND_VALUE.subTitle}</p>
          <div className='pt-[24px]'>
            <ArrowCircleButton variant='white' onClick={handleClick} />
          </div>
        </FadeUp>

        {/* 카드 영역 */}
        <div className='relative z-10 flex justify-center gap-[30px] pt-[100px]'>
          {BRAND_VALUE.cards.map((card, index) => (
            <FadeUp key={card.id} delayIndex={index}>
              <div style={{ paddingTop: `${80 * index}px` }}>
                <ImageTextCard {...card} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
