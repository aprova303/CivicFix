import React from "react";
import { FaBullseye, FaHeart, FaLightbulb, FaUsers } from "react-icons/fa";

export const metadata = {
  title: "About Us - CivicFix",
  description:
    "Learn about CivicFix and our mission to empower communities to solve local issues together.",
};

const AboutUs = () => {
  const values = [
    {
      icon: <FaBullseye />,
      title: "Our Mission",
      description:
        "To empower citizens and communities by providing a platform where civic issues can be reported, tracked, and resolved collaboratively.",
    },
    {
      icon: <FaHeart />,
      title: "Our Vision",
      description:
        "A world where every community member has a voice in solving local problems and creating positive change.",
    },
    {
      icon: <FaLightbulb />,
      title: "Our Approach",
      description:
        "We believe in transparency, collaboration, and data-driven solutions to address civic challenges effectively.",
    },
    {
      icon: <FaUsers />,
      title: "Our Community",
      description:
        "Built by and for communities, CivicFix connects citizens, volunteers, and local authorities.",
    },
  ];

  const team = [
    {
      role: "Founders",
      description:
        "A team of passionate civic-minded engineers and designers committed to making a difference.",
    },
    {
      role: "Mission",
      description:
        "Creating infrastructure for communities to self-organize and solve problems together.",
    },
    {
      role: "Impact",
      description:
        "Every issue reported, tracked, and resolved contributes to a stronger community.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20 mb-8 md:mb-16">
        <div className="space-y-5 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            About <span className="text-blue-500">CivicFix</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/80 leading-relaxed">
            CivicFix is a modern platform dedicated to bridging the gap between
            citizens and their communities. We believe that when people are
            empowered to report and resolve local issues, entire communities
            benefit.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 mb-8 md:mb-16">
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl">
            These principles guide everything we do at CivicFix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl text-blue-500 mb-6">{value.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-base-content/75 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-10">Our Story</h2>

        <div className="space-y-8">
          <div className="card bg-base-100 border border-base-200 p-8 hover:border-blue-400 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-500">
              The Problem
            </h3>
            <p className="text-base-content/75 text-lg leading-relaxed">
              Communities face countless issues—broken roads, inadequate
              streetlights, pollution, safety concerns—but there's often no
              effective way for citizens to report them or track their
              resolution. This disconnect between communities and authorities
              leads to frustration and delayed solutions.
            </p>
          </div>

          <div className="card bg-base-100 border border-base-200 p-8 hover:border-blue-400 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-500">
              Our Solution
            </h3>
            <p className="text-base-content/75 text-lg leading-relaxed">
              CivicFix provides a transparent platform where anyone can report
              civic issues, track their progress, and see the impact of their
              contributions. We're building a community-driven ecosystem where
              collaboration leads to faster, better solutions.
            </p>
          </div>

          <div className="card bg-base-100 border border-base-200 p-8 hover:border-blue-400 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-500">
              Our Impact
            </h3>
            <p className="text-base-content/75 text-lg leading-relaxed">
              Every day, CivicFix empowers citizens to make a difference in
              their communities. From improving roads to enhancing public
              safety, we're creating real, measurable change through the power
              of collective action.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-10">
          Beyond the Code
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((item, index) => (
            <div
              key={index}
              className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 border border-green-200 dark:border-green-700 p-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                {item.role}
              </h3>
              <p className="text-base-content/75 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 mt-8 md:mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 md:p-12 border border-blue-200/50">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
          <p className="text-lg text-base-content/75 max-w-2xl mx-auto">
            Be part of the movement to make communities stronger and healthier.
            Start reporting issues and making a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/browse-issues">
              <button className="btn btn-primary px-8">Browse Issues</button>
            </a>
            <a href="/register">
              <button className="btn btn-outline px-8">Get Started</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
