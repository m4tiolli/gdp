import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from 'next/image'
import Link from "next/link";

interface IButton {
  text: string;
  link: string;
  icon: string | StaticImport;
  color?: string
}

export const Button = ({ text, link, icon, color }: IButton) => (
  <Link href={link} className='flex items-center justify-start gap-4 hover:bg-[#00000022] transition-all p-2 rounded-md' style={{ color: color ?? '#38457a' }}>
    <Image src={icon} alt='Icon' width={35} />
    <p className='text-sm font-bold'>
      {text}
    </p>
  </Link>
)