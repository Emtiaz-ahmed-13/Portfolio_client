// @ts-nocheck
import { NextResponse } from "next/server";

// Profile data - replace with your information
const profile = {
  name: "John Doe",
  title: "Frontend Developer",
  bio: "I'm a passionate frontend developer with 5 years of experience building modern web applications. I love creating intuitive user interfaces and solving complex problems with clean, efficient code.",
  email: "john.doe@example.com",
  location: "San Francisco, CA",
  avatarUrl: "https://github.com/shadcn.png",
  social: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  resume: {
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        year: "2015-2019",
      },
    ],
    experience: [
      {
        company: "Tech Company XYZ",
        position: "Senior Frontend Developer",
        period: "2021-Present",
        description:
          "Led development of multiple web applications using React, Next.js, and TypeScript.",
      },
      {
        company: "Startup ABC",
        position: "Frontend Developer",
        period: "2019-2021",
        description:
          "Developed responsive user interfaces and implemented new features.",
      },
    ],
  },
};

export async function GET() {
  try {
    return NextResponse.json(profile, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}
