// @ts-nocheck
// @ts-nocheck
import { blogs, logBlogsState, resetBlogs } from "@/lib/data/blogs";
import { NextRequest, NextResponse } from "next/server";

// Define the Blog interface
export interface BlogData {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  summary?: string;
  author?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Get all blogs
export function GET(request) {
  try {
    // Check if this is a reset request
    const { searchParams } = new URL(request.url);
    const shouldReset = searchParams.get("reset") === "true";

    if (shouldReset) {
      console.log("Received reset request, forcing reset of blogs data");
      resetBlogs();
    }
    // Check if blogs array is empty, and reset if needed
    else if (blogs.length === 0) {
      console.log("Blogs array is empty, resetting to initial data");
      resetBlogs();
    } else {
      console.log(`Returning ${blogs.length} blogs from API`);
      logBlogsState();
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// Get a single blog by ID (used in dynamic route)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    // If blogs array is empty, reset it
    if (blogs.length === 0) {
      console.log(
        "Blogs array is empty, resetting to initial data before POST"
      );
      resetBlogs();
    }

    const blog = blogs.find((b) => b._id === id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
