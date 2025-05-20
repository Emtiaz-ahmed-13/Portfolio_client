"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchBlog } from "@/lib/redux/slices/blogsSlice";
import { setConnectionStatus } from "@/lib/redux/slices/uiSlice";
import { RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface BlogDetailPageProps {
  id: string;
}

export default function BlogDetailPage({ id }: BlogDetailPageProps) {
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state: RootState) => state.blogs.selectedBlog);
  const loading = useAppSelector((state: RootState) => state.blogs.loading);
  const error = useAppSelector((state: RootState) => state.blogs.error);
  const connectionStatus = useAppSelector(
    (state: RootState) => state.ui.connectionStatus
  );

  useEffect(() => {
    const loadBlog = async () => {
      try {
        await dispatch(fetchBlog(id)).unwrap();
        dispatch(
          setConnectionStatus({
            status: "connected",
            message: "Connected to backend successfully",
          })
        );
      } catch (err) {
        console.error("Error loading blog:", err);
        dispatch(
          setConnectionStatus({
            status: "warning",
            message: "Using demo content (could not connect to backend)",
          })
        );
      }
    };

    loadBlog();

    // Cleanup function
    return () => {
      // Any cleanup code can go here
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Blog not found or still loading...</p>
        <Link href="/blogs" passHref>
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blogs" passHref>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        {/* Status Banner - Only show if status is not connected */}
        {connectionStatus.status !== "connected" && (
          <div
            className={`mb-8 px-4 py-3 text-sm rounded-md ${
              connectionStatus.status === "disconnected"
                ? "bg-red-500/10 text-red-700 dark:text-red-300"
                : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
            }`}
          >
            {connectionStatus.message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {blog.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {blog.author && (
              <>
                <span>•</span>
                <span>{blog.author}</span>
              </>
            )}
            {blog.tags && blog.tags.length > 0 && (
              <>
                <span>•</span>
                <span className="flex gap-2">
                  {blog.tags.map((tag: string) => (
                    <span key={tag} className="text-primary">
                      #{tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        </div>

        {blog.coverImage && (
          <div className="relative w-full h-72 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        )}

        <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </div>
  );
}
