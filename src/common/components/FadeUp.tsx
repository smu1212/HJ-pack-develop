'use client';

import type { HTMLMotionProps, Variants } from 'framer-motion';

import { motion } from 'framer-motion';

import { cn } from '@util/index';

type FadeUpProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  mode?: 'scroll' | 'always';
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: (delayIndex: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delayIndex * 0.4,
      duration: 2,
      ease: 'easeOut',
      type: 'spring',
    },
  }),
};

export default function FadeUp({
  children,
  className,
  delayIndex = 0,
  mode = 'scroll',
  ...props
}: FadeUpProps) {
  const motionProps = {
    className: cn(className),
    variants: fadeUpVariant,
    initial: 'hidden',
    custom: delayIndex,
    ...props,
  };

  // scroll: 스크롤 진입 시, always: 무조건 실행

  if (mode === 'always') {
    return (
      <motion.div animate='visible' {...motionProps}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
