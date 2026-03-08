"use client";

import React from "react";
import {
  FaExclamationTriangle,
  FaUsers,
  FaTools,
  FaCheckCircle,
  FaArrowDown,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <FaExclamationTriangle />,
      title: "Report an Issue",
      description:
        "Spot a civic problem? Click 'Report Issue' and provide details about the problem you've found. Include photos, location, and a description to help authorities understand the issue better.",
    },
    {
      number: 2,
      icon: <FaUsers />,
      title: "Community Votes",
      description:
        "Other community members review your report and upvote if they've experienced the same issue. The more upvotes, the higher the priority it receives.",
    },
    {
      number: 3,
      icon: <FaTools />,
      title: "Authority Reviews",
      description:
        "Local authorities are notified of high-priority issues. They assess the problem and develop a solution plan. Updates are shared with the community.",
    },
    {
      number: 4,
      icon: <FaCheckCircle />,
      title: "Issue Resolved",
      description:
        "Once the issue is fixed, it's marked as resolved. The community can provide feedback on the solution and help maintain quality standards.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">How It Works</h1>
        <p className="text-lg md:text-xl text-base-content/70 max-w-3xl">
          CivicFix simplifies the process of reporting and resolving community
          issues. Here's how we make it work.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-24">
        <div className="grid gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon and Number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white text-4xl hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-center mt-2 text-sm font-semibold text-base-content/60">
                    Step {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base-content/70 text-lg leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8 md:hidden">
                  <FaArrowDown className="text-primary text-3xl animate-bounce" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-center my-8">
                  <FaArrowDown className="text-primary text-3xl" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-base-200 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Why This Process?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 p-6 border border-base-200 hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-3">Democratic</h3>
            <p className="text-base-content/70">
              By allowing community upvotes, we ensure that issues affecting the
              most people get priority attention.
            </p>
          </div>
          <div className="card bg-base-100 p-6 border border-base-200 hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-3">Transparent</h3>
            <p className="text-base-content/70">
              Every step is tracked and visible. Citizens can see exactly what's
              happening with their reported issues.
            </p>
          </div>
          <div className="card bg-base-100 p-6 border border-base-200 hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-3">Effective</h3>
            <p className="text-base-content/70">
              Combined citizen reports and community feedback create a
              data-driven approach to solving civic problems.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="collapse collapse-plus bg-base-200 border border-base-300 hover:border-primary transition-colors">
            <input type="radio" name="faq" defaultChecked />
            <div className="collapse-title text-xl font-bold">
              How do I report an issue?
            </div>
            <div className="collapse-content">
              <p className="text-base-content/70">
                Click the "Report Issue" button on the browse issues page, fill
                in the details about the civic problem you've found, and submit.
                Make sure to include a photo and exact location for better
                visibility.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300 hover:border-primary transition-colors">
            <input type="radio" name="faq" />
            <div className="collapse-title text-xl font-bold">
              How long does it take to resolve an issue?
            </div>
            <div className="collapse-content">
              <p className="text-base-content/70">
                Resolution time depends on the issue's complexity and priority.
                On average, our community issues are resolved within 45 days.
                Urgent critical issues may be prioritized faster.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300 hover:border-primary transition-colors">
            <input type="radio" name="faq" />
            <div className="collapse-title text-xl font-bold">
              Can I see the status of reported issues?
            </div>
            <div className="collapse-content">
              <p className="text-base-content/70">
                Yes! Every issue has a status tracker showing whether it's
                Pending, In Progress, or Resolved. You can view updates and
                comments from both citizens and authorities.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300 hover:border-primary transition-colors">
            <input type="radio" name="faq" />
            <div className="collapse-title text-xl font-bold">
              Is my information safe and private?
            </div>
            <div className="collapse-content">
              <p className="text-base-content/70">
                We take privacy seriously. While issue reports are public to
                help the community, your personal information is kept
                confidential and only shared with relevant authorities when
                needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
