import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen?: () => void;
  onLogin?: () => void;
  onOpenRegister?: () => void;
}

export default function LoginModal({
  isOpen,
  onOpenChange,
  onLogin,
  onOpenRegister,
}: LoginModalProps) {
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
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                label="username"
                placeholder="Enter your username"
                variant="bordered"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <div className="flex gap-2">
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                  <Link
                    color="primary"
                    size="sm"
                    onPress={() => {
                      onClose();
                      onOpenRegister?.();
                    }}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onLogin?.();
                  onClose();
                }}
              >
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
