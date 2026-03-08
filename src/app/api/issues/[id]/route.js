import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import Issue from '@/models/Issue';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    // Debug logging
    console.log("[GET Issue API] Received params:", params);
    console.log("[GET Issue API] Raw ID:", id);
    console.log("[GET Issue API] ID type:", typeof id);

    // Sanitize the ID - remove any whitespace
    const cleanId = String(id).trim();
    console.log("[GET Issue API] Clean ID:", cleanId);

    // Validate it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
      console.error("[GET Issue API] Invalid ObjectId format. ID:", cleanId);
      return NextResponse.json(
        { 
          message: 'Invalid issue ID format',
          receivedId: cleanId,
        },
        { status: 400 }
      );
    }

    // Find the issue
    const issue = await Issue.findById(cleanId)
      .populate('reportedBy', 'name email');

    console.log("[GET Issue API] Query result:", issue ? "Found" : "Not found");

    if (!issue) {
      console.warn("[GET Issue API] Issue not found for ID:", cleanId);
      return NextResponse.json(
        { message: 'Issue not found' },
        { status: 404 }
      );
    }

    // Convert to plain object and convert _id to string
    const plainIssue = issue.toObject();
    plainIssue._id = plainIssue._id.toString();

    console.log("[GET Issue API] Returning issue:", plainIssue._id);
    return NextResponse.json(plainIssue, { status: 200 });
  } catch (error) {
    console.error("[GET Issue API] Error:", error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = params;

    // Debug logging
    console.log("[DELETE Issue API] Received ID:", id);
    console.log("[DELETE Issue API] ID type:", typeof id);
    console.log("[DELETE Issue API] Session user ID:", session.user.id);

    // Sanitize the ID
    const cleanId = String(id).trim();
    console.log("[DELETE Issue API] Clean ID:", cleanId);

    // Validate it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
      console.error("[DELETE Issue API] Invalid ObjectId format:", cleanId);
      return NextResponse.json(
        { message: 'Invalid issue ID format' },
        { status: 400 }
      );
    }

    const issue = await Issue.findById(cleanId);

    console.log("[DELETE Issue API] Issue found:", issue ? "Yes" : "No");

    if (!issue) {
      return NextResponse.json(
        { message: 'Issue not found' },
        { status: 404 }
      );
    }

    // Check if user is the owner
    const issueOwnerId = issue.reportedBy.toString();
    console.log("[DELETE Issue API] Issue owner:", issueOwnerId, "Session user:", session.user.id);
    
    if (issueOwnerId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized - you can only delete your own issues' },
        { status: 403 }
      );
    }

    // Delete using the clean ID
    await Issue.findByIdAndDelete(cleanId);

    console.log("[DELETE Issue API] Issue deleted successfully:", cleanId);
    return NextResponse.json(
      { message: 'Issue deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE Issue API] Error:", error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid issue ID' },
        { status: 400 }
      );
    }

    const issue = await Issue.findById(id);

    if (!issue) {
      return NextResponse.json(
        { message: 'Issue not found' },
        { status: 404 }
      );
    }

    // Check if user is the owner
    if (issue.reportedBy.toString() !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { title, shortDescription, description, priority, status, image } = await req.json();

    if (title) issue.title = title;
    if (shortDescription) issue.shortDescription = shortDescription;
    if (description) issue.description = description;
    if (priority) issue.priority = priority;
    if (status) issue.status = status;
    if (image !== undefined) issue.image = image;
    issue.updatedAt = new Date();

    await issue.save();

    return NextResponse.json(
      { message: 'Issue updated successfully', issue },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
