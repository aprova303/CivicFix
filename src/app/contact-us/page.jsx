"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please login to access Contact Us page");
      router.push(`/login?callbackUrl=${encodeURIComponent("/contact-us")}`);
    }
  }, [status, router]);

  // Fill email if user is authenticated
  React.useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
        name: session.user.name || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Only show content if authenticated
  if (!session) {
    return null;
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "support@civicfix.com",
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Address",
      value: "123 Community Street, City, State 12345",
    },
    {
      icon: <FaClock />,
      label: "Response Time",
      value: "Usually within 24 hours",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20 mb-8 md:mb-16">
        <div className="space-y-5 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            Get In <span className="text-blue-500">Touch</span>
          </h1>
          <p className="text-md md:text-lg text-base-content/80 leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Fill out the
            form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-20">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-4xl text-blue-500 mb-4">{info.icon}</div>
            <h3 className="font-semibold mb-2 text-base-content">
              {info.label}
            </h3>
            <p className="text-base-content/70">{info.value}</p>
          </div>
        ))}
      </section>

      {/* Contact Form Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 md:mb-20">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 border border-base-200 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered focus:input-primary w-full"
                  placeholder="Enter your name"
                  disabled
                />
                <label className="label">
                  <span className="label-text-alt text-blue-500">
                    Auto-filled from your account
                  </span>
                </label>
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered focus:input-primary w-full"
                  placeholder="your@email.com"
                  disabled
                />
                <label className="label">
                  <span className="label-text-alt text-blue-500">
                    Auto-filled from your account
                  </span>
                </label>
              </div>

              {/* Subject Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input input-bordered focus:input-primary w-full"
                  placeholder="What is this about?"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered focus:textarea-primary w-full h-40"
                  placeholder="Tell us your message..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-lg"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Quick Response
            </h3>
            <p className="text-base-content/75 leading-relaxed">
              We typically respond to all messages within 24 hours. Your
              feedback helps us improve CivicFix.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 border border-green-200 dark:border-green-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              Have a Bug Report?
            </h3>
            <p className="text-base-content/75 leading-relaxed mb-4">
              Found an issue with our platform? Please let us know the details.
            </p>
            <a
              href="/"
              className="text-green-600 font-semibold hover:underline"
            >
              Report a bug →
            </a>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 border border-purple-200 dark:border-pink-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Partnership Inquiries
            </h3>
            <p className="text-base-content/75 leading-relaxed">
              Interested in partnering with CivicFix? We're always open to
              collaboration!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Frequently Asked Questions
        </h2>

        <div className="join join-vertical w-full">
          {[
            {
              q: "How long does it take to get a response?",
              a: "We aim to respond to all inquiries within 24 hours during business days.",
            },
            {
              q: "Can I remain anonymous when contacting support?",
              a: "No, we require your account information to assist you better and ensure transparency.",
            },
            {
              q: "What should I do if I want to report a civic issue instead?",
              a: "Head to the Report Issue page from your dashboard to submit a new civic issue.",
            },
            {
              q: "Is there a phone support option?",
              a: "Currently, we support contact via email form. Phone support may be available in the future.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow join-item border border-base-200"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-xl font-semibold">
                {faq.q}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/75">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
