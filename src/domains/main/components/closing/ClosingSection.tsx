// PortfolioSection 내에서 사용됨

import { CLOSING } from '@domains/main/constants/closing.constant';

export default function ClosingSection() {
  return (
    <div className='relative flex flex-col items-center justify-center pt-[120px]'>
      {/* 상단 슬래시 */}
      <div className='rotate-[30deg] transform text-[26px] font-light'>/</div>

      <div className='p-[20px]'>
        <div className='flex text-[36px]'>
          <span>{CLOSING.title}</span>
          <span className='font-bold'>&nbsp;{CLOSING.boldTitle}</span>
        </div>

        <p className='pt-[20px] text-[60px] leading-none'>{CLOSING.subTitle}</p>
        <p className='text-[60px] font-bold text-[#E95539]'>
          {CLOSING.redSubTitle}
        </p>
      </div>
      {/* 하단 슬래시 */}
      <div className='rotate-[30deg] transform text-[26px] font-light'>/</div>
    </div>
  );
}
