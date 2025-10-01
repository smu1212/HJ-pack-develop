export interface PortfolioTitleType {
  title: string;
  subTitle: string;
}

export interface PortfolioImageType {
  id: number;
  src: string;
  alt: string;
}

export const PORTFOLIO: PortfolioTitleType = {
  title: '다양한 브랜드와 함께 만든 \n 포장의 경험과 성과',
  subTitle:
    '혁진팩은 식품, 의약품, 프랜차이즈, 라이프스타일 브랜드 등 \n 다양한 업종의 고객들과 함께 고기능, 감성, 실용성을 겸비한 포장 솔루션을 만들어왔습니다. \n 경험이 만든 결과를 지금 확인해보세요.',
};

export const PORTFOLIO_IMAGES: PortfolioImageType[] = [
  { id: 1, src: '/assets/images/portfolio_1.png', alt: '기업 가치 이미지 1' },
  { id: 2, src: '/assets/images/portfolio_2.png', alt: '기업 가치 이미지 2' },
  { id: 3, src: '/assets/images/portfolio_3.png', alt: '기업 가치 이미지 3' },
  { id: 4, src: '/assets/images/portfolio_4.png', alt: '기업 가치 이미지 4' },
  { id: 5, src: '/assets/images/portfolio_5.png', alt: '기업 가치 이미지 5' },
  { id: 6, src: '/assets/images/portfolio_6.png', alt: '기업 가치 이미지 6' },
];
