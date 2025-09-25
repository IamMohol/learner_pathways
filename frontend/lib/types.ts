export interface Learner {
  id: string;
  name: string;
  subjects: { name: string; pathway: string }[];
  marks: { subject: string; score: number }[];
}

export interface Report {
  pathway: string;
  details: { [key: string]: number };
  message?: string;
}
