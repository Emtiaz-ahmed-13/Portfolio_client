"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type BlogFormData = {
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string;
};

export default function BlogEditor() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    summary: "",
    content: "",
    coverImage: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // Prepare the blog data
      const blogData = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        coverImage: formData.coverImage,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      // Submit to API
      const response = await fetch("/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create blog post");
      }

      setSubmitSuccess(true);
      setFormData({
        title: "",
        summary: "",
        content: "",
        coverImage: "",
        tags: "",
      });
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/blogs"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blogs
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
            <CardDescription>
              Fill out the form below to create a new blog post
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a title for your blog post"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Brief summary of your blog post"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL for the cover image (e.g., from Unsplash)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="React, Next.js, TypeScript"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post content here. You can use HTML for formatting (<p>, <h2>, <pre>, etc.)."
                  className="min-h-[300px] font-mono"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags to format your content
                </p>
              </div>

              {submitError && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                  Blog post created successfully!
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Link href="/blogs" passHref>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Blog Post"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
