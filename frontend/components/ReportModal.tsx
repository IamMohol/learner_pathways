"use client";
import React, { useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import { Chip } from "@heroui/chip";
type PathwayReport = {
  pathway: string;
  description: string;
  viabilityPercentage: string;
};

type LearnerReportAPI = {
  learner: { id: number; name: string };
  totalAverage: string | number;
  pathwayReports: PathwayReport[];
};

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: LearnerReportAPI | null;
}

export default function ReportModal({
  isOpen,
  onClose,
  report,
}: ReportModalProps) {
  const safeReport = useMemo(() => {
    if (!report) return null;

    const pathways = report.pathwayReports.map((p, idx) => ({
      id: idx,
      name: p.pathway,
      description: p.description,
      viabilityPercentage:
        p.viabilityPercentage === "N/A" ? 0 : Number(p.viabilityPercentage),
    }));

    return {
      learnerName: report.learner.name,
      totalAverage: Number(report.totalAverage) || 0,
      pathways,
    };
  }, [report]);

  const loading = !safeReport;

  // Predefined gradients for each card (loop through)
  const gradients = [
    "from-violet-500 to-fuchsia-500",
    "from-green-400 to-teal-500",
    "from-yellow-400 to-orange-500",
    "from-pink-500 to-red-500",
    "from-blue-400 to-indigo-500",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {safeReport?.learnerName || "Loading..."} – Pathway Report
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <CircularProgress
                    size="lg"
                    showValueLabel={false}
                    color="primary"
                  />
                </div>
              ) : safeReport.pathways.length > 0 ? (
                <div className="space-y-6">
                  <p>
                    <strong>Total Average:</strong>{" "}
                    {safeReport.totalAverage.toFixed(2)}%
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {safeReport.pathways.map((p, idx) => {
                      const gradient = gradients[idx % gradients.length];
                      return (
                        <Card
                          key={p.id}
                          className={`w-[240px] h-[240px] border-none bg-gradient-to-br ${gradient} text-white flex flex-col justify-center items-center`}
                        >
                          <CardBody className="flex justify-center items-center pb-0">
                            <h1>{p.name}</h1>
                            <CircularProgress
                              classNames={{
                                svg: "w-36 h-36 drop-shadow-md",
                                indicator: "stroke-white",
                                track: "stroke-white/20",
                                value: "text-3xl font-semibold text-white",
                              }}
                              showValueLabel={true}
                              strokeWidth={4}
                              value={p.viabilityPercentage}
                            />
                          </CardBody>
                          <CardFooter className="flex justify-center items-center pt-2">
                            <Chip
                              classNames={{
                                base: "border-1 border-white/30",
                                content:
                                  "text-white/90 text-small font-semibold",
                              }}
                              variant="bordered"
                            >
                              {p.description}
                            </Chip>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p>No pathways available</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
