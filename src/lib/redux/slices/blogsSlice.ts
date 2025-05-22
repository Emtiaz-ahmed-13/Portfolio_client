import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogsState } from "../types";

// Define the blog type
export interface Blog {
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

// Interface for creating a new blog
export interface NewBlog {
  title: string;
  content: string;
  coverImage?: string;
  summary?: string;
  tags?: string[];
}

// Mock data for blogs when API fails
export const mockBlogs: Blog[] = [
  {
    _id: "mock-blog-1",
    title: "Getting Started with Next.js and Framer Motion",
    content: `<p>Next.js is a powerful React framework that enables server-side rendering, static site generation, and more. When combined with Framer Motion, you can create beautiful, animated user interfaces with ease.</p><p>In this article, we'll explore how to set up a Next.js project with Framer Motion and create some basic animations that will impress your users.</p><p>Let's dive in!</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    summary:
      "Learn how to combine Next.js and Framer Motion to create beautiful, animated user interfaces",
    tags: ["Next.js", "Framer Motion", "React"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "mock-blog-2",
    title: "Building a Modern Portfolio with Aceternity UI",
    content: `<p>Aceternity UI offers a collection of beautifully designed, responsive components that you can use to build modern websites and applications.</p><p>In this tutorial, we'll walk through the process of creating a portfolio website using Aceternity UI components, Tailwind CSS, and Next.js.</p><p>By the end, you'll have a stunning portfolio that showcases your work in the best light possible.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    summary:
      "Create a stunning portfolio website using Aceternity UI, Tailwind CSS, and Next.js",
    tags: ["Aceternity UI", "Portfolio", "Tailwind CSS"],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "mock-blog-3",
    title: "Mastering Redux Toolkit with TypeScript",
    content: `<p>Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. When paired with TypeScript, it becomes even more powerful, offering type safety and intellisense.</p><p>In this comprehensive guide, we'll explore how to set up and use Redux Toolkit with TypeScript in a React application.</p><p>You'll learn about creating slices, thunks, and selectors, all with proper TypeScript typing.</p>`,
    coverImage:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    summary:
      "A comprehensive guide to using Redux Toolkit with TypeScript in React applications",
    tags: ["Redux", "TypeScript", "React"],
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Initial state
const initialState: BlogsState = {
  data: [],
  loading: false,
  error: null,
  selectedBlog: null,
  submitStatus: "idle",
};

// Base API URL
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/api/v1"
    : "https://portfolio-server-5phtsv5ur-emtiaz-ahmed-13s-projects.vercel.app/api/v1";

// Create async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // Add timeout for fetch
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Using mock data due to API error:", error.message);
        // Return mock data instead of rejecting
        return mockBlogs;
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create async thunk for fetching a single blog
export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      // If it's a mock ID, return the mock blog
      if (id.startsWith("mock-blog")) {
        const mockBlog = mockBlogs.find((blog) => blog._id === id);
        if (mockBlog) return mockBlog;
      }

      const response = await fetch(`${baseUrl}/blogs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // Add timeout for fetch
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        // For mock IDs, we already handled above
        if (!id.startsWith("mock-blog")) {
          console.error("Error fetching blog:", error.message);
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create async thunk for creating a blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData: NewBlog, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create blog");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create the slice
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetBlogError(state) {
      state.error = null;
    },
    clearSelectedBlog(state) {
      state.selectedBlog = null;
    },
    resetSubmitStatus(state) {
      state.submitStatus = "idle";
    },
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBlogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle fetchBlog
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle createBlog
      .addCase(createBlog.pending, (state) => {
        state.submitStatus = "loading";
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.submitStatus = "success";
        state.data = [...state.data, action.payload];
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.submitStatus = "error";
        state.error = action.payload as string;
      });
  },
});

export const {
  resetBlogError,
  clearSelectedBlog,
  resetSubmitStatus,
  setBlogs,
} = blogsSlice.actions;
export default blogsSlice.reducer;
