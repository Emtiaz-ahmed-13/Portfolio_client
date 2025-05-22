// @ts-nocheck
import { NextResponse } from "next/server";

// Profile data - replace with your information
const profile = {
  name: "Emtiaz Ahmed",
  title: "Full Stack Developer",
  bio: "I'm a passionate Full Stack  developer  building modern web applications. I love creating intuitive user interfaces and solving complex problems with clean, efficient code.",
  email: "emtiaz2060@gmail.com",
  location: "Natore, Bangladesh",
  avatarUrl: "https://i.postimg.cc/jdqjvZvj/emtiazP.jpg",
  social: {
    github: "https://github.com/Emtiaz-ahmed-13",
    linkedin: "https://www.linkedin.com/in/emtiaz-ahmed-2892871a2/",
    twitter: "https://x.com/emtiaza62570877",
  },
  resume: {
    education: [
      {
        institution: "BRAC University",
        degree: "Bachelor of Science in Computer Science",
        year: "2021-2026",
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
