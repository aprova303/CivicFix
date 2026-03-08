"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const GetInvolved = () => {
  const actions = [
    {
      title: "Report an Issue",
      description:
        "Spotted a problem in your community? Report it and help others find solutions.",
      cta: "Report Now",
      href: "/browse-issues",
      color: "btn-primary",
    },
    {
      title: "Vote on Issues",
      description:
        "Support issues you care about by upvoting. Your voice matters!",
      cta: "Browse Issues",
      href: "/browse-issues",
      color: "btn-secondary",
    },
    {
      title: "Join the Community",
      description:
        "Connect with residents and officials to create lasting change together.",
      cta: "Learn More",
      href: "/about",
      color: "btn-accent",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get Involved Today
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          There are many ways to make a difference. Choose how you want to
          contribute to your community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((action, index) => (
          <div
            key={index}
            className="card bg-base-100 border-2 border-base-200 hover:border-primary shadow-md hover:shadow-xl transition-all duration-300 p-8 group flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-base-content/70 flex-grow mb-6 leading-relaxed">
              {action.description}
            </p>
            <Link href={action.href}>
              <button
                className={`btn ${action.color} btn-outline w-full gap-2 group-hover:btn-solid transition-all duration-300`}
              >
                {action.cta}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetInvolved;
