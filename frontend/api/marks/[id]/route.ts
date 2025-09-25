import { NextRequest, NextResponse } from "next/server";
import { Learner } from "@/lib/types";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { subject, score } = await request.json();
  const learner: [Learner] = learner.find((l) => l.id === params.id);
  if (!learner) {
    return NextResponse.json({ detail: "Learner not found" }, { status: 404 });
  }
  if (!learner.subjects.find((s) => s.name === subject)) {
    return NextResponse.json(
      { detail: "Subject not assigned to learner" },
      { status: 400 }
    );
  }
  if (score < 0 || score > 100) {
    return NextResponse.json(
      { detail: "Score must be between 0 and 100" },
      { status: 400 }
    );
  }
  learner.marks.push({ subject, score });
  return NextResponse.json({ message: "Mark added" });
}
