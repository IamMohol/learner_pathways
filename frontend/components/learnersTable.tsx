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
import { Chip } from "@heroui/chip";
import MarksModal from "./modalMarks";
import { DeleteIcon } from "./icons";

// Same columns as before
const columns = [
  { name: "NAME", uid: "name" },
  { name: "ACTIONS", uid: "actions" },
];

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
type Learner = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function LearnersTable() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch learners from API
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

  const renderCell = React.useCallback(
    (learner: Learner, columnKey: string) => {
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
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit learner">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip content="Add Marks">
                <MarksModal />
              </Tooltip>
              <Tooltip color="danger" content="Delete learner">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  return (
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
  );
}
