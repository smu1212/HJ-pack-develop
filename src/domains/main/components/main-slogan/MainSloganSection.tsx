'use client';

import Image from 'next/image';
import { useState } from 'react';

import FadeUp from '@comp/FadeUp';

import SlideController from '@domains/main/components/main-slogan/SlideController';
import { MAIN_SLOGAN_SLIDES } from '@domains/main/constants/mainSlogan.constant';
import { useAutoSlide } from '@domains/main/hooks/useAutoSlide';
import { cn } from '@util/index';

export default function MainSloganSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slide = MAIN_SLOGAN_SLIDES[currentIndex];

  // 자동 슬라이드 Hooks 사용

  useAutoSlide({
    isPlaying,
    onNext: () =>
      setCurrentIndex((prev) => (prev + 1) % MAIN_SLOGAN_SLIDES.length),
    delay: 5000,
  });

  return (
    <div className='relative h-screen w-full'>
      {MAIN_SLOGAN_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.media}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0',
            )}
          >
            {slide.type === 'video' ? (
              <video
                src={slide.media}
                autoPlay
                muted
                loop
                playsInline
                className='h-full w-full object-cover'
              />
            ) : (
              <Image
                src={slide.media}
                alt='Main Slogan 배경 이미지'
                fill
                className='object-cover'
                loading='eager'
              />
            )}
          </div>
        );
      })}

      {/* Title, SubTitle 영역 */}
      <div className='relative z-20 flex h-full flex-col items-center justify-center whitespace-pre-line text-center text-white'>
        <FadeUp key={currentIndex} mode='always'>
          <p className='text-[40px] font-semibold'>{slide.title}</p>
          <p className='mt-[24px] text-[18px]'>{slide.subTitle}</p>
        </FadeUp>
      </div>

      {/* 슬라이드 그룹 */}
      <SlideController
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        total={MAIN_SLOGAN_SLIDES.length}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}
