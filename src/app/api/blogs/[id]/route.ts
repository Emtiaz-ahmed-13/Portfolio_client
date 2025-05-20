// @ts-nocheck
// @ts-nocheck
import { blogs } from "@/lib/data/blogs";
import { NextResponse } from "next/server";

export function GET(request, { params }) {
  try {
    const id = params.id;

    // Find the blog with the matching ID
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
