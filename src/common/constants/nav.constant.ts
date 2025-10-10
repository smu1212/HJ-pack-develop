export interface NavMenusType {
  name: string;
  path: string;
  submenus: { name: string; path: string }[];
}

export const NAV_MENUS: NavMenusType[] = [
  {
    name: 'Brand',
    path: '/brand',
    submenus: [
      { name: '회사소개', path: '/brand?section=company' },
      { name: '연혁', path: '/brand?section=history' },
      { name: '조직도', path: '/brand?section=org-chart' },
      { name: '인증현황', path: '/brand?section=certifications' },
      { name: '오시는 길', path: '/brand?section=location' },
    ],
  },
  {
    name: 'Technology',
    path: '/technology',
    submenus: [
      { name: '시설 소개', path: '/technology?section=facility' },
      { name: '생산 공정', path: '/technology?section=process' },
      { name: '시스템/기술역량', path: '/technology?section=tech-capability' },
    ],
  },
  {
    name: 'Business',
    path: '/business',
    submenus: [
      { name: '사업 소개', path: '/business?section=intro' },
      { name: '주요 매출처', path: '/business?section=clients' },
      { name: '협력사', path: '/business?section=partners' },
      { name: '기타 사례', path: '/business?section=cases' },
    ],
  },
  {
    name: 'Shop',
    path: '/shop',
    submenus: [],
  },
  {
    name: 'Support',
    path: '/support',
    submenus: [
      { name: '견적문의', path: '/support?section=estimate' },
      { name: '공지사항', path: '/support/notice' },
    ],
  },
];
