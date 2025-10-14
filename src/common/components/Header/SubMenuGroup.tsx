'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@util/index';

type SubMenuGroupProps = {
  menu: {
    name: string;
    path: string;
    submenus: { name: string; path: string }[];
  };
  isHovered: boolean;
  isMainHeader: boolean;
};

export default function SubMenuGroup({
  menu,
  isHovered,
  isMainHeader,
}: SubMenuGroupProps) {
  const router = useRouter();

  const handleNavigate = (fullPath: string) => {
    router.push(fullPath);
  };

  return (
    <div className='flex flex-col items-center'>
      {/* main menu 버튼 */}
      <button
  type='button'
  onClick={() => {
    if (menu.path.startsWith('/support')) {
      localStorage.setItem('currentStep', '1'); // 항상 Estimate1
    }
    handleNavigate(menu.path);
  }}
  className={cn(
    'cursor-pointer pb-[90px] font-bold hover:text-[#FF5A3D]',
    isMainHeader ? 'text-white' : 'text-black',
  )}
>
  {menu.name}
</button>

      {/* sub menu 리스트 (hover 시 표시) */}
      {menu.submenus.length > 0 && (
        <ul
          className={cn(
            'flex flex-col items-center gap-[20px] text-[16px] transition-opacity duration-300',
            isHovered ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        >
          {menu.submenus.map((submenu) => (
            <li key={submenu.name}>
              <button
                type='button'
                onClick={() => {
                  // Support 메뉴 클릭 시 Estimate1 초기화
                  if (submenu.path.startsWith('/support')) {
                    localStorage.setItem('currentStep', '1');
                  }
                  handleNavigate(submenu.path);
                }}
                className='cursor-pointer hover:text-[#FF5A3D]'
              >
                {submenu.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
