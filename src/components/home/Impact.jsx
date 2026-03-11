"use client";

import React from "react";
import { FaCheckCircle, FaUsers, FaFlag, FaHourglassEnd } from "react-icons/fa";

const Impact = () => {
  const stats = [
    {
      icon: <FaCheckCircle />,
      number: "847",
      label: "Issues Resolved",
    },
    {
      icon: <FaUsers />,
      number: "12,500+",
      label: "Active Citizens",
    },
    {
      icon: <FaFlag />,
      number: "3,200",
      label: "Issues Reported",
    },
    {
      icon: <FaHourglassEnd />,
      number: "45 days",
      label: "Avg Resolution Time",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-base-200 rounded-2xl px-6 md:px-8 lg:px-12">
      <div className="mb-12 md:mb-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Our Impact
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          Together, we've made real progress in improving our communities. These
          numbers represent our collective effort.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-200 hover:border-primary p-6 md:p-8 text-center group hover:shadow-lg transition-all duration-300"
          >
            <div className="text-5xl md:text-6xl text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-primary transition-colors">
              {stat.number}
            </div>
            <p className="text-base-content/70 text-sm md:text-lg">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Impact;
