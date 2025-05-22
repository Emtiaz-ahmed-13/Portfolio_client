"use client";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  content: string;
}

export default function BlogsPanel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });

  // Fetch blogs
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(setBlogs)
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update blog
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (editBlog) {
      // Update
      await fetch(`/api/blogs/${editBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Create
      await fetch("/api/blogs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    setEditBlog(null);
    setForm({ title: "", content: "" });
    // Refresh
    setLoading(true);
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(setBlogs)
      .finally(() => setLoading(false));
  };

  // Edit blog
  const handleEdit = (blog: Blog) => {
    setEditBlog(blog);
    setForm({ title: blog.title, content: blog.content });
    setShowForm(true);
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    setLoading(true);
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setBlogs(blogs.filter((b) => b._id !== id));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            setEditBlog(null);
            setForm({ title: "", content: "" });
            setShowForm(true);
          }}
        >
          + Add Blog
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-muted">
              <th className="p-2">Title</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="p-2">{blog.title}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl min-w-[300px] flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {editBlog ? "Edit Blog" : "Add Blog"}
            </h3>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2 rounded"
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="border p-2 rounded min-h-[100px]"
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-muted text-black dark:text-white rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
