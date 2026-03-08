import Link from 'next/link';
import React from 'react';
import { BiSolidErrorAlt } from "react-icons/bi";


const nError404 = () => {
    return <div className='flex flex-col  min-h-screen justify-center items-center'>
     <BiSolidErrorAlt size={100} className='text-primary'></BiSolidErrorAlt>
      <h2 className='text-2xl font-bold text-primary'>Page Not Found</h2>
      <Link href="/" className='bg-primary text-white px-4 py-2 rounded-md mt-4'>Go Back Home</Link>
    </div>
};

export default nError404;