'use client';
import Image from 'next/image';
import close from '@/app/assets/images/close-sign-up.svg';
import Email from './Email';
import google from '@/app/assets/images/color.svg';
import apple from '@/app/assets/images/apple mac.svg';
import facebook from '@/app/assets/images/facebook.svg';
import { useEffect } from 'react';
// import { useEffect, useState } from 'react';
export interface EmailType {
  id: number;
  pic: string;
  text: string;
}
interface Props {
  onClose: () => void;
}
export default function LoginModal({ onClose }: Props) {
  const emails: EmailType[] = [
    {
      id: 1,
      pic: google,
      text: 'Continue with Google',
    },
    {
      id: 2,
      pic: apple,
      text: 'Continue with Apple',
    },
    {
      id: 3,
      pic: facebook,
      text: 'Continue with Facebook',
    },
  ];
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <div className="w-screen fixed inset-0 top-0 bottom-0 max-h-vh overflow-y-auto scroll-auto pt-[126px] pb-20 bg-[#52527a33] z-50">
      <div className="w-[568px] p-10 bg-white   mx-auto border border-[#CBD4E6] rounded-[12px] ">
        <div className="flex items-center justify-between mb-3">
          <strong className="text-[#6E7491] text-2xl font-bold ">Sign up for Tripma</strong>
          <Image className="cursor-pointer" src={close} alt="" onClick={onClose} />
        </div>
        <p className="text-[#7C8DB0] text-[18px] mb-5 ">
          Tripma is totally free to use. Sign up using your email address or phone number below to
          get started.
        </p>
        <form action="" className="flex flex-col gap-3 mb-8">
          <input
            className="border border-[#A1B0CC] text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-[18px] py-2 px-3 outline-0 rounded  "
            name=""
            id=""
            type="text"
            placeholder="Email or phone number"
          />
          <input
            className="border border-[#A1B0CC] text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-[18px] py-2 px-3 outline-0 rounded  "
            name=""
            id=""
            type="text"
            placeholder="Password"
          />
          <label htmlFor="">
            <div className="flex items-center gap-2 mb-1">
              <input className="w-4 h-4" name="" id="" type="checkbox" />
              <span className="text-[#6E7491] lg:text-base ">
                I agree to the{' '}
                <a href="" className="text-[#605DEC]">
                  terms and conditions
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <input className="w-4 h-4" name="" id="" type="checkbox" />
              <span className="text-[#6E7491] lg:text-base ">Send me the latest deal alerts</span>
            </div>
          </label>
          <button className="bg-[#605DEC] py-3 rounded text-[#FAFAFA] text-[18px] cursor-pointer ">
            Create account
          </button>
        </form>

        <div className="flex items-center gap-[10px] mb-6 ">
          <span className="h-[1px] bg-[#CBD4E6] w-[226px] "></span>
          <span className="text-[#7C8DB0] text-[18px] ">or</span>
          <span className="h-[1px] bg-[#CBD4E6] w-[226px] "></span>
        </div>
        <ul className="flex items-center flex-col gap-3 ">
          {emails.map(({ id, pic, text }) => (
            <Email key={id} pic={pic} text={text} id={id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
