// import prisma from "@/lib/prisma";
// import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaClient } from "@/generated/prisma-client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const learnerId = Number(searchParams.get("learnerId"));

    if (!learnerId) {
      return NextResponse.json(
        { error: "learnerId is required" },
        { status: 400 }
      );
    }

    const learner = await prisma.learner.findUnique({
      where: { id: learnerId },
      include: {
        marks: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!learner) {
      return NextResponse.json({ error: "Learner not found" }, { status: 404 });
    }

    const pathways = await prisma.pathway.findMany({
      include: {
        pathways: {
          include: { subject: true },
        },
      },
    });

    const reports = pathways.map((pathway) => {
      let totalWeightedScore = 0;
      let totalWeight = 0;

      pathway.pathways.forEach((ps) => {
        const mark = learner.marks.find((m) => m.subjectId === ps.subjectId);
        if (mark) {
          totalWeightedScore += mark.score * ps.weight;
          totalWeight += ps.weight;
        }
      });

      const percentage =
        totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(2) : "N/A";

      return {
        pathway: pathway.name,
        description: pathway.description,
        viabilityPercentage: percentage,
      };
    });

    const totalAvg =
      learner.marks.length > 0
        ? (
            learner.marks.reduce((sum, m) => sum + m.score, 0) /
            learner.marks.length
          ).toFixed(2)
        : "N/A";

    return NextResponse.json(
      {
        learner: {
          id: learner.id,
          name: `${learner.firstName} ${learner.lastName}`,
        },
        totalAverage: totalAvg,
        pathwayReports: reports,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating pathway report:", error);
    return NextResponse.json(
      { error: "Internal server error generating report" },
      { status: 500 }
    );
  }
}
