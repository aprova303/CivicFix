"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavLink from "../buttons/NavLink";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const nav = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink href="/browse-issues">Browse Issues</NavLink>
      </li>
      <li>
        <NavLink href="/contact-us">Contact Us</NavLink>
      </li>
      {session && (
        <>
          <li>
            <NavLink href="/report">Report Issue</NavLink>
          </li>
          <li>
            <NavLink href="/manage">My Issues</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isOpen && (
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2"
              >
                {nav}
              </ul>
            )}
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>
        <div className="navbar-end gap-2">
          {session ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost avatar"
                >
                  <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="pointer-events-none">
                    <span>{session.user?.name}</span>
                  </li>
                  <li className="pointer-events-none">
                    {/* <span className="text-sm">{session.user?.email}</span> */}
                  </li>
                  <li>
                    <Link href="/report">Report Issue</Link>
                  </li>
                  <li>
                    <Link href="/manage">My Issues</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn btn-outline">Login</button>
              </Link>
              <Link href="/register">
                <button className="btn btn-primary text-white">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
