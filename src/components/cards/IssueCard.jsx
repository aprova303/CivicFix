"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaThumbsUp, FaClock } from "react-icons/fa";
import { MdPriorityHigh } from "react-icons/md";
const statusColors = {
  Pending: "badge-warning",
  "In Progress": "badge-info",
  Resolved: "badge-success",
};

const priorityColors = {
  Low: "badge-outline",
  Medium: "badge-secondary",
  High: "badge-error",
};

const IssueCard = ({ issue }) => {
  const {
    _id,
    title,
    shortDescription,
    image,
    status,
    priority,
    location,
    upvotes,
    createdAt,
  } = issue;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 hover:border-primary hover:border-opacity-50 group">
      {/* Image Container */}
      <figure className="relative h-48 w-full overflow-hidden bg-base-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`badge ${statusColors[status]} badge-sm font-semibold`}
          >
            {status}
          </span>
        </div>

        {/* Priority Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`badge ${priorityColors[priority]} badge-sm font-semibold`}
          >
            <MdPriorityHigh className="mr-1" />
            {priority}
          </span>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5 flex flex-col justify-between">
        {/* Title */}
        <h2 className="card-title text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h2>

        {/* Short Description */}
        <p className="text-sm text-base-content/70 line-clamp-2 flex-grow">
          {shortDescription}
        </p>

        {/* Location, Upvotes & Date */}
        <div className="space-y-3 mt-4 pt-3 border-t border-base-200">
          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-base-content/60 truncate">
            <FaMapMarkerAlt className="text-primary flex-shrink-0" />
            <span className="truncate">
              {location?.area || location?.city || "N/A"}
            </span>
          </div>

          {/* Upvotes & Date */}
          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-1 text-base-content/60">
              <FaThumbsUp className="text-success" />
              <span className="font-medium">{upvotes}</span>
            </div>
            <div className="flex items-center gap-1 text-base-content/60">
              <FaClock className="text-accent text-xs" />
              <span className="text-xs">{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="card-actions mt-4 pt-3 border-t border-base-200">
          <Link
            href={`/issues/${_id}`}
            className="btn btn-primary btn-sm w-full transition-all duration-200 hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
