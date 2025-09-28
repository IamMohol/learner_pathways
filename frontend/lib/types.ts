export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface Learner {
  id: number;
  firstName: string;
  lastName: string;
  marks?: Mark[];
}

export interface Pathway {
  id: number;
  name: string;

  description: string | null;
  pathways?: PathwaySubject[];
}

export interface Subject {
  id: number;
  name: string;
  marks?: Mark[];
  pathways?: PathwaySubject[];
}

export interface PathwaySubject {
  id: number;
  pathwayId: number;
  subjectId: number;
  weight: number;
  pathway?: Pathway;
  subject?: Subject;
}

export interface Mark {
  id: number;
  score: number;
  createdAt: Date;
  learnerId: number;
  subjectId: number;
  learner?: Learner;
  subject?: Subject;
}

export type CreateUser = Omit<User, "id" | "createdAt">;

/**
 * Type for creating a new Learner.
 */
export type CreateLearner = Omit<Learner, "id" | "marks">;

/**
 * Type for creating a new Pathway.
 * 'description' is optional on creation.
 */
export type CreatePathway = Omit<Pathway, "id" | "pathways">;

/**
 * Type for creating a new Subject.
 */
export type CreateSubject = Omit<Subject, "id" | "marks" | "pathways">;

/**
 * Type for creating a Mark.
 * Uses IDs for relationships and omits auto-generated fields.
 */
export type CreateMark = Omit<Mark, "id" | "createdAt" | "learner" | "subject">;

/**
 * Type for connecting a Pathway to a Subject.
 * Uses IDs and omits auto-generated ID and relational objects.
 */
export type CreatePathwaySubject = Omit<
  PathwaySubject,
  "id" | "pathway" | "subject"
>;

/**
 * Utility type to represent an item being updated.
 * Makes all properties optional to allow partial updates.
 */
export type UpdateMark = Partial<CreateMark>;
export type UpdateUser = Partial<CreateUser>;
// Add more Update types as needed for other models.
