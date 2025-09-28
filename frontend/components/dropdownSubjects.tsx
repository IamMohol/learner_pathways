"use client";
import { Subject } from "@/lib/types";
import { Select, SelectItem } from "@heroui/select";
import React, { useEffect, useState } from "react";

export const subjects = [
  { key: "math", label: "Math" },
  { key: "english", label: "English" },
  { key: "physics", label: "Physics" },
  { key: "biology", label: "Biology" },
];

export default function SubjectDropdown() {
  const [subjects, setSubjets] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects");
        if (!res.ok) throw new Error("Failed to load subjects");
        const data = await res.json();
        setSubjets(data.subjects || []);
      } catch (err) {
        console.log("Error fetching subjects", err);
      }
    };
    fetchSubjects();
  }, []);
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        className="max-w-xs"
        label="Select an subject"
        labelPlacement="outside"
      >
        {subjects.map((subject) => (
          <SelectItem key={subject.id}>{subject.name}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
