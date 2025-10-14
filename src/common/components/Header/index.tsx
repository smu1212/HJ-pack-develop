'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import SubMenuGroup from '@common/components/Header/SubMenuGroup';
import { NAV_MENUS } from '@common/constants/nav.constant';
import { cn } from '@util/index';

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isMainHeader = pathname === '/' && !isHovered;

  return (
    <header
      className={cn(
        'absolute left-0 top-0 z-50 w-full overflow-hidden px-[60px] transition-all duration-300 ease-in-out',
        isHovered ? 'h-[400px] bg-white' : 'h-[120px]',
        !isMainHeader && 'bg-white',
      )}
    >
      <div
        className='group flex justify-between py-[40px]'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href='/'
          className='relative h-[30px] w-[144px]'
        >
          <Image
            src={isMainHeader ? '/assets/images/hjpack_logo_main.svg' : '/assets/images/hjpack_logo.svg'}
            alt='logo'
            fill
            className='object-contain'
            priority
          />
        </Link>

        <nav className='flex justify-center gap-[140px] text-[20px]'>
          {NAV_MENUS.map((menu) => (
            <SubMenuGroup
              key={menu.name}
              menu={menu}
              isHovered={isHovered}
              isMainHeader={isMainHeader}
            />
          ))}
        </nav>

        <div className='relative h-[24px] w-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <Image
            src='/assets/icons/menu-icon.svg'
            alt='menu icon'
            fill
            className='object-contain'
          />
        </div>
      </div>

      <div
        className={cn(
          'absolute left-0 top-[120px] w-full border-t border-[#C8C8C8] transition-all duration-300 ease-in-out',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
      />
    </header>
  );
}
