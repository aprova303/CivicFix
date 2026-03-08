"use client";

import React from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

const WhyCivicFix = () => {
  const benefits = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Local Focus",
      description:
        "Address issues specific to your community and neighborhood.",
    },
    {
      icon: <FaUsers />,
      title: "Community Power",
      description: "Empower citizens to make a real difference in their area.",
    },
    {
      icon: <FaChartLine />,
      title: "Track Progress",
      description:
        "Monitor resolution status and see your impact in real-time.",
    },
    {
      icon: <FaLightbulb />,
      title: "Smart Solutions",
      description:
        "Collaborative approach to solving civic problems effectively.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why CivicFix?</h2>
        <p className="text-lg text-base-content/70 max-w-2xl">
          We believe in the power of community-driven solutions. CivicFix
          connects citizens with local authorities to create meaningful change.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6 group"
          >
            <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {benefit.title}
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyCivicFix;
