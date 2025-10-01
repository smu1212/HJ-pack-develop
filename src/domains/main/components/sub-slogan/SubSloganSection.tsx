import Image from 'next/image';

import FadeUp from '@comp/FadeUp';

import SubCircleGroup from '@domains/main/components/sub-slogan/SubCircleGroup';
import { SUB_SLOGAN } from '@domains/main/constants/subSlogan.constant';

export default function SubSloganSection() {
  return (
    <div className='relative h-[960px] w-full bg-white py-[140px]'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0'>
        <Image
          src='/assets/images/sub_slogan.png'
          alt='Sub Slogan 배경 이미지'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Title, SubTitle 영역 */}
      <div className='relative z-10 flex h-full flex-col items-center justify-start whitespace-pre-line text-center'>
        <FadeUp>
          <p className='text-[40px] font-semibold'>{SUB_SLOGAN.title}</p>
          <p className='mt-[24px] text-[18px]'>{SUB_SLOGAN.subTitle}</p>

          {/* 원 + 선 그룹 */}
          <SubCircleGroup />

          {/* 하단 이미지 영역 */}
          <div className='relative mt-[40px] h-[300px] w-[1000px]'>
            <Image
              src='/assets/images/subslogan_preview.png'
              alt='미리보기 이미지'
              fill
              className='rounded-[200px] object-cover'
            />
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
