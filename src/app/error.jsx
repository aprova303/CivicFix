"use client";

import Link from "next/link";
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BiSolidErrorAlt size={100} className="text-primary"></BiSolidErrorAlt>
      <h1 className="text-2xl font-bold text-red-500">An error occurred</h1>
      <Link
        href="/"
        className="bg-primary text-white px-4 py-2 rounded-md mt-4"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default error;
