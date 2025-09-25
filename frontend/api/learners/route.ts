import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Learner } from "@/lib/types";
let learners: Learner[] = []; // In-memory data

export async function POST(request: NextRequest) {
  const { name, subjects } = await request.json();
  const learner: Learner = {
    id: uuidv4(),
    name,
    subjects,
    marks: [],
  };
  learners.push(learner);
  return NextResponse.json({ id: learner.id, name: learner.name });
}

export async function GET() {
  return NextResponse.json(learners);
}
