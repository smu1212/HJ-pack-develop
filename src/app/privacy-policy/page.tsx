'use client';

import React from 'react';

import Footer from '@comp/Footer';
import Header from '@comp/Header';

import { PRIVACY_POLICY } from '@common/constants/privacyPolicy.constant';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className='mx-auto max-w-[1200px] bg-white p-[200px]'>
        <p className='text-[46px] font-bold'>개인정보 처리 방침</p>

        {PRIVACY_POLICY.map(({ title, content }) => (
          <div key={title} className='pt-[40px]'>
            <p className='text-[24px] font-semibold'>{title}</p>
            <p className='whitespace-pre-line pt-[20px] text-[16px] text-gray-700'>
              {content}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
