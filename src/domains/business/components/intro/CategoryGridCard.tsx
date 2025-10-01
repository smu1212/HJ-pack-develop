import Image from 'next/image';

import type { CategoryType } from '@domains/business/constants/intro.constant';

type CategoryProps = {
  categoryTitle: string;
  categories: CategoryType[];
  titleBgColor?: string;
};

export default function CategoryGridCard({
  categoryTitle,
  categories,
  titleBgColor = '#D6E4FF',
}: CategoryProps) {
  return (
    <div className='relative w-full py-[140px]'>
      {/* 카테고리 타이틀 */}
      <span
        className='inline-block rounded-[40px] px-[32px] py-[4px] text-[34px] font-bold text-[#3551A1]'
        style={{ backgroundColor: titleBgColor }}
      >
        {categoryTitle}
      </span>

      {/* grid card content */}
      <div className='mx-auto flex max-w-[1200px] flex-wrap justify-center gap-y-[60px] pt-[80px]'>
        {categories.map((item) => (
          <div
            key={item.title}
            className='flex w-[280px] flex-col items-center'
          >
            <p className='flex h-[70px] items-center justify-center whitespace-pre-line text-center text-[24px] font-bold leading-tight text-[#3551A1]'>
              {item.title}
            </p>

            <div className='mb-[10px] h-[1px] w-[260px] bg-[#355194]' />

            <Image
              src={item.image}
              alt={item.title}
              width={260}
              height={130}
              className='size-auto object-cover'
            />

            <p className='whitespace-pre-line pt-[20px] text-[20px]'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
