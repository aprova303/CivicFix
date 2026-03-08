"use client";

import Link from "next/link";
import React from "react";
import { FaBullseye, FaLightbulb, FaHeart, FaGlobe } from "react-icons/fa";

export default function About() {
  const coreValues = [
    {
      icon: <FaBullseye />,
      title: "Mission-Driven",
      description:
        "To empower citizens and government to collaboratively solve local civic problems.",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovative",
      description:
        "We leverage technology to create simple yet effective solutions for community challenges.",
    },
    {
      icon: <FaHeart />,
      title: "Community-Focused",
      description:
        "Every decision we make is guided by what's best for the community we serve.",
    },
    {
      icon: <FaGlobe />,
      title: "Transparent",
      description:
        "We believe in openness and accountability at every level of our platform.",
    },
  ];

  const team_count = "50+";
  const active_users = "12,500+";
  const issues_resolved = "847";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">About CivicFix</h1>
        <p className="text-xl text-base-content/70 max-w-3xl leading-relaxed">
          CivicFix is a modern civic engagement platform designed to bridge the
          gap between citizens and local authorities. We believe that together,
          communities can identify, track, and resolve local issues faster and
          more effectively.
        </p>
      </div>

      {/* Our Story */}
      <div className="mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-base-content/70 mb-4 leading-relaxed">
            CivicFix was born from a simple observation: many civic problems go
            unnoticed or unaddressed because citizens and authorities lack a
            direct communication channel. Potholes, streetlights, water leaks,
            and other issues often persist for months.
          </p>
          <p className="text-base-content/70 mb-4 leading-relaxed">
            We created CivicFix to solve this problem. By giving citizens a
            platform to report issues and authorities a tool to prioritize and
            track resolutions, we've established a feedback loop that benefits
            everyone.
          </p>
          <p className="text-base-content/70 leading-relaxed">
            Today, thousands of community members use CivicFix to create
            positive change in their neighborhoods. And we're just getting
            started.
          </p>
        </div>
        <div className="bg-base-200 rounded-2xl p-12 text-center">
          <div className="space-y-8">
            <div>
              <div className="text-5xl font-bold text-primary">
                {team_count}
              </div>
              <p className="text-base-content/70 mt-2">
                Dedicated Team Members
              </p>
            </div>
            <div className="divider"></div>
            <div>
              <div className="text-5xl font-bold text-primary">
                {active_users}
              </div>
              <p className="text-base-content/70 mt-2">
                Active Community Members
              </p>
            </div>
            <div className="divider"></div>
            <div>
              <div className="text-5xl font-bold text-primary">
                {issues_resolved}
              </div>
              <p className="text-base-content/70 mt-2">Issues Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-24 bg-base-200 rounded-2xl p-12">
        <div>
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-base-content/70 leading-relaxed">
            To create a bridge between citizens and local authorities that
            enables rapid identification, transparent tracking, and effective
            resolution of civic issues. We aim to make community engagement
            effortless and impactful.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
          <p className="text-base-content/70 leading-relaxed">
            A world where every civic problem is addressed promptly, where
            citizens feel heard, and where communities thrive through
            collaborative problem-solving and democratic engagement.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6 group"
            >
              <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {value.title}
              </h3>
              <p className="text-base-content/70 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What We Do */}
      <div className="mb-24">
        <h2 className="text-4xl font-bold mb-8">What We Do</h2>
        <div className="space-y-6">
          <div className="card bg-base-100 border-l-4 border-primary p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">
              Issue Reporting Platform
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              A user-friendly platform where community members can report civic
              issues with photos, descriptions, and location data. Our intuitive
              interface makes it easy for anyone to contribute.
            </p>
          </div>
          <div className="card bg-base-100 border-l-4 border-blue-500 p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Community Engagement</h3>
            <p className="text-base-content/70 leading-relaxed">
              Community members vote on issues they care about, creating a
              democratic system where the most impactful problems get immediate
              attention. Upvotes show authorities what matters most.
            </p>
          </div>
          <div className="card bg-base-100 border-l-4 border-success p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Authority Management</h3>
            <p className="text-base-content/70 leading-relaxed">
              Local authorities receive prioritized issue lists and can track
              resolutions publicly. This creates accountability and helps
              optimize resource allocation for maximum community impact.
            </p>
          </div>
          <div className="card bg-base-100 border-l-4 border-warning p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Impact Tracking</h3>
            <p className="text-base-content/70 leading-relaxed">
              Real-time dashboards show community members the progress of
              reported issues and celebrate resolutions. Transparency builds
              trust and encourages continued civic participation.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Be part of a community-driven solution. Report issues, upvote
          concerns, or follow up on resolutions. Together, we make our
          neighborhoods better.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/browse-issues">
            <button className="btn btn-lg btn-soft bg-white text-primary hover:bg-base-100">
              Browse Issues
            </button>
          </a>
          <Link>  <button className="btn btn-lg btn-outline text-white border-white hover:bg-white/10">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
