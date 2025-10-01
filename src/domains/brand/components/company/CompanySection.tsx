import Image from 'next/image';

import { BRAND_COMPANY_INFO } from '@domains/brand/constants/company.constant';

import CompanyJoyPack from './CompanyJoyPack';

export default function CompanySection() {
  return (
    <section id='company'>
      <div className='relative h-[1400px] w-full bg-white py-[140px]'>
        {/* 배경 이미지 */}
        <div className='absolute inset-0'>
          <Image
            src='/assets/images/company_bg.png'
            alt='company 배경 이미지'
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='relative z-10 mx-auto flex w-[1200px] flex-col items-center'>
          {/* 로고 영역 */}
          <Image
            src='/assets/images/hjpack_logo.svg'
            alt='혁진팩 로고'
            width={384}
            height={96}
            style={{ width: '384px', height: '96px' }}
            priority
          />

          <div className='flex w-full max-w-[1100px] justify-between pt-[120px]'>
            {/* 좌측 인사말 */}
            <div className='whitespace-pre-line text-[36px] font-bold text-[#1C4DA1]'>
              {`안녕하세요, \n 브랜드를 완성하는 \n 혁진팩입니다.`}
            </div>

            {/* 우측 내용 */}
            <div className='w-[640px] whitespace-pre-line text-[22px] leading-relaxed'>
              {`혁신적인 인쇄 파트너 `}
              <span className='font-bold'>혁진팩</span>
              {`은 \n 누구나 쉽게 인쇄를 시작할 수 있는 세상을 만들기 위해 시작됐습니다.

              디자인부터 인쇄, 포장까지, `}
              <span className='font-bold'>빠르고 간편한 원스톱 솔루션</span>
              {`으로 \n 소상공인과 브랜드의 성장을 함께합니다. \n \n 풀패키징 솔루션을 제공하는 혁진팩과 함께 \n 당신의 브랜드에 어울리는 옷을 입히는 인쇄를 만들어 갑니다. \n \n항상 고객의 입장과 관점에서 생각하며, \n 고객사의 성공 가능성을 높이는 데 함께 하겠습니다.`}

              <p className='pt-[40px] font-bold text-[#3551A1] underline underline-offset-8'>
                ㈜혁진팩 임직원 일동
              </p>

              {/* 하단 회사개요 */}
              <div className='grid max-w-[700px] grid-cols-3 pt-[120px]'>
                <p className='text-[36px] font-bold text-[#3551A1]'>회사개요</p>

                <div className='col-span-2 pt-[8px] text-[18px] font-semibold'>
                  {BRAND_COMPANY_INFO.map((item) => (
                    <div key={item.name} className='flex pb-[6px]'>
                      <p className='w-[120px]'>{item.name}</p>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CompanyJoyPack />
    </section>
  );
}
