import Image from "next/image";
import React from "react";
import Link from "next/link";
import banner from "../../assets/banner3.jpeg"
const Banner = () => {
  return (
    <section className="py-8 md:py-16 mb-12 md:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Welcome to{" "}
              <span className="text-blue-500 block sm:inline">CivicFix</span>
            </h1>
            <p className="text-lg sm:text-xl text-base-content/80 leading-relaxed max-w-lg">
              Helping communities solve local issues together. Empower your
              voice and make a real difference in your neighborhood.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <button className="btn btn-primary px-8 py-3 text-lg w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <Link href="/browse-issues">
              <button className="btn btn-outline px-8 py-3 text-lg w-full sm:w-auto">
                Browse Issues
              </button>
            </Link>
          </div>

          {/* <div className="grid grid-cols-3 gap-4 pt-6 border-t border-base-200">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500">
                3200+
              </div>
              <p className="text-sm text-base-content/60">Issues Reported</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500">
                847
              </div>
              <p className="text-sm text-base-content/60">Resolved</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500">
                12.5K+
              </div>
              <p className="text-sm text-base-content/60">Users</p>
            </div>
          </div> */}
        </div>

        {/* Image */}
        <div className="relative h-90 sm:h-[500px] lg:h-[600px] w-full">
          <Image
            src={banner}
            alt="Banner Image showing community issues"
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
