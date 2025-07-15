import { Adventerus } from '@/components/Main/Adventure/Adventure';
import Image from 'next/image';

export default function JapanItems({ image, name, desc, classname }: Adventerus) {
  return (
    <li
      className={`${classname} w-[410px] rounded-[12px] cursor-pointer `}
      style={{
        boxShadow: '0px 2px 4px 0px rgba(28, 5, 77, 0.10), 0px 12px 32px 0px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Image src={image} alt="" className="rounded-t-[12px]" />
      <div className="py-4 px-6">
        <strong className="text-[#605DEC] text-[18px] font-semibold mb-1 inline-block">
          {name}
        </strong>
        <p className="text-[#7C8DB0]">{desc}</p>
      </div>
    </li>
  );
}
