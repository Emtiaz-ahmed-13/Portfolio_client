// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";

// In a real app, this would be stored in a database
let experiences = [
  {
    id: "1",
    company: "Tech Solutions Ltd.",
    position: "Senior Developer",
    period: "2022-Present",
    description: "Leading development of web applications using MERN stack.",
  },
  {
    id: "2",
    company: "Startup BD",
    position: "Junior Developer",
    period: "2020-2022",
    description:
      "Developed responsive user interfaces and implemented backend features.",
  },
];

// Get all experiences
export function GET() {
  return NextResponse.json(experiences, { status: 200 });
}

// Create a new experience
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.company || !data.position || !data.period || !data.description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new experience with unique ID
    const newExperience = {
      id: Date.now().toString(),
      company: data.company,
      position: data.position,
      period: data.period,
      description: data.description,
    };

    // Add to experiences array
    experiences.unshift(newExperience);

    return NextResponse.json(
      { message: "Experience created successfully", experience: newExperience },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { message: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// Update an experience
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (
      !data.id ||
      !data.company ||
      !data.position ||
      !data.period ||
      !data.description
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find and update the experience
    const index = experiences.findIndex((exp) => exp.id === data.id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    experiences[index] = {
      id: data.id,
      company: data.company,
      position: data.position,
      period: data.period,
      description: data.description,
    };

    return NextResponse.json(
      {
        message: "Experience updated successfully",
        experience: experiences[index],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { message: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// Delete an experience
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Experience ID is required" },
        { status: 400 }
      );
    }

    const initialLength = experiences.length;
    experiences = experiences.filter((exp) => exp.id !== id);

    if (experiences.length === initialLength) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Experience deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { message: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
