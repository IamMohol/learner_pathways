import { useContext } from "react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import LoginModal from "@/components/modalAuth";
import RegisterModal from "@/components/modalRegister";
import { AuthContext } from "@/lib/authContext";

export default function IndexPage() {
  const { login } = useContext(AuthContext);
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
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Using smart tech to guide education&nbsp;
          </span>
          <span className={title({ color: "blue" })}>pathways&nbsp;</span>
          <br />
          <div className={subtitle({ class: "mt-4" })}>
            Simple. Fast. Usable
          </div>
        </div>
        <div className="flex">
          <Button
            onPress={onLoginOpen}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
          >
            Get Started
          </Button>
        </div>
      </section>
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
    </DefaultLayout>
  );
}
