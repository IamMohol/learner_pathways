"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { AddIcon, DeleteIcon } from "./icons";
import { Input } from "@heroui/input";
import SubjectDropdown from "./dropdownSubjects";

type MarksModalProps = {
  learnerId: number;
  learnerName: string;
  onCloseModal: () => void;
};

type GradeRow = {
  id: number; // unique per row
  subjectId: number | "";
  mark: string;
};

export default function MarksModal({
  learnerId,
  learnerName,
  onCloseModal,
}: MarksModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultOpen: true });
  const [grades, setGrades] = useState<GradeRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextId, setNextId] = useState(1); // keeps track of unique IDs

  // Load existing marks
  useEffect(() => {
    const fetchMarks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/marks?learnerId=${learnerId}`);
        if (!res.ok) throw new Error("Failed to fetch marks");

        const data = await res.json();
        if (data.marks && data.marks.length > 0) {
          setGrades(
            data.marks.map((m: any, idx: number) => ({
              id: idx + 1,
              subjectId: m.subject?.id || "",
              mark: m.score.toString(),
            }))
          );
          setNextId(data.marks.length + 1);
        } else {
          setGrades([{ id: 1, subjectId: "", mark: "" }]);
          setNextId(2);
        }
      } catch (err) {
        console.error("Error loading marks:", err);
        setGrades([{ id: 1, subjectId: "", mark: "" }]);
        setNextId(2);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [learnerId]);

  const addRow = () => {
    setGrades((prev) => [...prev, { id: nextId, subjectId: "", mark: "" }]);
    setNextId((prev) => prev + 1);
  };

  const removeRow = (id: number) => {
    setGrades((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learnerId, marks: grades }),
      });

      if (!res.ok) throw new Error("Failed to save marks");
      alert("Marks saved successfully!");
      onClose();
      onCloseModal();
    } catch (err) {
      console.error("Error saving marks:", err);
      alert("Failed to save marks");
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        onCloseModal();
      }}
      size="4xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Marks for {learnerName}
            </ModalHeader>

            <ModalBody>
              {loading ? (
                <p>Loading marks...</p>
              ) : (
                <>
                  {grades.map((grade) => (
                    <div
                      key={grade.id}
                      className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4 items-center"
                    >
                      <SubjectDropdown
                        selected={grade.subjectId || ""}
                        onChange={(val) =>
                          setGrades((prev) =>
                            prev.map((g) =>
                              g.id === grade.id ? { ...g, subjectId: val } : g
                            )
                          )
                        }
                      />
                      <Input
                        label="Mark"
                        labelPlacement="outside"
                        type="number"
                        value={grade.mark}
                        onChange={(e) =>
                          setGrades((prev) =>
                            prev.map((g) =>
                              g.id === grade.id
                                ? { ...g, mark: e.target.value }
                                : g
                            )
                          )
                        }
                      />
                      {grades.length > 1 && (
                        <Button
                          isIconOnly
                          color="danger"
                          variant="flat"
                          onPress={() => removeRow(grade.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button color="success" variant="flat" onPress={addRow}>
                      <AddIcon />
                      Add Grade
                    </Button>
                  </div>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  onCloseModal();
                }}
              >
                Close
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save Grades
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
