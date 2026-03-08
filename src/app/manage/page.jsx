"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { MdArrowBack, MdDelete, MdVisibility } from "react-icons/md";

export default function ManageIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please login to view your issues");
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchIssues();
    }
  }, [status]);

  const fetchIssues = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/issues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session cookies
      });

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned invalid response. Check if you're logged in.",
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch issues");
      }

      setIssues(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Failed to load issues");
      // Reset issues on error
      setIssues([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // Check response type
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete issue");
      }

      setIssues(issues.filter((issue) => issue._id !== id));
      toast.success("Issue deleted successfully");
      setDeleteModalId(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete issue");
    } finally {
      setDeleteLoading(false);
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

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="btn btn-ghost btn-sm mb-4 gap-2"
            >
              <MdArrowBack size={18} />
              Back
            </button>
            <h1 className="text-4xl font-bold text-gray-800">My Issues</h1>
            <p className="text-gray-600 mt-2">
              Manage and track your reported issues
            </p>
          </div>
          <Link
            href="/report"
            className="btn btn-primary text-white font-semibold"
          >
            Report New Issue
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : issues.length === 0 ? (
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No Issues Reported Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start by reporting your first civic issue to help improve your
                community
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
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="card bg-white shadow-md hover:shadow-lg transition-shadow"
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
                          className={`badge badge-lg ${getPriorityBadgeColor(
                            issue.priority,
                          )}`}
                        >
                          {issue.priority} Priority
                        </div>
                        <div
                          className={`badge badge-lg ${getStatusBadgeColor(
                            issue.status,
                          )}`}
                        >
                          {issue.status}
                        </div>
                        <div className="badge badge-ghost">
                          {formatDate(issue.createdAt)}
                        </div>
                      </div>
                    </div>

                    {issue.image && (
                      <div className="md:w-32 md:h-32 shrink-0">
                        <Image
                          src={issue.image}
                          alt={issue.title}
                          width={128}
                          height={128}
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="card-actions justify-end gap-2 mt-6">
                    <Link
                      href={`/Issues/${issue._id}`}
                      className="btn btn-sm btn-primary text-white gap-2"
                    >
                      <MdVisibility size={18} />
                      View Details
                    </Link>
                    <button
                      onClick={() => setDeleteModalId(issue._id)}
                      className="btn btn-sm btn-error text-white gap-2"
                    >
                      <MdDelete size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Issue?</h3>
            <p className="py-4">
              Are you sure you want to delete this issue? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setDeleteModalId(null)}
                disabled={deleteLoading}
                className="btn"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                disabled={deleteLoading}
                className="btn btn-error text-white"
              >
                {deleteLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setDeleteModalId(null)}
          ></div>
        </div>
      )}
    </div>
  );
}
