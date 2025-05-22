"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Blog, fetchBlogs, setBlogs } from "@/lib/redux/slices/blogsSlice";
import { setConnectionStatus } from "@/lib/redux/slices/uiSlice";
import { RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";
import { Crown, PlusCircle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedGradient } from "./ui/aceternity/AnimatedGradient";
import { FloatingNavbar } from "./ui/aceternity/FloatingNavbar";
import { SparklesText } from "./ui/aceternity/SparklesText";
import { ThreeDCard } from "./ui/aceternity/ThreeDCard";
import { Badge } from "./ui/badge";

export default function BlogsClientPage() {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state: RootState) => state.blogs.data);
  const loading = useAppSelector((state: RootState) => state.blogs.loading);
  const error = useAppSelector((state: RootState) => state.blogs.error);
  const connectionStatus = useAppSelector(
    (state: RootState) => state.ui.connectionStatus
  );
  const [refreshing, setRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blogs" },
    { name: "Create", link: "/blogs/create" },
  ];

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/check-auth");
        if (response.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Admin check failed:", error);
      }
    };

    checkAdmin();
  }, []);

  // Function to fetch blogs directly from API
  const fetchBlogsDirectly = async () => {
    try {
      setRefreshing(true);

      // Use the dedicated refresh endpoint
      const response = await fetch("/api/blogs/refresh");

      if (response.ok) {
        const data = await response.json();
        dispatch(setBlogs(data.blogs));
        dispatch(
          setConnectionStatus({
            status: "connected",
            message: `Refreshed ${data.blogCount} blogs successfully`,
          })
        );
      } else {
        throw new Error("Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error directly fetching blogs:", err);
      dispatch(
        setConnectionStatus({
          status: "warning",
          message: "Could not refresh blogs",
        })
      );
    } finally {
      setRefreshing(false);
    }
  };

  // Handle manual refresh
  const handleRefresh = () => {
    fetchBlogsDirectly();
  };

  useEffect(() => {
    // First try to reset blogs by calling a special endpoint
    const resetBlogsData = async () => {
      try {
        console.log("Attempting to reset blogs data...");
        await fetch("/api/blogs?reset=true");
      } catch (err) {
        console.error("Error resetting blogs:", err);
      }
    };

    resetBlogsData();

    // Check for cached blogs in localStorage
    const cachedBlogs = localStorage.getItem("cachedBlogs");
    if (cachedBlogs) {
      try {
        const parsedBlogs = JSON.parse(cachedBlogs);
        // Dispatch the cached blogs to Redux store
        dispatch(setBlogs(parsedBlogs));
        dispatch(
          setConnectionStatus({
            status: "connected",
            message: "Using recently created blogs",
          })
        );
        // Clear the cache after using it
        localStorage.removeItem("cachedBlogs");
        return;
      } catch (err) {
        console.error("Error parsing cached blogs:", err);
        // If there's an error parsing, continue with normal fetch
      }
    }

    // Fetch blogs when the component mounts if no cached blogs
    const fetchData = async () => {
      try {
        // First try the refresh endpoint to ensure we have data
        const refreshResponse = await fetch("/api/blogs/refresh");
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          dispatch(setBlogs(refreshData.blogs));
          dispatch(
            setConnectionStatus({
              status: "connected",
              message: "Connected to backend successfully",
            })
          );
          return;
        }

        // If that fails, try direct API to get all blogs
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          dispatch(setBlogs(data));
          dispatch(
            setConnectionStatus({
              status: "connected",
              message: "Connected to backend successfully",
            })
          );
          return;
        }

        // Fallback to Redux action
        await dispatch(fetchBlogs()).unwrap();
        dispatch(
          setConnectionStatus({
            status: "connected",
            message: "Connected to backend successfully",
          })
        );
      } catch (err) {
        console.error("Error fetching blogs:", err);
        dispatch(
          setConnectionStatus({
            status: "warning",
            message: "Using demo content (could not connect to backend)",
          })
        );
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading && !refreshing) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-[50vh]"
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 rounded-full border-t-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="mt-4 text-muted-foreground">Loading blogs...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <FloatingNavbar navItems={navItems} />

      <AnimatedGradient
        gradientColors={[
          "rgba(96, 165, 250, 0.1)",
          "rgba(129, 140, 248, 0.1)",
          "rgba(167, 139, 250, 0.1)",
        ]}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Status Banner - Only show if status is not success */}
          {connectionStatus.status !== "connected" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`w-full px-4 py-3 mb-8 text-sm rounded-xl ${
                connectionStatus.status === "disconnected"
                  ? "bg-red-500/10 text-red-700 dark:text-red-300"
                  : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
              }`}
            >
              {connectionStatus.message}
            </motion.div>
          )}

          <div className="mb-16 flex flex-col md:flex-row md:justify-between md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <SparklesText words="Blog Portal" className="text-4xl mb-3" />
              <p className="text-xl text-muted-foreground">
                All blogs including admin-created content
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-3 flex-wrap"
            >
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="flex items-center gap-2 rounded-full"
                disabled={refreshing}
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? "animate-spin" : ""}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
              {isAdmin && (
                <Link href="/blogs/create">
                  <Button className="flex items-center gap-2 rounded-full px-6">
                    <PlusCircle size={16} />
                    Create New Blog
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-500/10 text-red-700 dark:text-red-300 p-6 rounded-xl mb-8"
            >
              {error}
            </motion.div>
          )}

          <div className="grid gap-10">
            {blogs.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 bg-muted/30 rounded-2xl"
              >
                <p className="text-muted-foreground mb-6 text-lg">
                  No blog posts yet.
                </p>
                {isAdmin && (
                  <Link href="/blogs/create">
                    <Button className="rounded-full px-8">
                      Create Your First Blog
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}

            {blogs.map((blog: Blog, index: number) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ThreeDCard>
                  <Card className="overflow-hidden border-none shadow-lg">
                    <div className="grid md:grid-cols-3 gap-4">
                      {blog.coverImage && (
                        <div className="relative h-64 md:h-full">
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            className="object-cover rounded-l-xl"
                            fill
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                          {blog.author === "Emtiaz Ahmed" && (
                            <div className="absolute top-4 left-4">
                              <Badge
                                variant="default"
                                className="flex items-center gap-1 bg-primary/80 hover:bg-primary"
                              >
                                <Crown size={12} />
                                Admin
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                      <div
                        className={
                          blog.coverImage ? "md:col-span-2 p-8" : "p-8"
                        }
                      >
                        <CardHeader className="p-0 mb-4">
                          <div className="flex items-center gap-2 mb-3 text-sm">
                            <motion.span
                              className="text-muted-foreground"
                              whileHover={{ color: "rgb(var(--primary))" }}
                            >
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </motion.span>
                            {blog.tags && blog.tags.length > 0 && (
                              <>
                                <span className="text-muted-foreground">•</span>
                                <motion.span
                                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {blog.tags[0]}
                                </motion.span>
                              </>
                            )}
                            {blog.author === "Emtiaz Ahmed" &&
                              !blog.coverImage && (
                                <>
                                  <span className="text-muted-foreground">
                                    •
                                  </span>
                                  <Badge
                                    variant="default"
                                    className="flex items-center gap-1 bg-primary/80 hover:bg-primary"
                                  >
                                    <Crown size={12} />
                                    Admin
                                  </Badge>
                                </>
                              )}
                          </div>
                          <CardTitle className="text-2xl md:text-3xl mb-3">
                            <Link
                              href={`/blogs/${blog._id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {blog.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-base">
                            {blog.summary ||
                              blog.content
                                .substring(0, 160)
                                .replace(/<\/?[^>]+(>|$)/g, "") + "..."}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-0 mt-6">
                          <Link href={`/blogs/${blog._id}`} passHref>
                            <Button
                              variant="outline"
                              className="rounded-full px-6"
                            >
                              Read More →
                            </Button>
                          </Link>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedGradient>
    </div>
  );
}
