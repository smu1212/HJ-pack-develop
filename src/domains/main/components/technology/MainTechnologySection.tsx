import FadeUp from '@comp/FadeUp';

import MainTechnologyTextCard from '@domains/main/components/technology/MainTechnologyCard';
import { MAIN_TECHNOLOGY_CARDS } from '@domains/main/constants/mainTechnology.constant';

export default function MainTechnologySection() {
  return (
    <div className='relative h-[1786px] w-full bg-[#E3F1FF] py-[140px]'>
      <div className='mx-auto flex w-[1100px] flex-col gap-[50px]'>
        {MAIN_TECHNOLOGY_CARDS.map((card) => (
          <FadeUp key={card.id}>
            <MainTechnologyTextCard {...card} />
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
