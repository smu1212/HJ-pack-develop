export interface TechCapabilityType {
  title: string;
  boldTitle: string;
  closing: {
    line1: string;
    line2: string;
    line3: string;
  };
}

export const TECH_CAPABILITY_TEXT: TechCapabilityType = {
  title: '결과물은',
  boldTitle: ' 품질이 말해 줍니다.',
  closing: {
    line1: '혁진팩은',
    line2: '복잡한 인쇄를 단순하게 !',
    line3: '품질과 납기는 철저하게 !',
  },
};
