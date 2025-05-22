"use client";
import { useState } from "react";
import BlogsPanel from "./BlogsPanel";
import ExperiencePanel from "./ExperiencePanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";

const sections = ["Blogs", "Projects", "Skills", "Experience"];

export default function AdminDashboard() {
  const [active, setActive] = useState("Blogs");

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-56 bg-muted/30 border-r border-muted/40 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActive(section)}
            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${
              active === section
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/10 text-muted-foreground"
            }`}
          >
            {section}
          </button>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">{active}</h1>
        <div className="bg-muted/20 rounded-xl p-8 min-h-[300px]">
          {active === "Blogs" ? (
            <BlogsPanel />
          ) : active === "Projects" ? (
            <ProjectsPanel />
          ) : active === "Skills" ? (
            <SkillsPanel />
          ) : active === "Experience" ? (
            <ExperiencePanel />
          ) : (
            <div className="flex items-center justify-center text-xl text-muted-foreground">
              {active} management coming soon...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
