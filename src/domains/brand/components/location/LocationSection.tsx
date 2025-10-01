'use client';

import Image from 'next/image';

import {
  BUSINESS_HOURS,
  CONTACT_LIST,
  LOCATION_INFO,
} from '@domains/brand/constants/location.constant';

export default function LocationSection() {
  return (
    <section id='location'>
      <div className='relative h-[1400px] bg-white py-[60px]'>
        {/* 배경 이미지 */}
        <div className='absolute inset-0'>
          <Image
            src='/assets/images/location_bg.png'
            alt='location 배경 이미지'
            fill
            className='object-cover'
            priority
          />
        </div>

        {/* Content */}
        <div className='relative z-10 flex h-full flex-col items-center justify-start whitespace-pre-line text-center'>
          <LocationTitleSection />
          {/* 지도 이미지 */}
          <MapImage />
          {/* 주소 */}
          <AddressInfo />
          {/* 연락처 및 영업시간 */}
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

function LocationTitleSection() {
  return (
    <>
      <p className='text-[50px] font-semibold'>오시는 길</p>
      <p className='pb-[40px] pt-[80px] text-[38px] text-[#3551A1] underline underline-offset-8'>
        언제든 여러분을 환영합니다
      </p>
    </>
  );
}

function MapImage() {
  return (
    <a
      href='https://naver.me/FLeDKXfy'
      target='_blank'
      rel='noopener noreferrer'
      title='네이버 지도'
    >
      <div className='relative h-[500px] w-[1080px] border border-black'>
        <Image
          src='/assets/images/location_content.png'
          alt='location 지도 이미지'
          fill
          className='object-cover'
          priority
        />
      </div>
    </a>
  );
}

function AddressInfo() {
  return (
    <div className='mx-auto flex max-w-[1080px] justify-between pt-[46px] text-[16px]'>
      <div className='w-[160px] text-[42px] font-bold'>Contact</div>

      <div className='flex w-[920px] flex-col items-end'>
        <p className='pb-[24px] text-[34px]'>{LOCATION_INFO.address}</p>

        <div className='flex items-start text-[26px] text-[#3551A1]'>
          <span className='pr-[20px] font-bold'>
            {LOCATION_INFO.guideTitle}
          </span>
          <span className='whitespace-pre-line text-left text-[18px] font-medium'>
            {LOCATION_INFO.guideDescription}
          </span>
        </div>
      </div>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className='mx-auto flex max-w-[1080px] gap-[60px] pt-[80px] text-left text-[22px]'>
      <div className='flex flex-col gap-[10px]'>
        {CONTACT_LIST.map((item) => (
          <div key={item.name} className='flex gap-[20px]'>
            <span className='w-[80px] font-bold text-[#3551A1]'>
              {item.name}
            </span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-[10px]'>
        {BUSINESS_HOURS.list.map((item, index) => (
          <div key={item.name} className='flex gap-[20px]'>
            <span className='w-[80px] font-bold text-[#3551A1]'>
              {index === 0 ? BUSINESS_HOURS.title : ''}
            </span>
            <span className='w-[80px] font-semibold'>{item.name}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
