import { NextResponse } from "next/server";
import { BlogData, blogs } from "../../blogs/route";

// In a real app, this would be a database call
let mockBlogId = 4; // Start after our 3 existing mock blogs

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    // In a real app, this would be saved to a database
    const newBlog: BlogData = {
      _id: mockBlogId.toString(),
      title: data.title,
      content: data.content,
      summary: data.summary || "",
      coverImage: data.coverImage || "",
      tags: data.tags || [],
      author: "Emtiaz Ahmed", // Default author
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to our mock blogs array
    blogs.unshift(newBlog);
    mockBlogId++;

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Failed to create blog" },
      { status: 500 }
    );
  }
}
