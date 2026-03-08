"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function BrowseIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/issues/browse");

      // Check if response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Invalid content-type:", contentType);
        throw new Error("Server returned invalid response");
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        throw new Error("Failed to parse server response");
      }

      if (!response.ok) {
        const errorMessage = data?.message || "Failed to fetch issues";
        throw new Error(errorMessage);
      }

      const issuesList = Array.isArray(data) ? data : [];
      console.log(
        "[BrowseIssuesPage] Fetched issues count:",
        issuesList.length,
      );
      if (issuesList.length > 0) {
        console.log("[BrowseIssuesPage] Sample issue:", issuesList[0]);
      }
      setIssues(issuesList);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Failed to load issues");
      setIssues([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "badge-error";
      case "Medium":
        return "badge-warning";
      case "Low":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Resolved":
        return "badge-success";
      case "In Progress":
        return "badge-warning";
      case "Pending":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesTitle = issue.title
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesPriority =
      !priorityFilter || issue.priority === priorityFilter;
    return matchesTitle && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Browse Issues
          </h1>
          <p className="text-gray-600">
            Explore civic issues reported by the community
          </p>
        </div>

        {/* Filters */}
        <div className="card bg-white shadow-md mb-8">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Search by Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Search issues..."
                  className="input input-bordered"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Filter by Priority
                  </span>
                </label>
                <select
                  className="select select-bordered"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No Issues Found
              </h2>
              <p className="text-gray-600 mb-6">
                {filter || priorityFilter
                  ? "Try adjusting your filters"
                  : "Be part of the community! Report the first issue."}
              </p>
              <Link
                href="/report"
                className="btn btn-primary text-white w-fit mx-auto"
              >
                Report an Issue
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredIssues.map((issue) => (
              <div key={issue._id}>
                <Link
                  href={`/Issues/${issue._id}`}
                  className="card bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="card-title text-2xl mb-2 text-gray-800">
                          {issue.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {issue.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <div
                            className={`badge badge-lg ${getPriorityBadgeColor(issue.priority)}`}
                          >
                            {issue.priority} Priority
                          </div>
                          <div
                            className={`badge badge-lg ${getStatusBadgeColor(issue.status)}`}
                          >
                            {issue.status}
                          </div>
                          <div className="badge badge-ghost">
                            {formatDate(issue.createdAt)}
                          </div>
                        </div>
                      </div>

                      {issue.image && (
                        <div className="md:w-32 md:h-32">
                          <Image
                            src={issue.image}
                            alt={issue.title}
                            className="rounded-lg w-full h-32 object-cover"
                            width={200}
                            height={200}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-primary text-sm font-semibold mt-2">
                      View Details →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
