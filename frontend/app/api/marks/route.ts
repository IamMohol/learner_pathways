import { NextResponse } from "next/server";
// import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaClient } from "@/generated/prisma-client";

const prisma = new PrismaClient();

// ====================================================================
// GET: Fetch all marks, optionally filtered by learnerId
// URL: /api/marks?learnerId=1
// ====================================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const learnerIdParam = searchParams.get("learnerId");

    const whereClause: { learnerId?: number } = {};
    if (learnerIdParam) {
      const numericLearnerId = parseInt(learnerIdParam, 10);
      if (!isNaN(numericLearnerId)) {
        whereClause.learnerId = numericLearnerId;
      }
    }

    const marks = await prisma.mark.findMany({
      where: whereClause,
      include: {
        learner: {
          select: { id: true, firstName: true, lastName: true },
        },
        subject: {
          select: {
            id: true,
            name: true,
            pathways: {
              include: {
                pathway: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });

    const result = marks.map((mark) => ({
      id: mark.id,
      score: mark.score,
      learner: mark.learner,
      subject: {
        id: mark.subject.id,
        name: mark.subject.name,
      },
      pathways: mark.subject.pathways.map((p) => ({
        pathwayId: p.pathwayId,
        pathwayName: p.pathway.name,
        weight: p.weight,
      })),
    }));

    return NextResponse.json({ marks: result }, { status: 200 });
  } catch (error) {
    console.error("Error loading marks:", error);
    return NextResponse.json(
      { error: "Failed to load marks from the database." },
      { status: 500 }
    );
  }
}

// ====================================================================
// POST: Add a new mark (with validation and error handling)
// URL: /api/marks
// ====================================================================

export async function POST(request: Request) {
  const body = await request.json();
  const { learnerId, marks } = body;

  // Validate body
  if (!learnerId || !Array.isArray(marks) || marks.length === 0) {
    return NextResponse.json(
      { error: "learnerId and non-empty marks array are required." },
      { status: 400 }
    );
  }

  try {
    // Check if learner exists
    const learner = await prisma.learner.findUnique({
      where: { id: learnerId },
    });
    if (!learner) {
      return NextResponse.json(
        { error: `Learner with ID ${learnerId} not found.` },
        { status: 404 }
      );
    }

    // Validate subjects
    const subjectIds = marks.map((m: any) => m.subjectId);
    const subjects = await prisma.subject.findMany({
      where: { id: { in: subjectIds } },
    });

    const validSubjectIds = subjects.map((s) => s.id);
    const invalidIds = subjectIds.filter((id) => !validSubjectIds.includes(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid subject IDs: ${invalidIds.join(", ")}` },
        { status: 404 }
      );
    }

    // Prepare mark records
    const markData = marks.map((m: any) => {
      const score = Number(m.mark);
      if (isNaN(score)) {
        throw new Error(
          `Score must be a number. Invalid value for subjectId ${m.subjectId}`
        );
      }
      return { learnerId, subjectId: m.subjectId, score };
    });

    // Insert marks in bulk
    const createdMarks = await prisma.mark.createMany({
      data: markData,
    });

    return NextResponse.json(
      { message: "Marks saved successfully", created: createdMarks.count },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating marks:", error);
    return NextResponse.json(
      {
        error:
          error.message || "Internal Server Error: Failed to create marks.",
      },
      { status: 500 }
    );
  }
}
