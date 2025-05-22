// @ts-nocheck
// @ts-nocheck
import { blogs, logBlogsState, resetBlogs } from "@/lib/data/blogs";
import { NextResponse } from "next/server";

export function GET(request, { params }) {
  try {
    const id = params.id;
    console.log(`[API] Fetching blog with ID: ${id}`);

    // If blogs array is empty, reset it
    if (blogs.length === 0) {
      console.log("[API] Blogs array is empty, resetting to initial data");
      resetBlogs();
    } else {
      // Log the current state of blogs
      logBlogsState();
    }

    // Find the blog with the matching ID
    const blog = blogs.find((b) => b._id === id);

    if (!blog) {
      console.log(`[API] Blog with ID ${id} not found`);

      // Return all blogs in the error for debugging
      return NextResponse.json(
        {
          error: "Blog not found",
          availableBlogs: blogs.map((b) => ({ id: b._id, title: b.title })),
        },
        { status: 404 }
      );
    }

    console.log(`[API] Successfully found blog: ${blog.title}`);
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
