"use client";

import { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Icon from "./NewIcon";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<void>;
  onRegister: (username: string, password: string) => Promise<void>;
}

export default function AuthModal({
  onClose,
  onLogin,
  onRegister,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await onLogin(username, password);
      } else {
        await onRegister(username, password);
      }
      onClose();
    } catch (err) {
      setError("An error occurred");
    }
  };

  //   if (!isOpen) return null;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Icon
            icon={isLogin ? ArrowRightOnRectangleIcon : UserPlusIcon}
            className="mr-2"
          />
          {isLogin ? "Login" : "Register"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <Icon icon={UserIcon} className="mr-2 text-gray-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <Icon icon={LockClosedIcon} className="mr-2 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center hover:bg-blue-600"
          >
            <Icon
              icon={isLogin ? ArrowRightOnRectangleIcon : UserPlusIcon}
              className="mr-2"
              size="sm"
            />
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-gray-500 hover:underline w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
}
