// frontend/prisma/seed.js
const { PrismaClient } = require("../generated/prisma-client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  try {
    // Clear old data (ensuring correct order)
    await prisma.mark
      .deleteMany()
      .catch(() => console.log("No Mark data to clear"));
    await prisma.pathwaySubject
      .deleteMany()
      .catch(() => console.log("No PathwaySubject data to clear"));
    await prisma.pathway
      .deleteMany()
      .catch(() => console.log("No Pathway data to clear"));
    await prisma.subject
      .deleteMany()
      .catch(() => console.log("No Subject data to clear"));
    await prisma.learner
      .deleteMany()
      .catch(() => console.log("No Learner data to clear"));

    // Create Subjects
    const math = await prisma.subject.create({ data: { name: "Math" } });
    const physics = await prisma.subject.create({ data: { name: "Physics" } });
    const chemistry = await prisma.subject.create({
      data: { name: "Chemistry" },
    });
    const history = await prisma.subject.create({ data: { name: "History" } });
    const literature = await prisma.subject.create({
      data: { name: "Literature" },
    });
    const music = await prisma.subject.create({ data: { name: "Music" } });
    const economics = await prisma.subject.create({
      data: { name: "Economics" },
    });
    const accounting = await prisma.subject.create({
      data: { name: "Accounting" },
    });
    const businessStudies = await prisma.subject.create({
      data: { name: "Business Studies" },
    });

    // Create Pathways
    const stem = await prisma.pathway.create({
      data: {
        name: "STEM",
        description: "Science, Tech, Engineering, Math",
        pathways: {
          create: [
            { subjectId: math.id, weight: 2.0 },
            { subjectId: physics.id, weight: 1.5 },
            { subjectId: chemistry.id, weight: 1.0 },
          ],
        },
      },
    });
    const arts = await prisma.pathway.create({
      data: {
        name: "Arts",
        description: "Humanities and Creative Arts",
        pathways: {
          create: [
            { subjectId: history.id, weight: 1.0 },
            { subjectId: literature.id, weight: 1.5 },
            { subjectId: music.id, weight: 1.0 },
          ],
        },
      },
    });
    const business = await prisma.pathway.create({
      data: {
        name: "Business",
        description: "Economics, Accounting, Business Studies",
        pathways: {
          create: [
            { subjectId: economics.id, weight: 2.0 },
            { subjectId: accounting.id, weight: 1.5 },
            { subjectId: businessStudies.id, weight: 1.0 },
          ],
        },
      },
    });

    // Create Learners
    const alice = await prisma.learner.create({
      data: { firstName: "Alice", lastName: "Johnson" },
    });
    const bob = await prisma.learner.create({
      data: { firstName: "Bob", lastName: "Smith" },
    });

    // Add Marks
    await prisma.mark.createMany({
      data: [
        { learnerId: alice.id, subjectId: math.id, score: 92 },
        { learnerId: alice.id, subjectId: physics.id, score: 85 },
        { learnerId: alice.id, subjectId: literature.id, score: 70 },
        { learnerId: alice.id, subjectId: economics.id, score: 88 },
        { learnerId: bob.id, subjectId: history.id, score: 95 },
        { learnerId: bob.id, subjectId: music.id, score: 80 },
        { learnerId: bob.id, subjectId: math.id, score: 65 },
      ],
    });

    console.log("✅ Database seeded successfully!");
  } catch (e) {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
