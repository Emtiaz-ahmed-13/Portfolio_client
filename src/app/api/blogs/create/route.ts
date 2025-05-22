// @ts-nocheck
// @ts-nocheck
import { BlogData, blogs, logBlogsState } from "@/lib/data/blogs";
import { NextResponse } from "next/server";

// In a real app, this would be a database call
let mockBlogId = blogs.length + 1; // Start after our existing mock blogs

export async function POST(request: Request) {
  try {
    console.log("Creating a new blog post, current blogs count:", blogs.length);

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
      _id: mockBlogId.toString(), // Use string ID
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

    console.log(`New blog created with ID: ${newBlog._id}`);
    logBlogsState();

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog: newBlog,
        blogs: blogs,
      },
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
