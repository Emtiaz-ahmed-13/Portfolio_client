// @ts-nocheck
import { NextResponse } from "next/server";

// In a real app, this would connect to your backend
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { message: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // Mock successful submission
    // In a real app, this would send data to your backend or email service
    console.log("Contact form submission received:", data);

    // Simulate slight delay for realism
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { message: "Message sent successfully! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling contact form:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
