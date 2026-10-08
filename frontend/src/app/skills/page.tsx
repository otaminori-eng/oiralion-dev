import { getSkills, type Skills } from "@/lib/skills";

const SkillsPage = async () => {
  const skills: Skills = await getSkills();
  return (
    <main>
      <div>
        <h1>Skills</h1>
        <span>スキル</span>
      </div>
      <div>
        {skills.length === 0 ? (
          <span>作成中</span>
        ) : (
          skills.map((skill) => (
            <section key={skill.category}>
              <h2>{skill.category}</h2>
              <ul>
                {skill.items.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </main>
  );
};

export default SkillsPage;
