Next.js App with Prisma
This is a Next.js application integrated with Prisma as the ORM for database management. The app is built to provide a robust and scalable full-stack solution with a modern frontend and efficient database interactions.
Features

Next.js: A React framework for server-side rendering, static site generation, and API routes.
Prisma: A modern ORM for Node.js and TypeScript, simplifying database access and management.
TypeScript: Ensures type safety across the application.
Responsive UI: Built with modern CSS frameworks (e.g., Tailwind CSS, if applicable).
API Routes: Backend endpoints powered by Next.js API routes.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher)
npm or yarn
A database (e.g., PostgreSQL, MySQL, SQLite) compatible with Prisma
Prisma CLI

Installation

Clone the Repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


Install Dependencies:
npm install
# or
yarn install


Set Up Environment Variables:Create a .env file in the root directory and configure your database connection string. Example:
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"


Set Up Prisma:Initialize Prisma and generate the client:
npx prisma init
npx prisma generate


Run Database Migrations:Apply the database schema defined in prisma/schema.prisma:
npx prisma migrate dev --name init



Running the Application

Development Mode:Start the Next.js development server:
npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser to see the app.

Build for Production:Build the application for production:
npm run build
# or
yarn build


Start Production Server:Run the production build:
npm run start
# or
yarn start



Project Structure
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma
├── pages/                  # Next.js pages and API routes
│   ├── api/               # API endpoints
│   └── index.tsx          # Main page
├── components/             # React components
├── styles/                 # CSS or Tailwind styles
├── public/                 # Static assets
├── .env                    # Environment variables
└── README.md               # This file

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
