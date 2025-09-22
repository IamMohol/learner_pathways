import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Using smart tech to guide education&nbsp;
          </span>
          <span className={title({ color: "blue" })}>pathways&nbsp;</span>
          <br />
          {/* <span className={title()}>Merging teacher guidancce data</span> */}
          <div className={subtitle({ class: "mt-4" })}>
            Simple. Fast. Usable
          </div>
        </div>

        <div className="flex">
          <Button
            showAnchorIcon
            as={Link}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            href={siteConfig.links.docs}
          >
            Get Started
          </Button>
        </div>

        {/* <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
      </section>
    </DefaultLayout>
  );
}
