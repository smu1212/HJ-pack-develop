'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  COMPANY_INFO,
  FOOTER_POLICIES,
} from '@common/constants/footer.constant';

export default function Footer() {
  return (
    <footer className='flex h-[300px] w-full items-center justify-between bg-black px-[200px] py-[40px] text-white'>
      <div className='text-[18px]'>
        {/* 회사 정보 (Tel, Fax, Address) */}
        <div className='flex flex-col'>
          {COMPANY_INFO.map(({ title, value }) => (
            <div
              key={title}
              className='flex w-[600px] justify-start gap-[46px]'
            >
              <div className='w-[80px]'>{title}</div>
              <div className='flex-1'>{value}</div>
            </div>
          ))}
        </div>

        {/* 약관/정책  */}
        <div className='mt-[40px] flex gap-[30px]'>
          {FOOTER_POLICIES.map(({ label, href }) => (
            <Link key={label} href={href} className='text-white underline'>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer 로고 */}
      <Image
        src='/assets/images/footer_logo.svg'
        alt='HJ-PACK footer logo'
        width={117}
        height={130}
        priority
      />
    </footer>
  );
}
