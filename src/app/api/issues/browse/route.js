import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Issue from '@/models/Issue';

export async function GET(req) {
  try {
    await dbConnect();

    // Get all issues (public endpoint)
    const issues = await Issue.find({})
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 })
      .select('-__v');

    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.error('Browse issues error:', error);
    return NextResponse.json(
      { 
        message: error.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}
