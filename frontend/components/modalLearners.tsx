import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { AddIcon } from "./icons";
import { Input } from "@heroui/input";
export default function LearnersModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="primary"
          endContent={<AddIcon />}
          onPress={() => handleOpen()}
        >
          Add Student
        </Button>
      </div>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Student Management
              </ModalHeader>
              <ModalBody>
                <Image
                  alt="HeroUI hero Image"
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={300}
                />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input label="First Name" />
                  <Input label="Middle Name" />
                  <Input label="Last Name" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save Student
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
