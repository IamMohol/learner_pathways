const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear old data
  await prisma.mark.deleteMany();
  await prisma.pathwaySubject.deleteMany();
  await prisma.pathway.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.learner.deleteMany();

  // Create pathways with subjects + weights
  const stem = await prisma.pathway.create({
    data: {
      name: "STEM",
      description: "Science, Tech, Engineering, Math",
      subjects: {
        create: [
          { subject: { create: { name: "Math" } }, weight: 2.0 },
          { subject: { create: { name: "Physics" } }, weight: 1.5 },
          { subject: { create: { name: "Chemistry" } }, weight: 1.0 },
        ],
      },
    },
  });

  const arts = await prisma.pathway.create({
    data: {
      name: "Arts",
      description: "Humanities and Creative Arts",
      subjects: {
        create: [
          { subject: { create: { name: "History" } }, weight: 1.0 },
          { subject: { create: { name: "Literature" } }, weight: 1.5 },
          { subject: { create: { name: "Music" } }, weight: 1.0 },
        ],
      },
    },
  });

  const business = await prisma.pathway.create({
    data: {
      name: "Business",
      description: "Economics, Accounting, Business Studies",
      subjects: {
        create: [
          { subject: { create: { name: "Economics" } }, weight: 2.0 },
          { subject: { create: { name: "Accounting" } }, weight: 1.5 },
          { subject: { create: { name: "Business Studies" } }, weight: 1.0 },
        ],
      },
    },
  });

  // Create learners
  const alice = await prisma.learner.create({
    data: { firstName: "Alice", lastName: "Johnson" },
  });

  const bob = await prisma.learner.create({
    data: { firstName: "Bob", lastName: "Smith" },
  });

  // Fetch subjects for marks
  const subjects = await prisma.subject.findMany();

  // Add marks for Alice
  await prisma.mark.createMany({
    data: [
      {
        learnerId: alice.id,
        subjectId: subjects.find((s) => s.name === "Math").id,
        score: 92,
      },
      {
        learnerId: alice.id,
        subjectId: subjects.find((s) => s.name === "Physics").id,
        score: 85,
      },
      {
        learnerId: alice.id,
        subjectId: subjects.find((s) => s.name === "Literature").id,
        score: 70,
      },
      {
        learnerId: alice.id,
        subjectId: subjects.find((s) => s.name === "Economics").id,
        score: 88,
      },
    ],
  });

  // Add marks for Bob
  await prisma.mark.createMany({
    data: [
      {
        learnerId: bob.id,
        subjectId: subjects.find((s) => s.name === "History").id,
        score: 95,
      },
      {
        learnerId: bob.id,
        subjectId: subjects.find((s) => s.name === "Music").id,
        score: 80,
      },
      {
        learnerId: bob.id,
        subjectId: subjects.find((s) => s.name === "Math").id,
        score: 65,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
