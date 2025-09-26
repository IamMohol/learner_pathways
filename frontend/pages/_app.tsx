import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider, AuthContext } from "@/lib/authContext";
import { useDisclosure } from "@heroui/modal";
import LoginModal from "@/components/modalAuth";
import RegisterModal from "@/components/modalRegister";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isLoggedIn, login } = useContext(AuthContext);
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

  useEffect(() => {
    const protectedRoutes = ["/hub", "/reports"];
    if (!isLoggedIn && protectedRoutes.includes(router.pathname)) {
      onLoginOpen();
      router.push("/");
    }
  }, [isLoggedIn, router, onLoginOpen]);

  return (
    <AuthProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <HeroUIProvider>
          <Component {...pageProps} />
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
        </HeroUIProvider>
      </NextThemesProvider>
    </AuthProvider>
  );
}
