import PlusInfoCard from '../PlusInfoCard';

export default function FacilitySection() {
  return (
    <section id='facility'>
      <div className='relative w-full py-[120px] text-center text-[#2E3A59]'>
        {/* 타이틀 */}
        <span className='text-[42px]'>
          {`눈에 보이는 설비, `}
          <span className='font-bold'>믿고 맡길 수 있는 인쇄</span>
        </span>

        {/* 본문 */}
        <p className='whitespace-pre-line pt-[60px] text-[22px] font-medium'>
          {`혁진팩은 전라남도 담양에 위치한 자체 공장에서 \n`}
          <span className='font-bold'>
            9도 그라비아 인쇄기, 플렉소 인쇄, 무용제 드라이기
            <br />
            슬리터, 가공기
          </span>

          {` 등 총 17대의 전문 설비를 보유하고 있습니다. \n \n 생산라인은 위생관리 기준에 맞춘 클린 환경으로 운영되며, \n \n 직접 방문하지 않아도 신뢰할 수 있는 \n 실물 기반의 생산 시스템을 제공합니다.`}
        </p>

        <div className='flex flex-col items-center justify-center'>
          {/* plus card */}
          <div className='flex items-center justify-center gap-[20px] py-[80px]'>
            <PlusInfoCard variant='blue' title='부지' value='980평' />
            <PlusInfoCard variant='blue' title='생산시설' value='390평' />
            <PlusInfoCard variant='blue' title='클린 설비 및 기숙사 완비' />
          </div>
          {/* 임시 영상 자리 */}
          <div className='flex h-[520px] w-[1000px] items-center justify-center bg-[#000000] text-[20px] text-white'>
            영상 삽입
          </div>
        </div>
      </div>
    </section>
  );
}
