import prisma from "@/lib/prisma"; // Adjust this import path as necessary (e.g., "../../../lib/prisma")
import { NextResponse } from "next/server";

// Define the expected structure for type safety, but do not export it from here
type LearnerData = {
  id: number;
  firstName: string;
  lastName: string;
};

// =================================================================
// GET: Load all learners
// =================================================================
export async function GET() {
  try {
    const learners: LearnerData[] = await prisma.learner.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json({ learners }, { status: 200 });
  } catch (error) {
    console.error("Error loading learners:", error);
    return NextResponse.json(
      { error: "Failed to load learners from the database." },
      { status: 500 }
    );
  }
}

// =================================================================
// POST: Create a new learner
// =================================================================
export async function POST(request: Request) {
  console.log("Entering Post method");
  try {
    const { firstName, lastName } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First Name and Last Name are required." },
        { status: 400 }
      );
    }
    console.log("creating new student");
    const newLearner = await prisma.learner.create({
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    console.log(newLearner);
    return NextResponse.json(newLearner, { status: 201 });
  } catch (error) {
    console.error("Error creating learner:", error);
    // If the crash was a DB error, this catch block ensures a valid JSON 500 response is sent.
    return NextResponse.json(
      { error: "Internal Server Error: Failed to create learner." },
      { status: 500 }
    );
  }
}
