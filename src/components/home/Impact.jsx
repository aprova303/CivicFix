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
    <section className="py-16 md:py-24 bg-base-200 rounded-2xl px-8 md:px-12">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Together, we've made real progress in improving our communities. These
          numbers represent our collective effort.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-200 hover:border-primary p-8 text-center group hover:shadow-lg transition-all duration-300"
          >
            <div className="text-5xl text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold mb-2 group-hover:text-primary transition-colors">
              {stat.number}
            </div>
            <p className="text-base-content/70 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Impact;
