import PageTitle from "@/components/ui/PageTitle";
import Tag from "@/components/ui/Tag";
import { getCareer } from "@/lib/career";

const formatYearMonth = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月`;

const CareerPage = async () => {
  const career = await getCareer();
  return (
    <main className="px-gutter pb-12">
      <div className="mx-auto max-w-[920px]">
        <PageTitle title="Career" description="これまでの経歴" />
        {career.summary && (
          <p className="mb-7 whitespace-pre-line">{career.summary}</p>
        )}
        {career.projects.length === 0 ? (
          <p className="text-sub">作成中</p>
        ) : (
          <ul className="overflow-hidden rounded-[4px] border border-rule bg-card [--yc:88px] md:[--yc:112px]">
            {career.projects.map((project) => (
              <li key={project.name} className="border-rule not-first:border-t">
                <details className="group bg-[linear-gradient(90deg,var(--color-peri-tint)_0_var(--yc),var(--color-peri-line)_var(--yc)_calc(var(--yc)_+_1px),transparent_calc(var(--yc)_+_1px))]">
                  <summary className="group/summary grid cursor-pointer list-none grid-cols-[var(--yc)_minmax(0,1fr)_14px] items-baseline gap-3 py-[18px] pr-3.5 md:grid-cols-[var(--yc)_minmax(0,1fr)_20px] md:gap-5 md:pr-[22px] [&::-webkit-details-marker]:hidden">
                    <span className="pl-3 md:pl-[18px]">
                      <span className="block font-mono text-[17px] leading-none font-medium text-coral tabular-nums md:text-[20px]">
                        {project.startAt.getFullYear()}
                      </span>
                      <span className="mt-2 block text-[11.5px] font-medium text-peri-ink">
                        {formatYearMonth(project.startAt)}〜<br />
                        {formatYearMonth(project.endAt)}
                      </span>
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <h2 className="text-base font-bold transition-colors group-hover/summary:text-coral motion-reduce:transition-none">
                        {project.name}
                      </h2>
                      <span className="text-[13px] text-sub">
                        {project.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative size-3 self-center justify-self-end before:absolute before:inset-x-0 before:top-1/2 before:border-t-[1.5px] before:border-ink after:absolute after:inset-x-0 after:top-1/2 after:rotate-90 after:border-t-[1.5px] after:border-ink after:transition-transform group-open:after:rotate-0 motion-reduce:after:transition-none"
                    />
                  </summary>
                  <div className="grid gap-x-9 gap-y-4 pr-3.5 pb-6 pl-[calc(var(--yc)_+_12px)] text-sm md:grid-cols-2 md:pr-[22px] md:pl-[calc(var(--yc)_+_20px)]">
                    <div>
                      <h3 className="mb-1 text-[12.5px] font-bold text-sub">
                        概要
                      </h3>
                      <dl className="grid grid-cols-[5em_minmax(0,1fr)] gap-x-3 gap-y-1">
                        <dt className="text-[12.5px] text-sub">チーム</dt>
                        <dd>{project.team}</dd>
                        <dt className="text-[12.5px] text-sub">担当業務</dt>
                        <dd>{project.jobRole}</dd>
                      </dl>
                    </div>
                    <div>
                      <h3 className="mb-1 text-[12.5px] font-bold text-sub">
                        使った技術
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.split("/").map((tech) => (
                          <Tag key={tech}>{tech.trim()}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[3px] bg-coral-tint px-4 py-3 md:col-span-2">
                      <h3 className="mb-1 text-[12.5px] font-bold text-coral-dark">
                        内容
                      </h3>
                      <p className="whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default CareerPage;
