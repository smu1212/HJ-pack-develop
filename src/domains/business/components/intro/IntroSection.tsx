import {
  INTRO,
  LABEL_CATEGORIES,
  PACKAGING_CATEGORIES,
} from '@domains/business/constants/intro.constant';

import CategoryGridCard from './CategoryGridCard';

export default function IntroSection() {
  return (
    <section id='intro'>
      <div className='relative w-full text-center'>
        {/* 타이틀 */}
        <div className='pt-[180px] text-[34px]'>
          <p>{INTRO.title}</p>
          <p className='font-bold'>{INTRO.boldTitle}</p>
        </div>

        {/* 포장재 card */}
        <CategoryGridCard
          categoryTitle='포장재 분야'
          categories={PACKAGING_CATEGORIES}
        />

        {/* 스티커, 라벨 card */}
        <CategoryGridCard
          categoryTitle='스티커·라벨 분야'
          categories={LABEL_CATEGORIES}
          titleBgColor='#ADE0FF'
        />
      </div>
    </section>
  );
}
