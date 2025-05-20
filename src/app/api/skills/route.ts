import { NextResponse } from "next/server";

// Sample skills data - replace with your actual data
const skills = [
  {
    id: 1,
    category: "Frontend",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    id: 2,
    category: "Backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "RESTful APIs", level: 85 },
    ],
  },
  {
    id: 3,
    category: "Tools & Technologies",
    items: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "CI/CD", level: 75 },
      { name: "Jest/Testing", level: 80 },
    ],
  },
  {
    id: 4,
    category: "Soft Skills",
    items: [
      { name: "Problem Solving", level: 95 },
      { name: "Communication", level: 90 },
      { name: "Team Collaboration", level: 95 },
      { name: "Time Management", level: 85 },
      { name: "Adaptability", level: 90 },
    ],
  },
];

export async function GET() {
  try {
    // Return all skills
    return NextResponse.json(skills, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// Get a specific skill category by ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const skillCategory = skills.find((s) => s.id === id);

    if (!skillCategory) {
      return NextResponse.json(
        { error: "Skill category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(skillCategory, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching skill category:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill category" },
      { status: 500 }
    );
  }
}
