import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const learners = await prisma.learner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(learners);
  } catch (error) {
    console.error("Error fetching learners:", error);
    return NextResponse.json(
      { error: "Failed to fetch learners" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { firstName, middleName, lastName } = await req.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    const learner = await prisma.learner.create({
      data: { firstName, middleName, lastName },
    });

    return NextResponse.json(learner, { status: 201 });
  } catch (error) {
    console.error("Error creating learner:", error);
    return NextResponse.json(
      { error: "Failed to create learner" },
      { status: 500 }
    );
  }
}
