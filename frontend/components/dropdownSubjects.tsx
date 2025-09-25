import { Select, SelectItem } from "@heroui/select";

export const subjects = [
  { key: "math", label: "Math" },
  { key: "english", label: "English" },
  { key: "physics", label: "Physics" },
  { key: "biology", label: "Biology" },
];

export default function SubjectDropdown() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        className="max-w-xs"
        label="Select an subject"
        labelPlacement="outside"
      >
        {subjects.map((subject) => (
          <SelectItem key={subject.key}>{subject.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
