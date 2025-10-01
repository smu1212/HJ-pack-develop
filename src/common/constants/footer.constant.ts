interface CompanyInfoType {
  title: string;
  value: string;
}

export const COMPANY_INFO: CompanyInfoType[] = [
  { title: 'Tel', value: '061-392-0039' },
  { title: 'Fax', value: '061-392-0093' },
  {
    title: 'Address',
    value: '57309 전라남도 담양군 담양읍 에코산단2로 20',
  },
];

export const FOOTER_POLICIES = [
  { label: '개인정보 처리 방침', href: '/privacy-policy' },
] as const;

export type FooterPolicyType = (typeof FOOTER_POLICIES)[number];
