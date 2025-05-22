// @ts-nocheck
import { blogs, logBlogsState, resetBlogs } from "@/lib/data/blogs";
import { NextResponse } from "next/server";

// Endpoint to reset the blogs data
export async function GET() {
  try {
    // If blogs array is empty, reset it to initial data
    if (blogs.length === 0) {
      console.log("Blogs array is empty, resetting to initial data");
      resetBlogs();
    }

    console.log(`Refreshing blogs, found ${blogs.length} blogs`);
    logBlogsState();

    // Return all blogs in the response
    return NextResponse.json(
      {
        success: true,
        blogCount: blogs.length,
        blogs: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error refreshing blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to refresh blogs" },
      { status: 500 }
    );
  }
}
