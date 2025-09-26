import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/lib/authContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <HeroUIProvider>
          <Component {...pageProps} />
        </HeroUIProvider>
      </NextThemesProvider>
    </AuthProvider>
  );
}
