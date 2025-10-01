import { useState, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { AuthContext } from "@/lib/authContext";
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
  const { login } = useContext(AuthContext); // Add AuthContext
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!formData.username || !formData.password) {
        setError("Username and password are required");
        setIsLoading(false);
        return;
      }
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }
      login(); // Set isLoggedIn=true
      onLogin?.();
      onOpenChange();
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Input
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="flex py-2 px-1 justify-between">
                <Link
                  color="primary"
                  href="#"
                  size="sm"
                  onPress={() => {
                    onOpenRegister?.();
                    onClose();
                  }}
                >
                  Sign up
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Log in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
