export interface BrandValueCard {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  alt?: string;
}

export interface BrandValueType {
  title: string;
  subTitle: string;
  link: string;
  cards: BrandValueCard[];
}

export const BRAND_VALUE: BrandValueType = {
  title: '다양한 브랜드와 함께 만든 \n 포장의 경험과 성과',
  subTitle:
    '혁진팩은 식품, 의약품, 프랜차이즈, 라이프스타일 브랜드 등 \n 다양한 업종의 고객들과 함께 고기능, 감성, 실용성을 겸비한 포장 솔루션을 만들어왔습니다. \n 경험이 만든 결과를 지금 확인해보세요.',
  link: '/business?section=cases',

  cards: [
    {
      id: 1,
      imageUrl: '/assets/images/brand_value_1.png',
      title: '고기능·고품질 \n 포장 인쇄 기술력',
      description:
        '고해상도 그라비아, 친환경 플렉소 인쇄 기술을 통해 \n 단순한 출력이 아닌 브랜드 품질을 표현하는 \n 인쇄 솔루션을 제공합니다.',
    },
    {
      id: 2,
      imageUrl: '/assets/images/brand_value_2.png',
      title: '소상공인을 위한 \n 접근 가능한 시스템',
      description:
        '소량 다품종 인쇄와 간편한 주문 시스템으로 \n 초기 브랜드와 1인 창업자도 전문가 수준의 \n 인쇄 환경을 경험할 수 있습니다.',
    },
    {
      id: 3,
      imageUrl: '/assets/images/brand_value_3.png',
      title: '지속 가능한 소재 전환과 \n 친환경 대응',
      description:
        '친환경 수성잉크, 재활용 가능한 소재 중심의 \n 포장 개발로 환경 부담을 줄이고, 미래 세대를 위한 \n h순환 인쇄 생태계를 추구합니다.',
    },
  ],
};
