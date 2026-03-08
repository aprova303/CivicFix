import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import Issue from '@/models/Issue';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const issues = await Issue.find({ reportedBy: session.user.id })
      .sort({ createdAt: -1 })
      .select('-__v');

    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { title, shortDescription, description, priority, image } = await req.json();

    // Validation
    if (!title || !shortDescription || !description || !priority) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    const issue = new Issue({
      title,
      shortDescription,
      description,
      priority,
      image,
      reportedBy: session.user.id,
    });

    await issue.save();

    return NextResponse.json(
      { message: 'Issue reported successfully', issue },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
