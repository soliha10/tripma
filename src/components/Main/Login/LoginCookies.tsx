'use client';
import Image from 'next/image';
import close from '@/app/assets/images/close-cookie.svg';
import { useState } from 'react';
export default function LoginCookies() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div
      className={`w-[300px] py-4 ps-6 pe-4 border border-[#605DEC] rounded-[8px] bg-[#F6F6FE] sticky bottom-10 `}
    >
      <div className="flex items-start gap-[10px] mb-3 ">
        <span className="text-[18px] text-[#605DEC] ">
          By using our site, you agree to eat our cookies.
        </span>
        <Image src={close} alt="" className="cursor-pointer" onClick={() => setIsVisible(false)} />
      </div>

      <div>
        <button className="bg-[#605DEC] text-[#fafafa] w-[126px] p-[10px] text-center text-[14px] rounded cursor-pointer me-[10px] ">
          Accept cookies
        </button>
        <button className=" text-[#605DEC] w-[120px] p-[10px] text-center text-[14px] rounded cursor-pointer ">
          Go to settings
        </button>
      </div>
    </div>
  );
}
