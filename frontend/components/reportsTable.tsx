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
import ReportModal, { LearnerReportAPI } from "./ReportModal";

type Learner = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function LearnerPathwaysTable() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [report, setReport] = useState<LearnerReportAPI | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

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
      setModalOpen(true);
      setReport(null);
      setLoadingReport(true);

      const res = await fetch(`/api/reports/pathways?learnerId=${learnerId}`);
      if (!res.ok) throw new Error("Failed to generate report");

      const data: LearnerReportAPI = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Error generating report", err);
      setReport(null);
    } finally {
      setLoadingReport(false);
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
              <TableCell className="text-center">
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => handleGenerateReport(learner.id)}
                  isLoading={loadingReport}
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
