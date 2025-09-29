"use client";

import { Subject } from "@/lib/types";
import { Select, SelectItem } from "@heroui/select";
import React, { useEffect, useState } from "react";

type Props = {
  selected: number | ""; // subjectId from DB
  onChange: (value: number) => void;
};

export default function SubjectDropdown({ selected, onChange }: Props) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects");
        if (!res.ok) throw new Error("Failed to load subjects");
        const data = await res.json();
        setSubjects(data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects", err);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        className="max-w-xs"
        label="Select a subject"
        labelPlacement="outside"
        selectedKeys={selected ? [String(selected)] : []} // ✅ must be string
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0]; // HeroUI returns a Set
          if (key) {
            onChange(Number(key)); // convert back to number
          }
        }}
      >
        {subjects.map((subject) => (
          <SelectItem key={String(subject.id)}>{subject.name}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
