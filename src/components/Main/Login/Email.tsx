import Image from 'next/image';
import { EmailType } from './LoginModal';

export default function Email({ pic, text }: EmailType) {
  return (
    <>
      <li className="border border-[#605DEC] rounded py-3 px-5 w-full ">
        <a href="" className="flex items-center justify-between">
          <Image src={pic} alt="icon" />
          <span className="mx-auto text-[#605DEC] lg:text-base ">{text}</span>
        </a>
      </li>
    </>
  );
}
