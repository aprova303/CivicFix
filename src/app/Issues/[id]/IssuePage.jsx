"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";

export default function IssuePage() {
  const params = useParams();
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchIssue();
    }
  }, [params.id]);

  const fetchIssue = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/issues/${params.id}`);

      // Check if response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch issue");
      }

      setIssue(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Failed to load issue");
      router.push("/manage");
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-error";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-info";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "text-success";
      case "In Progress":
        return "text-warning";
      case "Pending":
        return "text-error";
      default:
        return "text-gray-600";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm mb-6 gap-2"
          >
            <MdArrowBack size={18} />
            Back
          </button>
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Issue Not Found
              </h2>
              <p className="text-gray-600">
                The issue you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm mb-6 gap-2"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            {issue.image && (
              <div className="mb-8 relative w-full h-96">
                <Image
                  src={issue.image}
                  alt={issue.title}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                  priority
                />
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {issue.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <div
                className={`text-lg font-semibold ${getPriorityColor(issue.priority)}`}
              >
                {issue.priority} Priority
              </div>
              <div
                className={`text-lg font-semibold ${getStatusColor(issue.status)}`}
              >
                {issue.status}
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Reported by
                </h3>
                {issue.reportedBy ? (
                  <p className="text-lg">{issue.reportedBy.name}</p>
                ) : (
                  <p className="text-lg text-gray-600">Unknown User</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Date Reported
                </h3>
                <p className="text-lg">{formatDate(issue.createdAt)}</p>
              </div>
              {issue.updatedAt !== issue.createdAt && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Last Updated
                  </h3>
                  <p className="text-lg">{formatDate(issue.updatedAt)}</p>
                </div>
              )}
            </div>

            <div className="divider my-2"></div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900 mb-2">
                Short Description
              </h3>
              <p className="text-blue-800">{issue.shortDescription}</p>
            </div>

            <div className="card-actions justify-end mt-8">
              <button
                onClick={() => router.push("/manage")}
                className="btn btn-outline"
              >
                Back to Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-error";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-info";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "text-success";
      case "In Progress":
        return "text-warning";
      case "Pending":
        return "text-error";
      default:
        return "text-gray-600";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm mb-6 gap-2"
          >
            <MdArrowBack size={18} />
            Back
          </button>
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Issue Not Found
              </h2>
              <p className="text-gray-600">
                The issue you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm mb-6 gap-2"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            {issue.image && (
              <div className="mb-8">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="rounded-lg w-full h-96 object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {issue.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <div
                className={`text-lg font-semibold ${getPriorityColor(issue.priority)}`}
              >
                {issue.priority} Priority
              </div>
              <div
                className={`text-lg font-semibold ${getStatusColor(issue.status)}`}
              >
                {issue.status}
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Reported by
                </h3>
                {issue.reportedBy ? (
                  <p className="text-lg">{issue.reportedBy.name}</p>
                ) : (
                  <p className="text-lg text-gray-600">Unknown User</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Date Reported
                </h3>
                <p className="text-lg">{formatDate(issue.createdAt)}</p>
              </div>
              {issue.updatedAt !== issue.createdAt && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Last Updated
                  </h3>
                  <p className="text-lg">{formatDate(issue.updatedAt)}</p>
                </div>
              )}
            </div>

            <div className="divider my-2"></div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900 mb-2">
                Short Description
              </h3>
              <p className="text-blue-800">{issue.shortDescription}</p>
            </div>

            <div className="card-actions justify-end mt-8">
              <button
                onClick={() => router.push("/manage")}
                className="btn btn-outline"
              >
                Back to Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
