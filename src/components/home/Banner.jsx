import Image from 'next/image';
import React from 'react';
import banner from "../../assets/banner.jpg"
const Banner = () => {
    return (
        <div className="flex justify-between items-center gap-10">
            <div className="flex-1 space-y-5">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to <span className="text-blue-500">CivicFix</span></h1>
                <p className="text-lg md:text-xl">Helping communities solve local issues together</p>
                <button className="btn btn-primary btn-outline">Get Started</button>
            </div>
            <div className='flex-1 '>
                   <Image src={banner} alt="Banner Image" width={600} height={800}></Image>
            </div>
        </div>
    );
};

export default Banner;