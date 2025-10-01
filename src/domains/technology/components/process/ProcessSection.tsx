import Image from 'next/image';

import PlusInfoCard from '../PlusInfoCard';

export default function ProcessSection() {
  return (
    <section id='process'>
      <div className='relative w-full text-center font-medium text-[#2E3A59]'>
        {/* 타이틀 */}
        <span className='text-[42px]'>
          {`전 공정 통합 과정을 `}
          <span className='font-bold'>자체 처리</span>
          {`합니다. `}
        </span>

        {/* 본문 */}
        <p className='whitespace-pre-line pt-[60px] text-[22px] font-medium text-[#2E3A59]'>
          {`혁진팩은 고객의 디자인 파일을 접수받아 \n`}
          <span className='font-bold'>그라비아 및 플렉소 인쇄 방식</span>
          {`으로 출력한 뒤, \n \n 건조 → 코팅 → 절단 → 가공 → 검수 → 출고까지 \n`}
          <span className='font-bold text-[#E95539]'>전 공정을 자체 처리</span>
          {`합니다. \n\n 공정 흐름은 단순하지만, 결과는 프로답게. \n 우리는 인쇄의 전 과정을 `}
          <span className='font-bold'>투명하게 공개</span>
          합니다.
        </p>

        <div className='flex flex-col items-center justify-center'>
          {/* plus card */}
          <div className='flex items-center justify-center gap-[20px] py-[80px]'>
            <PlusInfoCard
              variant='red'
              title='그라비아 인쇄'
              subTitle='고해상도 대량 인쇄에 적합'
              label='Gravure Printing'
            />
            <PlusInfoCard
              variant='red'
              title='플렉소 인쇄'
              subTitle='친환경 수성잉크, 소량 대응에 유리'
              label='Flexographic Printing'
            />
          </div>

          {/* 생산 공정 이미지 */}
          <Image
            src='/assets/images/process_content.png'
            alt='히스토리 아이콘'
            width={930}
            height={780}
          />
        </div>
      </div>
    </section>
  );
}
