'use client';

import {
  ChevronLeft,
  ChevronRight,
  CirclePause,
  CirclePlay,
} from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type SlideControllerProps = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  total: number;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

export default function SlideController({
  currentIndex,
  setCurrentIndex,
  total,
  isPlaying,
  setIsPlaying,
}: SlideControllerProps) {
  // 자동재생 ON/OFF 토글
  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  // 이전 슬라이드로 이동 (순환)
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // 다음 슬라이드로 이동 (순환)
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className='absolute bottom-[100px] left-[200px] z-20 flex items-center gap-[12px] text-white'>
      {/* 재생/일시정지 버튼 */}
      <button
        type='button'
        onClick={handlePlayToggle}
        title={isPlaying ? '일시정지' : '재생'}
        className='cursor-pointer'
      >
        {isPlaying ? (
          <CirclePause size={45} strokeWidth={1} />
        ) : (
          <CirclePlay size={45} strokeWidth={1} />
        )}
      </button>

      {/* 현재 인덱스 표시 */}
      <span className='text-[20px]'>
        {currentIndex + 1} / {total}
      </span>

      {/* 슬라이드 이전 버튼 */}
      <button
        type='button'
        onClick={goPrev}
        title='이전'
        className='cursor-pointer'
      >
        <ChevronLeft size={40} strokeWidth={1} />
      </button>

      {/* 버튼 사이 구분선 */}
      <div className='h-[24px] w-[1px] bg-white opacity-50' />

      {/* 슬라이드 다음 버튼 */}
      <button
        type='button'
        onClick={goNext}
        title='다음'
        className='cursor-pointer'
      >
        <ChevronRight size={40} strokeWidth={1} />
      </button>
    </div>
  );
}
