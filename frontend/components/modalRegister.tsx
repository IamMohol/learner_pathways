import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface RegisterModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen?: () => void;
  onRegister?: () => void;
}

export default function RegisterModal({
  isOpen,
  onOpenChange,
  onRegister,
}: RegisterModalProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
            <ModalBody>
              <Input
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onRegister?.();
                  onClose();
                }}
              >
                Sign up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
