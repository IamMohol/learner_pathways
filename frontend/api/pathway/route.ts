import { NextRequest, NextResponse } from "next/server";

const pathways = {
  Math: "STEM",
  Science: "STEM",
  History: "Arts",
  Literature: "Arts",
  Economics: "Business",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const learner = learners.find((l) => l.id === params.id);
  if (!learner) {
    return NextResponse.json({ detail: "Learner not found" }, { status: 404 });
  }
  if (!learner.marks.length) {
    return NextResponse.json({
      pathway: "None",
      details: {},
      message: "No marks available",
    });
  }
  const pathwayScores: { [key: string]: number[] } = {};
  learner.marks.forEach((mark) => {
    const pathway = learner.subjects.find(
      (s) => s.name === mark.subject
    )?.pathway;
    if (pathway) {
      if (!pathwayScores[pathway]) pathwayScores[pathway] = [];
      pathwayScores[pathway].push(mark.score);
    }
  });
  const pathwayAverages = Object.fromEntries(
    Object.entries(pathwayScores).map(([pathway, scores]) => [
      pathway,
      scores.reduce((sum, score) => sum + score, 0) / scores.length,
    ])
  );
  const recommended = Object.entries(pathwayAverages).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["None", 0]
  )[0];
  return NextResponse.json({ pathway: recommended, details: pathwayAverages });
}
