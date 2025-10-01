export interface MainSloganSlide {
  title: string;
  subTitle: string;
  media: string;
  type: 'image' | 'video';
}

export const MAIN_SLOGAN_SLIDES: MainSloganSlide[] = [
  {
    title: '실력의 진심을 통해 \n 포장의 새로운 기준을 만듭니다.',
    subTitle:
      '혁진팩은 누구나 쉽게 시작할 수 있는 인쇄 시스템으로 \n 브랜드 가치를 높이는 포장 솔루션을 제공합니다.',
    media: '/assets/images/main_slogan_1.png',
    type: 'image',
  },
  {
    title: '작은 시작이 \n 브랜드를 만듭니다.',
    subTitle:
      '혁진팩은 소량부터 대량까지 유연하게 대응하는 생산 시스템으로 \n 초기 창업자와 소상공인의 브랜드 성장을 함께합니다.',
    media: '/assets/videos/main_slogan_2.mp4',
    type: 'video',
  },
  {
    title: '지속 가능한 포장은 \n 더 나은 선택에서 시작됩니다.',
    subTitle:
      '혁진팩은 수성잉크 기반의 플렉소 인쇄 기술을 통해 \n 친환경적인 생산 방식을 실현하며, 미래를 위한 가치를 만들어갑니다.',
    media: '/assets/images/main_slogan_3.jpg',
    type: 'image',
  },
  {
    title: '함께 만든 포장은 \n 함께 자라는 브랜드가 됩니다.',
    subTitle:
      '혁진팩은 단순한 인쇄를 넘어 고객의 파트너로서 \n 브랜드의 정체성과 스토리를 담아내는 포장을 함께 설계합니다.',
    media: '/assets/images/main_slogan_4.jpg',
    type: 'image',
  },
];
