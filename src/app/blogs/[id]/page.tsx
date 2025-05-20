// @ts-nocheck
// @ts-nocheck
"use client";

import BlogDetailClientPage from "@/components/BlogDetailPage";

type BlogDetailPageProps = {
  params: {
    id: string;
  };
};

// Component that renders the client side component
export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return <BlogDetailClientPage id={params.id} />;
}
