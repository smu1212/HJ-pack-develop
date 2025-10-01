export interface IntroType {
  title: string;
  boldTitle: string;
}

export interface CategoryType {
  title: string;
  description: string;
  image: string;
}

export const INTRO: IntroType = {
  title: '다양한 산업에, 가장 알맞은 형태로',
  boldTitle: '포장재와 라벨을 제공합니다.',
};

export const PACKAGING_CATEGORIES: CategoryType[] = [
  {
    title: '농산물, 애호박 포장재',
    description: '신선도와 제품 특성을 살린 \n 맞춤 포장',
    image: '/assets/images/packaging/packaging_1.png',
  },
  {
    title: '김,해산물 포장재',
    description: '방습·산소차단 기능으로 \n 해산물 보존력 강화',
    image: '/assets/images/packaging/packaging_2.png',
  },
  {
    title: '건조식품류 포장재',
    description: '습기 유입 방지를 위한 \n 다층 구조 필름 적용',
    image: '/assets/images/packaging/packaging_3.png',
  },
  {
    title: '장류,절임류 포장재',
    description: '내염성 및 내용물 누수 방지 \n 특수 코딩 포장',
    image: '/assets/images/packaging/packaging_4.png',
  },

  {
    title: '냉동식품, 빙과류 포장재',
    description: '저온 안정성 확보 및 \n 내구성 강화 포장',
    image: '/assets/images/packaging/packaging_5.png',
  },

  {
    title: '면류, 조미식품류 포장재',
    description: '다양한 분말·건조 제품에 \n 적합한 내포장',
    image: '/assets/images/packaging/packaging_6.png',
  },

  {
    title: '순두부 진공포장',
    description: '밀봉력과 위생성을 극대화한 \n 진공 밀폐 포장',
    image: '/assets/images/packaging/packaging_7.png',
  },

  {
    title: '의약품, 사료 포장재',
    description: '보건용 또는 산업용 \n 기준에 맞춘 안전 포장',
    image: '/assets/images/packaging/packaging_8.png',
  },

  {
    title: '농업용 포장재',
    description: '비료·종자 등 특수 포장재 \n 적용이 필요한 제품군',
    image: '/assets/images/packaging/packaging_9.png',
  },

  {
    title: '레토르트 식품 파우치류 \n 포장재',
    description: '고온 살균에도 견디는 \n 내열 파우치',
    image: '/assets/images/packaging/packaging_10.png',
  },

  {
    title: '제과, 스낵, 종합선물류 \n 포장재',
    description: '디자인과 실용성 모두를 고려한 \n 고급 패키지',
    image: '/assets/images/packaging/packaging_11.png',
  },

  {
    title: 'OEM 맞춤형 브랜드 포장재',
    description: '고객 브랜드 특성에 맞춘 \n 차별화된 디자인 포장',
    image: '/assets/images/packaging/packaging_12.png',
  },
];

export const LABEL_CATEGORIES: CategoryType[] = [
  {
    title: '친환경 스티커',
    description: '생분해성 또는 재활용 소재로 \n 제작된 환경 친환경 라벨 ',
    image: '/assets/images/label/label_1.png',
  },
  {
    title: '자동라벨 부착용 롤라벨 ',
    description: '자동화 생산라인에 적합한 \n 고속 부착 전용 라벨',
    image: '/assets/images/label/label_2.png',
  },
  {
    title: '바코드 프린터용 롤라벨',
    description: '유통·물류용 실시간 바코드 \n 출력 대응 라벨 ',
    image: '/assets/images/label/label_3.png',
  },
  {
    title: '프린터기용 A4라벨',
    description: '사무용 및 소규모 브랜드용 \n A4 규격 스티커',
    image: '/assets/images/label/label_4.png',
  },

  {
    title: '보안라벨',
    description: '개봉 여부를 확인할 수 있는 \n 봉인·보안 기능 라벨',
    image: '/assets/images/label/label_5.png',
  },
  {
    title: '넘버링 라벨',
    description: '일렬번호 등 고유 식별 정보 \n 삽입이 가능한 라벨',
    image: '/assets/images/label/label_6.png',
  },

  {
    title: '부분점착 라벨',
    description: '일부만 점착되는 형태로 \n 분리와 재부착이 쉬운 라벨',
    image: '/assets/images/label/label_7.png',
  },

  {
    title: '특수점착 라벨',
    description: '냉동·고온 울퉁불퉁한 면에 \n 강한 접착력 제공',
    image: '/assets/images/label/label_8.png',
  },

  {
    title: '금박, 형압 라벨',
    description: '프리미엄 제품에 어울리는 \n 시각적·촉각적 효과 라벨',
    image: '/assets/images/label/label_9.png',
  },
  {
    title: '실크인쇄 라벨',
    description: '고급스러운 질감 표현이 가능한 \n 실크 방식 인쇄 라벨',
    image: '/assets/images/label/label_10.png',
  },
  {
    title: 'POP 점착 라벨',
    description: '매장 진열용 홍보 및 \n 광고 목적의 부착 라벨',
    image: '/assets/images/label/label_11.png',
  },

  {
    title: 'QR/인증·이력 추적 라벨',
    description: '제품 정보·정품 인증·이력 \n 관리가 가능한 스마트 라벨',
    image: '/assets/images/label/label_12.png',
  },
];
