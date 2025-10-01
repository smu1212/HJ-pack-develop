import { useEffect } from 'react';

interface AutoSlideProps {
  isPlaying: boolean;
  onNext: () => void;
  delay?: number;
}

export function useAutoSlide({
  isPlaying,
  onNext,
  delay = 5000,
}: AutoSlideProps) {
  useEffect(() => {
    // 자동 전환 비활성화 조건
    if (!isPlaying) return;

    const timer = setInterval(() => {
      onNext();
    }, delay);

    return () => clearInterval(timer);
  }, [isPlaying, delay, onNext]);
}
