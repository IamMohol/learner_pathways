import React, { useState, useEffect } from "react";
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

// Define the shape of the form data
interface FormData {
  firstName: string;
  lastName: string;
}

export default function LearnersModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 1. STATE TO PREVENT HYDRATION MISMATCH
  const [hasMounted, setHasMounted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. EFFECT HOOK TO INDICATE CLIENT MOUNT
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpen = () => {
    // Reset state when opening the modal
    setFormData({ firstName: "", lastName: "" });
    setError(null);
    onOpen();
  };

  const handleSubmit = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First Name and Last Name are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/learners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const testUserData = await response.json();
      // console.log("HEr is the data");
      // console.log(testUserData.body);
      if (!response.ok) {
        // const errorData = await response.json();
        throw new Error(`Failed to save student (Status: ${response.status})`);
      }

      // Success
      alert(
        `Successfully added student: ${formData.firstName} ${formData.lastName}`
      );
      onClose();
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        err.message || "An unexpected error occurred during submission."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 3. CONDITIONAL RENDER
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button color="primary" endContent={<AddIcon />} onPress={handleOpen}>
          Add Student
        </Button>
      </div>

      {/* The Modal is rendered only after the client mounts */}
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

                {/* Input Fields */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    isInvalid={!!error && !formData.firstName.trim()}
                    errorMessage={
                      !!error && !formData.firstName.trim()
                        ? "First Name is required"
                        : undefined
                    }
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    isInvalid={!!error && !formData.lastName.trim()}
                    errorMessage={
                      !!error && !formData.lastName.trim()
                        ? "Last Name is required"
                        : undefined
                    }
                  />
                </div>

                {/* Global Error Display */}
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Student"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
