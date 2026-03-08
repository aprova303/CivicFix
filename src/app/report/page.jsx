"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";

export default function ReportIssuePage() {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    } else if (shortDescription.length > 200) {
      newErrors.shortDescription =
        "Short description must be 200 characters or less";
    }

    if (!description.trim()) {
      newErrors.description = "Full description is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          shortDescription,
          description,
          priority,
          image: image || null,
        }),
        credentials: "include", // Important for auth cookies
      });

      // Check if response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error(
          "Invalid response type:",
          contentType,
          "Response status:",
          response.status,
        );
        throw new Error(
          "Server error: Invalid response. Please check if you're logged in.",
        );
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        throw new Error("Server returned invalid JSON. Please try again.");
      }

      if (!response.ok) {
        const errorMessage = data.message || "Failed to report issue";
        setErrors({ submit: errorMessage });
        toast.error(errorMessage);
        return;
      }

      toast.success("Issue reported successfully!");
      // Reset form
      resetForm();
      router.push("/manage");
    } catch (error) {
      console.error("Submit error:", error);
      const message = error.message || "Failed to report issue";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setDescription("");
    setPriority("Medium");
    setImage("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm mb-6 gap-2"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">
              Report an Issue
            </h1>
            <p className="text-gray-600 mb-8">
              Help us improve your community by reporting civic issues
            </p>

            {errors.submit && (
              <div className="alert alert-error mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m6-2l2-2m0 0l2-2m-2 2l2-2m-2 2l-2 2"
                  />
                </svg>
                <span>{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pothole on Main Street"
                  className={`input input-bordered w-full text-base ${
                    errors.title ? "input-error" : ""
                  }`}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) {
                      setErrors({ ...errors, title: "" });
                    }
                  }}
                  disabled={isLoading}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.title}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Short Description
                  </span>
                  <span className="label-text-alt text-gray-500">
                    {shortDescription.length}/200
                  </span>
                </label>
                <textarea
                  placeholder="Brief summary of the issue"
                  className={`textarea textarea-bordered w-full ${
                    errors.shortDescription ? "textarea-error" : ""
                  }`}
                  rows="2"
                  value={shortDescription}
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                    if (errors.shortDescription) {
                      setErrors({ ...errors, shortDescription: "" });
                    }
                  }}
                  disabled={isLoading}
                  maxLength="200"
                />
                {errors.shortDescription && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.shortDescription}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Full Description
                  </span>
                </label>
                <textarea
                  placeholder="Detailed description of the issue..."
                  className={`textarea textarea-bordered w-full ${
                    errors.description ? "textarea-error" : ""
                  }`}
                  rows="5"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) {
                      setErrors({ ...errors, description: "" });
                    }
                  }}
                  disabled={isLoading}
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.description}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Priority
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Image URL
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg (optional)"
                  className="input input-bordered w-full"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {image && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">
                      Preview
                    </span>
                  </label>
                  <img
                    src={image}
                    alt="Preview"
                    className="rounded-lg max-h-96 object-cover"
                    onError={() => setImage("")}
                  />
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex-1 text-white font-semibold text-base"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Issue"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="btn btn-outline flex-1"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
