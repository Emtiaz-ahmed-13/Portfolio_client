"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  Blog,
  clearSelectedBlog,
  fetchBlog,
} from "@/lib/redux/slices/blogsSlice";
import { setConnectionStatus } from "@/lib/redux/slices/uiSlice";
import { RootState } from "@/lib/redux/store";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogDetailPageProps {
  id: string;
}

export default function BlogDetailPage({ id }: BlogDetailPageProps) {
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state: RootState) => state.blogs.selectedBlog);
  const allBlogs = useAppSelector((state: RootState) => state.blogs.data);
  const loading = useAppSelector((state: RootState) => state.blogs.loading);
  const error = useAppSelector((state: RootState) => state.blogs.error);
  const connectionStatus = useAppSelector(
    (state: RootState) => state.ui.connectionStatus
  );
  const [localBlog, setLocalBlog] = useState<Blog | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Try to find the blog in the Redux store first
  useEffect(() => {
    // Clear existing blog when component unmounts or ID changes
    return () => {
      dispatch(clearSelectedBlog());
    };
  }, [dispatch, id]);

  useEffect(() => {
    // First, check if the blog is in the list of all blogs
    const existingBlog = allBlogs.find((b) => b._id === id);
    if (existingBlog) {
      setLocalBlog(existingBlog);
      return;
    }

    const loadBlog = async () => {
      setLocalLoading(true);
      setLocalError(null);

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

        // If Redux fetch fails, try direct API call as a fallback
        try {
          const response = await fetch(`/api/blogs/${id}`);
          if (response.ok) {
            const data = await response.json();
            setLocalBlog(data);
          } else {
            setLocalError("Blog not found");
            dispatch(
              setConnectionStatus({
                status: "warning",
                message: "Could not find the requested blog",
              })
            );
          }
        } catch (directError) {
          console.error("Direct API call failed:", directError);
          setLocalError("Could not load blog");
          dispatch(
            setConnectionStatus({
              status: "warning",
              message: "Using demo content (could not connect to backend)",
            })
          );
        }
      } finally {
        setLocalLoading(false);
      }
    };

    loadBlog();
  }, [dispatch, id, allBlogs]);

  // Determine if we're truly loading
  const isLoading = loading || localLoading;

  // Determine which blog to display
  const displayBlog = blog || localBlog;

  // Determine error state
  const displayError = error || localError;

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!displayBlog) {
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

        {displayError && (
          <div className="bg-red-500/10 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
            {displayError}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {displayBlog.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {new Date(displayBlog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {displayBlog.author && (
              <>
                <span>•</span>
                <span>{displayBlog.author}</span>
              </>
            )}
            {displayBlog.tags && displayBlog.tags.length > 0 && (
              <>
                <span>•</span>
                <span className="flex gap-2">
                  {displayBlog.tags.map((tag: string) => (
                    <span key={tag} className="text-primary">
                      #{tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        </div>

        {displayBlog.coverImage && (
          <div className="relative w-full h-72 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={displayBlog.coverImage}
              alt={displayBlog.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        )}

        <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: displayBlog.content }} />
        </article>
      </div>
    </div>
  );
}
