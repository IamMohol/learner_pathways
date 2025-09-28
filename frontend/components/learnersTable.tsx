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
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";
import MarksModal from "./modalMarks";
import LearnersModal from "./modalLearners";

export const EyeIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.355 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const DeleteIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ACTIONS", uid: "actions" },
];

type Learner = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function LearnersTable() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const res = await fetch("/api/learners");
        if (!res.ok) throw new Error("Failed to fetch learners");
        const data = await res.json();
        setLearners(data.learners || []);
      } catch (err) {
        console.error("❌ Error fetching learners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearners();
  }, []);

  const handleLearnerAdded = (newLearner: Learner) => {
    setLearners((prev) => [...prev, newLearner]);
  };

  const renderCell = (learner: Learner, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            name={`${learner.firstName} ${learner.lastName}`}
            avatarProps={{
              radius: "lg",
              src: `https://i.pravatar.cc/150?u=${learner.id}`,
            }}
            description={`Learner ID: ${learner.id}`}
          />
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="cursor-pointer text-default-400">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit learner">
              <span className="cursor-pointer text-default-400">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip content="Add Marks">
              <MarksModal />
            </Tooltip>
            <Tooltip color="danger" content="Delete learner">
              <span className="cursor-pointer text-danger">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <LearnersModal onLearnerAdded={handleLearnerAdded} />

      <Table aria-label="Learners table" isStriped removeWrapper>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={learners}
          emptyContent={loading ? "Loading learners..." : "No learners found."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
