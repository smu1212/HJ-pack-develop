export interface CompanyInfoType {
  name: string;
  value: string;
}

export interface JoyPackType {
  title: string;
  subTitle: string;
}

export const BRAND_COMPANY_INFO: CompanyInfoType[] = [
  { name: '회사명', value: '(주)혁진팩' },
  { name: '대표자명', value: '강미영' },
  { name: '설립일', value: '2008년 6월 1일' },
  { name: '소재지', value: '전라남도 담양군 담양읍 에코산단2로 20' },
  { name: '업태/업종', value: '제조, 도매업 / 그라비아인쇄, 무역업' },
  { name: '주요 사업', value: '식품포장재 인쇄 및 가공, 맞춤형 포장솔루션' },
  { name: '임직원 수', value: '30명' },
  { name: '자본금', value: '300,000,000원' },
  { name: '전화번호', value: 'T. 061-392-0039' },
  { name: '팩스번호', value: 'F. 061-392-0093' },
];

export const BRAND_JOY_PACK: JoyPackType = {
  title: '디자인에서 포장까지, \n 브랜드에 감성을 입히다.',
  subTitle:
    '조이팩은 혁진팩의 패밀리브랜드로, \n 소량 다품종 시대에 맞춘 감각적 디자인 중심의 포장 전문 브랜드입니다. \n \n 고객의 제품에 어울리는 패키지 디자인 기획부터 소재 제안, 인쇄까지 \n 브랜드의 톤앤매너에 맞는 일괄형 솔루션을 제공합니다.',
};
