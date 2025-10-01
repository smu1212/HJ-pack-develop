export interface MainTechnologyCardType {
  id: number;
  imgSrc: string;
  alt: string;
  title: string;
  subtitle: string;
  descriptionTitle: string;
  description: string;
  caption: string;
  link: string;
}

export const MAIN_TECHNOLOGY_CARDS: MainTechnologyCardType[] = [
  {
    id: 1,
    imgSrc: '/assets/images/main_technology_1.png',
    alt: '그라비아 인쇄 이미지',
    title: 'Gravure Printing',
    subtitle: '그라비아 인쇄 기술',
    descriptionTitle: '고해상도 표현력으로 브랜드를 돋보이게',
    description:
      '그라비아 인쇄는 선명하고 섬세한 이미지 표현에 최적화된 방식입니다. \n 대량 생산에 유리하며, 포장재의 디테일을 살리는 고급 인쇄에 주로 사용됩니다.\n 혁진팩은 고속 자동화 설비를 기반으로 안정적이고 균일한 품질을 제공합니다.',
    caption:
      '• 대표제품 | 식품 포장재, 의약품 포장, 고급 라벨 등 \n • 보유장비 | 고속 그라비아 인쇄기, 리와인더, 라미네이팅 설비 등',
    link: '/technology?section=process',
  },
  {
    id: 2,
    imgSrc: '/assets/images/main_technology_2.png',
    alt: '플렉소 인쇄 이미지',
    title: 'Flexographic Printing',
    subtitle: '플렉소 인쇄 기술',
    descriptionTitle: '친환경 수성잉크 기반의 유연한 인쇄 기술',
    description:
      '플렉소 인쇄는 빠른 건조와 친환경 수성잉크를 활용하여 \n 다양한 소재와 구조에 대응 가능한 인쇄 기술입니다.',
    caption:
      '• 대표제품 | 스티커 라벨, 배송용 포장, 종이·필름류 포장재 등 \n • 보유장비 I Flexo BEF-450 외 특수 후가공 장비 보유',
    link: '/technology?section=process',
  },
  {
    id: 3,
    imgSrc: '/assets/images/main_technology_3.png',
    alt: '쇼핑몰 이미지',
    title: 'Shop-mall',
    subtitle: '쇼핑몰',
    descriptionTitle:
      '포장 인쇄를 더 쉽고 빠르게, \n 혁진팩 쇼핑몰에서 시작하세요.',
    description:
      '혁진팩의 온라인 쇼핑몰은 누구나 편하게 스티커, 포장지, 봉투 등 \n 다양한 인쇄 제품을 직접 고르고 주문할 수 있습니다.',
    caption:
      '브랜드별 인기 제품, 맞춤형 디자인 옵션도 제공하여 \n 누구든지 전문가처럼 쉽게 시작할 수 있는 공간입니다.',
    link: '/shop',
  },
];
