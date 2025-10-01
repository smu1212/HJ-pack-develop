'use client';

import { cn } from '@util/index';

type BlueVariantProps = {
  variant: 'blue';
  title: string;
  value?: string;
};

type RedVariantProps = {
  variant: 'red';
  title: string;
  subTitle: string;
  label: string;
};

type PlusInfoCardProps = BlueVariantProps | RedVariantProps;

export default function PlusInfoCard(props: PlusInfoCardProps) {
  const isBlue = props.variant === 'blue';

  // plus card 색상 (blue/red)
  const cardColor = isBlue ? '#3551A1' : '#E95539';

  return (
    <div className='flex items-center'>
      {/* 좌우 구분선 */}
      <div
        className={cn('w-[1px]', isBlue ? 'h-[130px]' : 'h-[180px]')}
        style={{ backgroundColor: cardColor }}
      />

      {/* 카드 내용 */}
      <div
        className={cn(
          'relative mx-[10px] flex flex-col items-center justify-center bg-[#F8F8F8]',
          isBlue
            ? 'h-[130px] w-[300px] text-[#3551A1]'
            : 'h-[180px] w-[456px] text-[#E95539]',
        )}
      >
        <span className='absolute top-[-24px] text-[30px] font-bold'>+</span>

        {isBlue ? (
          <>
            <span className='pt-[10px] text-[24px] font-bold'>
              {props.title}
            </span>
            <span className='text-[44px]'>{props.value}</span>
          </>
        ) : (
          <>
            <span className='pt-[8px] text-[30px] font-bold'>
              {props.title}
            </span>
            <span className='text-[24px]'>{props.subTitle}</span>
            <span className='pt-[12px] text-[20px] font-semibold text-[#B7B7B7]'>
              {props.label}
            </span>
          </>
        )}
      </div>

      {/* 좌우 구분선 */}
      <div
        className={cn('w-[1px]', isBlue ? 'h-[130px]' : 'h-[180px]')}
        style={{ backgroundColor: cardColor }}
      />
    </div>
  );
}
