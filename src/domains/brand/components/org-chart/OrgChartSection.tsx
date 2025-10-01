import Image from 'next/image';

export default function OrgChartSection() {
  return (
    <section id='org-chart'>
      <div className='relative h-[845px] w-full bg-white'>
        <div className='relative z-10 flex justify-center gap-[20px] py-[120px]'>
          {/* 텍스트 */}
          <p className='text-[36px] font-bold text-[#3551A1]'>조직도</p>

          {/* 조직도 이미지 */}
          <Image
            src='/assets/images/org_chart_content.png'
            alt='조직도 이미지'
            width={1060}
            height={845}
          />
        </div>
      </div>
    </section>
  );
}
