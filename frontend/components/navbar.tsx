import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Logo } from "./icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import NextLink from "next/link";
import { AuthContext } from "@/lib/authContext";
import { siteConfig } from "@/config/site";
import LoginModal from "@/components/modalAuth";
import RegisterModal from "@/components/modalRegister";
import { useDisclosure } from "@heroui/modal";

export default function Navbar() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const router = useRouter();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onOpenChange: onLoginOpenChange,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onOpenChange: onRegisterOpenChange,
  } = useDisclosure();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <HeroNavbar>
        {/* Brand */}
        <NavbarBrand>
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Learner Pathway</p>
          </NextLink>
        </NavbarBrand>

        {/* Desktop nav items */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                className={`text-foreground ${
                  mounted && router.pathname === item.href ? "font-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right side: auth controls */}
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  color="primary"
                  as="button"
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu" variant="flat">
                <DropdownItem key="profile" asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownItem>
                <DropdownItem key="settings" asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={logout}>
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem>
                <Button color="primary" variant="flat" onPress={onLoginOpen}>
                  Log in
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button color="primary" onPress={onRegisterOpen}>
                  Sign up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </HeroNavbar>

      {/* Custom Mobile Menu */}
      <div className="sm:hidden relative">
        {/* Toggle button always outside ul */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 m-2 rounded-md border border-gray-300"
        >
          Menu
        </button>

        {isMenuOpen && (
          <ul className="flex flex-col gap-2 p-4 bg-background shadow-md absolute top-full left-0 right-0">
            {siteConfig.navItems.map((item) => (
              <li key={item.href} className="w-full">
                <Link
                  href={item.href}
                  className={`text-foreground block w-full p-2 ${
                    mounted && router.pathname === item.href ? "font-bold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onOpenChange={onLoginOpenChange}
        onLogin={login}
        onOpenRegister={onRegisterOpen}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onOpenChange={onRegisterOpenChange}
        onRegister={login}
      />
    </>
  );
}
