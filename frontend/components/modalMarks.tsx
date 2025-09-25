import React, { useState } from "react";
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
import { GradesIcon } from "./icons";
import SubjectDropdown from "./dropdownSubjects";

export default function MarksModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [grades, setGrades] = useState([{ id: 1, subject: "", mark: "" }]);
  const [nextId, setNextId] = useState(2);

  const handleOpen = () => {
    onOpen();
  };

  const addRow = () => {
    setGrades([...grades, { id: nextId, subject: "", mark: "" }]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: any) => {
    const newGrades = grades.filter((grade) => grade.id !== id);
    setGrades(newGrades);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="text-lg text-default-400"
          onPress={() => handleOpen()}
        >
          <GradesIcon />
        </Button>
      </div>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Student Name
              </ModalHeader>
              <ModalBody>
                {grades.map((grade) => (
                  <div
                    key={grade.id}
                    className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4 items-center"
                  >
                    <SubjectDropdown />
                    <Input
                      label="Mark"
                      labelPlacement="outside"
                      type="number"
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save Grades
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
