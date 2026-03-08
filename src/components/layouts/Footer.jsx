import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-base-200 text-base-content">
      <footer className="footer p-7 max-w-7xl mx-auto flex flex-col md:flex-row gap-5">
      
          <div className="flex-1">
          <Logo />
          <p className="text-sm mt-2">
            CivicFix is a community-driven platform empowering citizens <br></br> to
            report and resolve civic issues in their neighborhoods.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href="/about" className="link link-hover">
            About us
          </Link>
          <a className="link link-hover" href="mailto:contact@civicfix.com">
            Contact
          </a>
          <Link href="/how-it-works" className="link link-hover">
            How It Works
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title">Resources</h6>
          <Link href="/browse-issues" className="link link-hover">
            Browse Issues
          </Link>
          <Link href="/report" className="link link-hover">
            Report Issue
          </Link>
          <a className="link link-hover" href="mailto:support@civicfix.com">
            Support
          </a>
        </nav>
      </footer>

      <div className="bg-base-300 px-10 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-sm">
            © {currentYear} CivicFix. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Making communities better, one issue at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
