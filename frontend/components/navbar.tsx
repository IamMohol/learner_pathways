import { useContext } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/navbar";
import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useDisclosure } from "@heroui/modal";
import { AuthContext } from "@/lib/authContext";
import { siteConfig } from "@/config/site";
import LoginModal from "@/components/modalAuth";
import RegisterModal from "@/components/modalRegister";

export default function Navbar() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
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

  return (
    <>
      <HeroNavbar maxWidth="xl" isMenuOpen={false} suppressHydrationWarning>
        <NavbarBrand>
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink href={item.href} className="text-foreground">
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar isBordered color="primary" />
              </DropdownTrigger>
              <DropdownMenu aria-label="User actions">
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
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <NextLink href={item.href} className="text-foreground">
                {item.label}
              </NextLink>
            </li>
          ))}
        </NavbarMenu>
      </HeroNavbar>
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
