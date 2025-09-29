import { NextResponse } from "next/server";
// import { PrismaClient } from "@/generated/prisma-client";
import { PrismaClient } from "@/generated/prisma-client";
import { Subject } from "@/lib/types";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const subjects: Subject[] = await prisma.subject.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ subjects }, { status: 200 });
  } catch (error) {
    console.log("Error loading subjects:", error);
    return NextResponse.json(
      { error: "Failed to load subjects from the database." },
      { status: 500 }
    );
  }
}
