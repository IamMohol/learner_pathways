import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useDisclosure } from "@heroui/modal";
import { AuthProvider, useAuth } from "@/lib/authContext";
import LoginModal from "@/components/modalAuth";
import RegisterModal from "@/components/modalRegister";
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, login } = useAuth();
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

  useEffect(() => {
    // Allow access to landing page (/) regardless of login status
    if (router.pathname === "/") {
      return;
    }

    // Redirect to / and open LoginModal for protected routes if not logged in
    if (
      !isLoggedIn &&
      (router.pathname.startsWith("/hub") ||
        router.pathname.startsWith("/reports"))
    ) {
      router.push("/");
      onLoginOpen();
    }
  }, [isLoggedIn, router.pathname, router, onLoginOpen]);

  return (
    <>
      {children}
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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </NextThemesProvider>
      </HeroUIProvider>
    </AuthProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
