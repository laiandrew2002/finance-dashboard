import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className='items-center hidden lg:flex'>
        <Image
          src='/logo.svg'
          alt="Finance Dashboard Logo"
          width={28}
          height={28}
        />
        <p className='text-2xl font-semibold text-white ml-2.5'>Finance</p>
      </div>
    </Link>
  );
};