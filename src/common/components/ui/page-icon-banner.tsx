'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';

// 아이콘 + 텍스트 page banner

export function PageIconBackground({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ImageProps) {
  return (
    <div className='relative h-[400px] w-full overflow-hidden text-white'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0'>
        <Image fill className='object-cover' priority {...props} />
      </div>
      {children}
    </div>
  );
}

// 배너 내부 icon, text

export function PageIcon({ text, ...props }: { text: string } & ImageProps) {
  return (
    <div className='relative z-10 flex h-full flex-col items-center justify-center text-center font-semibold'>
      <Image className='object-cover' priority {...props} />
      <p className='pt-[20px] text-[50px]'>{text}</p>
    </div>
  );
}
