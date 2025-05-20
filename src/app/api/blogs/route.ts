// @ts-nocheck
// @ts-nocheck
import { blogs } from "@/lib/data/blogs";
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
export function GET() {
  try {
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
