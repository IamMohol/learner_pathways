import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import LearnersTable from "@/components/learnersTable";
export default function LearnersPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4 md:py-2">
        <div className="inline-block max-w-xl">
          <span className={title()}>Hello 👋&nbsp;</span>
          {/* <span className={title({ color: "blue" })}>Teacher Name,&nbsp;</span> */}
          <br />
          <div className="flex-row">
            <div className={subtitle({ class: "mt-4" })}>
              Add learners, grades, and generate pathways
            </div>
          </div>
        </div>
        <div className="">
          <LearnersTable />
        </div>
      </section>
    </DefaultLayout>
  );
}
