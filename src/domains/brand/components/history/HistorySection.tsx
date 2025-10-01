import Image from 'next/image';

export default function HistorySection() {
  return (
    <section id='history'>
      <div className='relative h-[1484px] w-full'>
        {/* 배경 이미지 */}
        <Image
          src='/assets/images/history_bg.png'
          alt='연혁 배경 이미지'
          fill
          className='object-cover'
          priority
        />

        <div className='relative z-10 flex justify-center gap-[200px] px-[80px] pt-[120px]'>
          {/* 텍스트 */}
          <p className='text-[36px] font-bold text-[#3551A1]'>연혁</p>

          {/* 연혁 이미지 */}
          <Image
            src='/assets/images/history_content.png'
            alt='히스토리 아이콘'
            width={638}
            height={1136}
          />
        </div>
      </div>
    </section>
  );
}
