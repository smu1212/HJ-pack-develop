'use client';

import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { cn } from '@util/index';

const arrowCircleButtonVariants = cva(
  'flex cursor-pointer items-center justify-center rounded-full border-[1.5px]',
  {
    variants: {
      variant: {
        blue: 'border-[#3551A1] text-[#3551A1]',
        white: 'border-white text-white',
      },
      size: {
        sm: 'h-[36px] w-[36px]',
        md: 'h-[42px] w-[42px]',
      },
    },
    defaultVariants: {
      variant: 'blue',
      size: 'sm',
    },
  },
);

type ArrowCircleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof arrowCircleButtonVariants>;

export function ArrowCircleButton({
  className,
  variant,
  size,
  ...props
}: ArrowCircleButtonProps) {
  return (
    <button
      type='button'
      className={cn(arrowCircleButtonVariants({ variant, size }), className)}
      {...props}
    >
      <ChevronRight className='h-[22px] w-[22px]' />
    </button>
  );
}
