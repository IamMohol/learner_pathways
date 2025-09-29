"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import ReportModal from "./ReportModal";

type Learner = {
  id: number;
  firstName: string;
  lastName: string;
};

type LearnerReport = {
  learnerId: number;
  learnerName: string;
  totalAverage: number;
  pathways: {
    pathwayId: number;
    pathwayName: string;
    averageScore: number;
    viabilityPercentage: number;
  }[];
};

export default function LearnerPathwaysTable() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [report, setReport] = useState<LearnerReport | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const res = await fetch("/api/learners");
        if (!res.ok) throw new Error("Failed to load learners");
        const data = await res.json();
        setLearners(data.learners || []);
      } catch (err) {
        console.error("Error fetching learners", err);
      }
    };
    fetchLearners();
  }, []);

  const handleGenerateReport = async (learnerId: number) => {
    try {
      setReport(null); // Reset previous report
      setModalOpen(true); // Open modal immediately to show spinner
      const res = await fetch(`/api/reports/pathways?learnerId=${learnerId}`);
      if (!res.ok) throw new Error("Failed to generate report");
      const data: LearnerReport = await res.json();
      setReport(data); // Modal updates automatically
    } catch (err) {
      console.error("Error generating report", err);
      setReport(null);
    }
  };

  return (
    <>
      <Table aria-label="Learner Pathways Table">
        <TableHeader>
          <TableColumn key="student">Student</TableColumn>
          <TableColumn key="actions" align="center">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody items={learners}>
          {(learner) => (
            <TableRow key={learner.id}>
              <TableCell>
                {learner.firstName} {learner.lastName} (ID: {learner.id})
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => handleGenerateReport(learner.id)}
                >
                  Generate Report
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setReport(null);
        }}
        report={report}
      />
    </>
  );
}
