import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Issue from '@/models/Issue';

export async function GET(req) {
  try {
    await dbConnect();
    console.log("[Browse API] Database connected");

    // Get all issues (public endpoint)
    const issues = await Issue.find({})
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    console.log("[Browse API] Found issues count:", issues.length);
    
    if (issues.length === 0) {
      console.log("[Browse API] No issues found in database");
      return NextResponse.json([], { status: 200 });
    }

    // Debug first issue
    console.log("[Browse API] First issue _id:", issues[0]._id);
    console.log("[Browse API] First issue _id type:", typeof issues[0]._id);

    // Convert to plain objects and ensure _id is a string
    const plainIssues = issues.map((issue) => {
      try {
        const plainIssue = issue.toObject();
        
        // Convert ObjectId to string
        if (plainIssue._id && typeof plainIssue._id.toString === 'function') {
          plainIssue._id = plainIssue._id.toString();
        }
        
        return plainIssue;
      } catch (mapError) {
        console.error("[Browse API] Error converting issue:", mapError);
        return null;
      }
    }).filter(issue => issue !== null);

    console.log("[Browse API] Converted issues count:", plainIssues.length);
    return NextResponse.json(plainIssues, { status: 200 });
  } catch (error) {
    console.error('[Browse API] Error:', error);
    console.error('[Browse API] Stack:', error.stack);
    return NextResponse.json(
      { 
        message: error.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}
