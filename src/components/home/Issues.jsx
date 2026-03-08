"use client";

import React, { useState, useMemo } from "react";
import issues from "../../data/Issues.json";
import IssueCard from "../cards/IssueCard";
import { FaSearch } from "react-icons/fa";

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(issues.map((issue) => issue.category))];
    return cats;
  }, []);

  const statuses = ["All", "Pending", "In Progress", "Resolved"];

  // Filter issues based on search, category, and status
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || issue.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || issue.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Community Issues
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl">
          Discover and track civic issues in your community. Together we can
          improve our neighborhoods.
        </p>
      </div>

      {/* Search and Filters Section */}
      {/* <div className="mb-10 p-6 bg-base-200 rounded-lg">
        <div className="mb-6">
          <label className="input input-bordered flex items-center gap-2 bg-base-100">
            <FaSearch className="text-primary" />
            <input
              type="text"
              className="grow"
              placeholder="Search issues by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
          <div>
            <label className="block text-sm font-semibold mb-2 text-base-content">
              Category
            </label>
            <select
              className="select select-bordered w-full bg-base-100"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

      
          <div>
            <label className="block text-sm font-semibold mb-2 text-base-content">
              Status
            </label>
            <select
              className="select select-bordered w-full bg-base-100"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div> */}

      {/* Results Counter */}
      {/* <div className="mb-6">
        <p className="text-sm text-base-content/70">
          Showing{" "}
          <span className="font-semibold text-base-content">
            {filteredIssues.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-base-content">
            {issues.length}
          </span>{" "}
          issues
        </p>
      </div> */}

      {/* Issues Grid */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl text-base-content/70 mb-2">No issues found</p>
          <p className="text-base-content/50">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Issues;
