Next.js App with Prisma

Screenshots
Below are some screenshots of the application:

Description: The main landing page of the application.
<img width="1344" height="607" alt="homeloggedout" src="https://github.com/user-attachments/assets/767a96b5-8e82-40f7-b413-6c1021e2e87a" />

Description: The Register Modal
<img width="1257" height="588" alt="register" src="https://github.com/user-attachments/assets/fb7bae1a-ce16-4377-8e4e-c563bcaf5230" />

Description: Marks Addition for student
<img width="1355" height="551" alt="marksaddition" src="https://github.com/user-attachments/assets/24da9b8e-816d-451e-a66e-806cc821a073" />

Description: Pathway Reports for student
<img width="1370" height="616" alt="pathway_reports" src="https://github.com/user-attachments/assets/8febdd6f-23e1-4613-8045-7fd3afdc0eca" />

Schema Code

generator client {
  provider = "prisma-client-js"
  output = "../generated/prisma-client"
}

datasource db {
  provider = "sqlite"
  url = env("DATABASE_URL")
}

model User {
  id Int @id @default(autoincrement())
  firstName String
  lastName String
  username String @unique
  password String
  createdAt DateTime @default(now())
}

model Learner {
  id Int @id @default(autoincrement())
  firstName String
  lastName String
  marks Mark[]
}

model Pathway {
  id Int @id @default(autoincrement())
  name String @unique
  description String?
  pathways PathwaySubject[]
}

model PathwaySubject {
  id Int @id @default(autoincrement())
  pathwayId Int
  pathway Pathway @relation(fields: [pathwayId], references: [id])
  subjectId Int
  subject Subject @relation(fields: [subjectId], references: [id])
  weight Float @default(1.0)
  @@unique([pathwayId, subjectId])
}

model Subject {
  id Int @id @default(autoincrement())
  name String
  marks Mark[]
  pathways PathwaySubject[]
}

model Mark {
  id Int @id @default(autoincrement())
  score Float
  createdAt DateTime @default(now())
  learnerId Int
  subjectId Int
  learner Learner @relation(fields: [learnerId], references: [id])
  subject Subject @relation(fields: [subjectId], references: [id])
  @@index([learnerId])
  @@index([subjectId])
  @@unique([learnerId, subjectId], map: "one_mark_per_learner_subject_exam")
}
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License.
