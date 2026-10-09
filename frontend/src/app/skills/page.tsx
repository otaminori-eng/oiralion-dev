import PageTitle from "@/components/ui/PageTitle";
import Tag from "@/components/ui/Tag";
import { getSkills } from "@/lib/skills";

const SkillsPage = async () => {
  const skills = await getSkills();
  return (
    <main className="px-gutter pb-12">
      <div className="mx-auto max-w-[920px]">
        <PageTitle title="Skills" description="使っている技術" />
        {skills.length === 0 ? (
          <p className="text-sub">作成中</p>
        ) : (
          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
            {skills.map((skill) => (
              <section
                key={skill.category}
                className="flex flex-col gap-2.5 rounded-[4px] border border-rule bg-card px-4 pt-3.5 pb-4"
              >
                <h2 className="text-[13px] font-bold">{skill.category}</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <li key={item.name}>
                      <Tag>{item.name}</Tag>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SkillsPage;
