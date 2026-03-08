import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "../../assets/logo-Photoroom.png"
const Logo = () => {
    return (
        <div>
            <Link href={"/"} className='flex items-center gap-1'>
            <Image alt="CivicFix Logo" src={logo}
             width={120} height={120}>

            </Image>
            {/* <h2 className="text-xl font-bold">Civic<span className="text-blue-500">Fix</span></h2> */}
            
            </Link>
        </div>
    );
};

export default Logo;