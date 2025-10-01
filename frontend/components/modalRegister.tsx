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
import { AuthContext } from "@/lib/authContext";
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
  const { login } = useContext(AuthContext); // Add AuthContext
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
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

    // Client-side validation
    if (
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Success: Update AuthContext and close modal
      login(); // Set isLoggedIn=true
      onRegister?.();
      onOpenChange();
    } catch (err) {
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
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
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
                label="First Name"
                placeholder="Enter your first name"
                variant="bordered"
                name="firstName"
                value={formData.firstName} // Fixed typo: foArmData -> formData
                onChange={handleInputChange}
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                variant="bordered"
                name="lastName"
                value={formData.lastName}
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
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                variant="bordered"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
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
                Sign up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
