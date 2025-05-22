"use client";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: number;
  category: string;
  items: Skill[];
}

export default function SkillsPanel() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<SkillCategory | null>(null);
  const [form, setForm] = useState({
    category: "",
  });
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editSkill, setEditSkill] = useState<{
    catId: number;
    skill: Skill | null;
  } | null>(null);
  const [skillForm, setSkillForm] = useState({ name: "", level: 0 });

  // Fetch categories
  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setError("Failed to load skills"))
      .finally(() => setLoading(false));
  }, []);

  // Handle category form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update category
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (editCategory) {
      // Update
      await fetch(`/api/skills/${editCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: form.category }),
      });
    } else {
      // Create
      await fetch("/api/skills/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: form.category }),
      });
    }
    setShowForm(false);
    setEditCategory(null);
    setForm({ category: "" });
    // Refresh
    setLoading(true);
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  // Edit category
  const handleEdit = (cat: SkillCategory) => {
    setEditCategory(cat);
    setForm({ category: cat.category });
    setShowForm(true);
  };

  // Delete category
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    setLoading(true);
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    setCategories(categories.filter((c) => c.id !== id));
    setLoading(false);
  };

  // Handle skill form input
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillForm({ ...skillForm, [e.target.name]: e.target.value });
  };

  // Add or update skill
  const handleSkillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const catId = editSkill?.catId;
    if (editSkill && editSkill.skill) {
      // Update
      await fetch(`/api/skills/${catId}/skill/${editSkill.skill.name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skillForm.name,
          level: Number(skillForm.level),
        }),
      });
    } else {
      // Create
      await fetch(`/api/skills/${catId}/skill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skillForm.name,
          level: Number(skillForm.level),
        }),
      });
    }
    setShowSkillForm(false);
    setEditSkill(null);
    setSkillForm({ name: "", level: 0 });
    // Refresh
    setLoading(true);
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  // Edit skill
  const handleEditSkill = (catId: number, skill: Skill) => {
    setEditSkill({ catId, skill });
    setSkillForm({ name: skill.name, level: skill.level });
    setShowSkillForm(true);
  };

  // Delete skill
  const handleDeleteSkill = async (catId: number, skillName: string) => {
    if (!confirm("Delete this skill?")) return;
    setLoading(true);
    await fetch(`/api/skills/${catId}/skill/${skillName}`, {
      method: "DELETE",
    });
    setCategories(
      categories.map((cat) =>
        cat.id === catId
          ? { ...cat, items: cat.items.filter((s) => s.name !== skillName) }
          : cat
      )
    );
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            setEditCategory(null);
            setForm({ category: "" });
            setShowForm(true);
          }}
        >
          + Add Category
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.id} className="border rounded-xl p-4 bg-muted/10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{cat.category}</h3>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleEdit(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-2 py-1 bg-primary text-white rounded"
                    onClick={() => {
                      setEditSkill({ catId: cat.id, skill: null });
                      setSkillForm({ name: "", level: 0 });
                      setShowSkillForm(true);
                    }}
                  >
                    + Add Skill
                  </button>
                </div>
              </div>
              <table className="w-full border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2">Skill</th>
                    <th className="p-2">Level</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map((skill) => (
                    <tr key={skill.name} className="border-t">
                      <td className="p-2">{skill.name}</td>
                      <td className="p-2">{skill.level}</td>
                      <td className="p-2 flex gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                          onClick={() => handleEditSkill(cat.id, skill)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleDeleteSkill(cat.id, skill.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {/* Modal Category Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl min-w-[300px] flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {editCategory ? "Edit Category" : "Add Category"}
            </h3>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category Name"
              className="border p-2 rounded"
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
      {/* Modal Skill Form */}
      {showSkillForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSkillSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl min-w-[300px] flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {editSkill && editSkill.skill ? "Edit Skill" : "Add Skill"}
            </h3>
            <input
              name="name"
              value={skillForm.name}
              onChange={handleSkillChange}
              placeholder="Skill Name"
              className="border p-2 rounded"
              required
            />
            <input
              name="level"
              type="number"
              value={skillForm.level}
              onChange={handleSkillChange}
              placeholder="Level (0-100)"
              className="border p-2 rounded"
              min={0}
              max={100}
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
                onClick={() => setShowSkillForm(false)}
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
