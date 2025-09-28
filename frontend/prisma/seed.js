const { PrismaClient } = require("../generated/prisma-client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear old data (ensuring correct order)
  await prisma.mark.deleteMany();
  await prisma.pathwaySubject.deleteMany();
  await prisma.pathway.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.learner.deleteMany();

  // 1. Create all base Subjects first (They no longer require pathwayId)
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

  // 2. Create Pathways and link the Subjects via the PathwaySubject model ('pathways' field)
  const stem = await prisma.pathway.create({
    data: {
      name: "STEM",
      description: "Science, Tech, Engineering, Math",
      pathways: {
        // ✅ Use 'pathways' (the M-to-M relation field)
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

  // Create learners
  const alice = await prisma.learner.create({
    data: { firstName: "Alice", lastName: "Johnson" },
  });

  const bob = await prisma.learner.create({
    data: { firstName: "Bob", lastName: "Smith" },
  });

  // Fetch subjects for marks (all subjects are already in memory, but this is clean)
  const subjects = await prisma.subject.findMany();

  // Helper function for finding subject IDs
  const s = (name) => subjects.find((sub) => sub.name === name);

  // Add marks for Alice
  await prisma.mark.createMany({
    data: [
      { learnerId: alice.id, subjectId: s("Math").id, score: 92 },
      { learnerId: alice.id, subjectId: s("Physics").id, score: 85 },
      { learnerId: alice.id, subjectId: s("Literature").id, score: 70 },
      { learnerId: alice.id, subjectId: s("Economics").id, score: 88 },
    ],
  });

  // Add marks for Bob
  await prisma.mark.createMany({
    data: [
      { learnerId: bob.id, subjectId: s("History").id, score: 95 },
      { learnerId: bob.id, subjectId: s("Music").id, score: 80 },
      { learnerId: bob.id, subjectId: s("Math").id, score: 65 },
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
