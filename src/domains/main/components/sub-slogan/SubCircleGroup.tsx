import { SUB_CIRCLE_CONTENTS } from '@domains/main/constants/subSlogan.constant';

function SubCircle({ content }: { content: string }) {
  return (
    <div className='relative size-[110px]'>
      {/* 그림자 원 */}
      <div className='absolute left-[6px] top-[6px] size-[110px] rounded-full bg-[#E955391A]' />

      {/* 메인 원(텍스트 포함) */}
      <div className='relative flex size-[110px] items-center justify-center whitespace-pre-line rounded-full border border-[#E95539] text-[12px] font-semibold text-[#E95539]'>
        {content}
      </div>
    </div>
  );
}

function Line() {
  return <div className='h-[1px] w-[18px] bg-[#E95539]' />;
}

export default function SubCircleGroup() {
  return (
    <div className='flex items-center justify-center pt-[40px]'>
      <SubCircle content={SUB_CIRCLE_CONTENTS.first} />
      <Line />
      <SubCircle content={SUB_CIRCLE_CONTENTS.second} />
      <Line />
      <SubCircle content={SUB_CIRCLE_CONTENTS.third} />
    </div>
  );
}
