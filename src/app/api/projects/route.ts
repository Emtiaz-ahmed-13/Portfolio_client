// @ts-nocheck
import { NextResponse } from "next/server";

// Real projects data
const projects = [
  {
    id: "682bf7059ed95f87600647b0",
    title: "Opinia review Protal",
    description: "A modern Review protal website where you can ",
    technologies: [
      "NextJs",
      "Redux",
      "Node.js",
      "Express",
      "prisma",
      "TypeScript",
    ],
    image:
      "https://i.postimg.cc/g2sd66cF/Screenshot-2025-05-20-at-9-27-59-AM.png",
    demoLink: "https://review-protal.vercel.app/",
    githubLink: "https://github.com/Emtiaz-ahmed-13/review-protal",
  },
  {
    id: "682bf8ac9ed95f87600647b2",
    title: "A comprehenssive Book store",
    description: "A book store where you can find your favourite books ",
    technologies: [
      "NextJs",
      "Redux",
      "Node.js",
      "Express",
      "MongoDb",
      "TypeScript",
    ],
    image:
      "https://i.postimg.cc/rmnKGP8T/Screenshot-2025-05-20-at-9-35-14-AM.png",
    demoLink: "https://librant-client.vercel.app/",
    githubLink:
      "https://github.com/Emtiaz-ahmed-13/Librant_client?tab=readme-ov-file",
  },
  {
    id: "682bf9a79ed95f87600647b4",
    title: "FileDock – Secure Document Storage",
    description:
      "FileDock is a full-stack web app to securely store, manage, and access all your documents in one place. Built with Next.js and TypeScript for a fast and reliable experience.",
    technologies: ["NextJs", "TypeScript", "neon"],
    image:
      "https://i.postimg.cc/wx56dPKj/Screenshot-2025-05-20-at-9-39-47-AM.png",
    demoLink: "http://localhost:3000/",
    githubLink: "https://github.com/Emtiaz-ahmed-13/filedock",
  },
];

export async function GET() {
  try {
    // Return all projects
    return NextResponse.json(projects, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// Get a single project by ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const project = projects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
