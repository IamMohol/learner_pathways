import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { AddIcon } from "@/components/icons";
import LearnerPathwaysTable from "@/components/TableLearnerPathways";
export default function ReportsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4 md:py-2">
        <div className="inline-block max-w-xl">
          <span className={title()}>Hello 👋&nbsp;</span>
          <span className={title({ color: "blue" })}>Teacher Name,&nbsp;</span>
          <br />
          <div className="flex-row">
            <div className={subtitle({ class: "mt-4" })}>
              Generate learner pathways
            </div>
          </div>
          {/* <Button color="success" endContent={<AddIcon />}>
            Generate a Pathway
          </Button> */}
        </div>
        <div className="">
          <LearnerPathwaysTable />
        </div>
      </section>
    </DefaultLayout>
  );
}
