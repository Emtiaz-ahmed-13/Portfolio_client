"use client";

import { useEffect, useState } from "react";

interface Experience {
  id?: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

export default function ExperiencePanel() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editExperience, setEditExperience] = useState<Experience | null>(null);
  const [form, setForm] = useState<Experience>({
    company: "",
    position: "",
    period: "",
    description: "",
  });

  useEffect(() => {
    // Fetch experiences when component mounts
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experience");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically make a POST request to your API
    // This is a simple mock implementation
    if (editExperience) {
      // Update existing experience
      const updatedExperiences = experiences.map((exp) =>
        exp.id === editExperience.id ? { ...form, id: editExperience.id } : exp
      );
      setExperiences(updatedExperiences);
    } else {
      // Add new experience
      const newExperience = { ...form, id: Date.now().toString() };
      setExperiences([...experiences, newExperience]);
    }

    // Reset form and close modal
    setForm({
      company: "",
      position: "",
      period: "",
      description: "",
    });
    setShowForm(false);
    setEditExperience(null);
  };

  const handleEdit = (experience: Experience) => {
    setEditExperience(experience);
    setForm(experience);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Experience</h2>
        <button
          onClick={() => {
            setEditExperience(null);
            setForm({
              company: "",
              position: "",
              period: "",
              description: "",
            });
            setShowForm(true);
          }}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No experience entries yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {experiences.map((experience, index) => (
            <div
              key={experience.id || index}
              className="border rounded-lg p-4 bg-background"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{experience.position}</h3>
                  <p className="text-primary">{experience.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {experience.period}
                  </p>
                  <p className="mt-2">{experience.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id!)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {editExperience ? "Edit Experience" : "Add Experience"}
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                className="border p-2 rounded w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Position</label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Your position"
                className="border p-2 rounded w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Period</label>
              <input
                name="period"
                value={form.period}
                onChange={handleChange}
                placeholder="e.g. 2020-2022"
                className="border p-2 rounded w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Job description"
                className="border p-2 rounded w-full min-h-[100px]"
                required
              />
            </div>

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
