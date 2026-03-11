import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Here you can save the contact message to a MongoDB collection if needed
    // For now, we'll just return success
    // Example:
    // const contact = await Contact.create({
    //   name,
    //   email,
    //   subject,
    //   message,
    //   createdAt: new Date(),
    // });

    console.log("Contact message received:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
