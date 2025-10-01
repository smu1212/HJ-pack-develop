import Image from 'next/image';

import { CLIENTS_TEXT } from '@domains/business/constants/clients.constant';

export default function ClientsSection() {
  return (
    <section id='clients'>
      <div className='relative h-[1400px] w-full py-[120px]'>
        <div className='flex flex-col items-center text-center'>
          <div className='rotate-[30deg] transform text-[26px] font-light'>
            /
          </div>

          {/* title */}
          <div className='p-[20px] text-[60px]'>
            <p className='pt-[20px] leading-none'>{CLIENTS_TEXT.title.line1}</p>
            <p className='font-bold text-[#3551A1]'>
              {CLIENTS_TEXT.title.line2}
            </p>
          </div>

          <div className='rotate-[30deg] transform text-[26px] font-light'>
            /
          </div>

          {/* sub title */}
          <p className='whitespace-pre-line pb-[60px] pt-[60px] text-[24px]'>
            {CLIENTS_TEXT.subtitle}
          </p>

          {/* 임시 이미지 (혁진팩 측 취합 전) */}
          <Image
            src='/assets/images/clients_content.png'
            alt=''
            width={950}
            height={541}
            className='size-auto object-contain'
          />
        </div>
      </div>
    </section>
  );
}
