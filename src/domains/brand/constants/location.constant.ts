export interface LocationInfoType {
  address: string;
  guideTitle: string;
  guideDescription: string;
}

export interface ContactInfoType {
  name: string;
  value: string;
}
export interface BusinessHoursType {
  title: string;
  list: {
    name: string;
    value: string;
  }[];
}

export const LOCATION_INFO: LocationInfoType = {
  address: '전라남도 담양군 담양읍 에코산단2로 20',
  guideTitle: '[ 자가용 이용 시 ]',
  guideDescription:
    '내비게이션에 혁진팩 또는 에코산단2로 20 입력 \n 전용 주차공간 마련 (공장 앞 주차 가능)',
};

export const CONTACT_LIST: ContactInfoType[] = [
  { name: 'TEL', value: '061)392-0039' },
  { name: 'FAX', value: '061)392-0093' },
  { name: 'E-MAIL', value: 'hj2866@hanmail.net' },
];

export const BUSINESS_HOURS: BusinessHoursType = {
  title: '영업시간',
  list: [
    { name: '월–금', value: '09:00-17:00' },
    { name: '점심시간', value: '12:00-13:00' },
    { name: '휴무일', value: '토, 일, 공휴일 휴무' },
  ],
};
