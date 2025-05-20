import BlogDetailClientPage from "@/components/BlogDetailPage";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

// Server component that renders the client side component
export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return <BlogDetailClientPage id={params.id} />;
}
