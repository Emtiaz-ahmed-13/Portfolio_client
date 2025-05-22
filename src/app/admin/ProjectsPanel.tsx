"use client";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink: string;
  githubLink: string;
}

export default function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    demoLink: "",
    githubLink: "",
  });

  // Fetch projects
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update project
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editProject) {
      // Update
      await fetch(`/api/projects/${editProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Create
      await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowForm(false);
    setEditProject(null);
    setForm({
      title: "",
      description: "",
      technologies: "",
      image: "",
      demoLink: "",
      githubLink: "",
    });
    // Refresh
    setLoading(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  // Edit project
  const handleEdit = (project: Project) => {
    setEditProject(project);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      image: project.image,
      demoLink: project.demoLink,
      githubLink: project.githubLink,
    });
    setShowForm(true);
  };

  // Delete project
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setLoading(true);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p) => p.id !== id));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            setEditProject(null);
            setForm({
              title: "",
              description: "",
              technologies: "",
              image: "",
              demoLink: "",
              githubLink: "",
            });
            setShowForm(true);
          }}
        >
          + Add Project
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
              <th className="p-2">Technologies</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="p-2">{project.title}</td>
                <td className="p-2">{project.technologies.join(", ")}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(project.id)}
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
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl min-w-[350px] flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {editProject ? "Edit Project" : "Add Project"}
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
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded min-h-[60px]"
              required
            />
            <input
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="Technologies (comma separated)"
              className="border p-2 rounded"
              required
            />
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="border p-2 rounded"
            />
            <input
              name="demoLink"
              value={form.demoLink}
              onChange={handleChange}
              placeholder="Demo Link"
              className="border p-2 rounded"
            />
            <input
              name="githubLink"
              value={form.githubLink}
              onChange={handleChange}
              placeholder="GitHub Link"
              className="border p-2 rounded"
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
