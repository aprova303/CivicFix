/**
 * Database Proxy API
 * 
 * Demonstrates how to:
 * - Use MongoDB URI from environment variables
 * - Handle authentication tokens
 * - Return safe data to client
 * 
 * Secrets stored on server:
 * - MONGODB_URI (database connection string)
 * - NEXTAUTH_SECRET (for session validation)
 * 
 * Client never sees these secrets!
 */

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Issue from '@/models/Issue';

// Example: Get user's own issues (requires authentication)
export async function GET(request) {
  try {
    // Validate user is authenticated
    // NEXTAUTH_SECRET is server-side only
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // MONGODB_URI is never exposed to client
    // It's used here on server to connect safely
    await dbConnect();

    // Fetch user's issues from database
    const userIssues = await Issue.find({ 
      reportedBy: token.sub 
    }).lean();

    // Return data (secrets stay on server)
    return NextResponse.json({
      success: true,
      data: userIssues,
      message: 'Issues fetched securely'
    });

  } catch (error) {
    console.error('Database proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}

/**
 * KEY SECURITY POINTS:
 * 
 * 1. MONGODB_URI
 *    - Server-side only via process.env.MONGODB_URI
 *    - Never sent to client
 *    - Used by dbConnect() to establish connection
 * 
 * 2. NEXTAUTH_SECRET
 *    - Server-side only via process.env.NEXTAUTH_SECRET
 *    - Used to validate JWT tokens
 *    - Proves user identity without exposing password
 * 
 * 3. Error Handling
 *    - Catches any errors during database operations
 *    - Returns generic error to client (not internal details)
 *    - Real error logged on server for debugging
 * 
 * 4. Authentication Flow
 *    Token is validated → User ID extracted → Query DB → Return safe data
 *    Client never knows how authentication works internally
 */
