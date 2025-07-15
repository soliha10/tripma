import Image, { StaticImageData } from "next/image";
interface CardType {
   id?: number;
    pic: StaticImageData;
    name: string;
    price: string;
    text: string;
}
export default function SummaryCard({ pic, name, price, text}:CardType) {
  return(
    <li className="w-[400px] rounded-lg  "
    style={{
      boxShadow: '0px 2px 4px 0px rgba(28, 5, 77, 0.10), 0px 12px 32px 0px rgba(0, 0, 0, 0.05)'
    }}>
      <Image src={pic} alt={name} className="rounded-t-xl" />

      <div className="py-4 px-6">
        <div className="flex items-center justify-between text-[#6E7491] text-[18px] mb-1">
          <strong>{name}</strong>
          <strong>{price}</strong>
        </div>
        <p className="text-[#7C8DB0]  ">{text}</p>
      </div>
    </li>
  )
}