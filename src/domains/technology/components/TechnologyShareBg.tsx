// facility section과 process section이 공유하는 배경 이미지

import Image from 'next/image';

export default function TechnologyShareBg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative h-[3108px] w-full overflow-hidden'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0'>
        <Image
          src='/assets/images/technology_bg.png'
          alt='technology 배경 이미지'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Facility, Process Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
