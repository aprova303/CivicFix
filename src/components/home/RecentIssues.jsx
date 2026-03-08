"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function RecentIssues() {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  const fetchRecentIssues = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/issues/browse");

      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await response.json();
      const issuesList = Array.isArray(data) ? data.slice(0, 6) : [];

      // Debug log
      console.log("[RecentIssues] Fetched issues:", issuesList);
      console.log("[RecentIssues] Sample issue structure:", issuesList[0]);
      issuesList.forEach((issue, index) => {
        console.log(
          `[RecentIssues] Issue ${index} ID:`,
          issue._id,
          "Type:",
          typeof issue._id,
        );
      });

      setIssues(issuesList);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load recent issues");
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

  if (isLoading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return null;
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Recent Issues
          </h2>
          <p className="text-gray-600">
            Explore civic issues reported by our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {issues.map((issue) => (
            <div key={issue._id}>
              <Link
                href={`/Issues/${issue._id}`}
                className="card bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full block"
              >
                <div className="card-body flex flex-col h-full">
                  {issue.image && (
                    <div className="mb-4 relative w-full h-40">
                      <Image
                        src={issue.image}
                        alt={issue.title}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <h3 className="card-title text-lg text-gray-800 line-clamp-2 mb-2">
                    {issue.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {issue.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div
                      className={`badge badge-sm ${getPriorityBadgeColor(issue.priority)}`}
                    >
                      {issue.priority}
                    </div>
                    <div
                      className={`badge badge-sm ${getStatusBadgeColor(issue.status)}`}
                    >
                      {issue.status}
                    </div>
                    <div className="badge badge-ghost badge-sm">
                      {formatDate(issue.createdAt)}
                    </div>
                  </div>

                  <div className="text-primary text-sm font-semibold">
                    View Details →
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/browse-issues" className="btn btn-primary text-white">
            Browse All Issues
          </Link>
        </div>
      </div>
    </div>
  );
}
