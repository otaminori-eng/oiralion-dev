import { getCareer } from "@/lib/career";

const CareerPage = async () => {
  const career = await getCareer();
  return (
    <main>
      {career.length === 0 ? (
        <span>作成中</span>
      ) : (
        <ul>
          {career.map((project) => (
            <li key={project.name}>
              <details>
                <summary>
                  <span>
                    {project.startAt}〜{project.endAt}
                  </span>
                  <h2>{project.name}</h2>
                  <p>{project.summary}</p>
                </summary>
                <dl>
                  <dt>チーム</dt>
                  <dd>{project.team}</dd>
                  <dt>担当業務</dt>
                  <dd>{project.jobRole}</dd>
                </dl>
                <p className="whitespace-pre-line">{project.description}</p>
                <dt>使った技術</dt>
                <dd>{project.techStack}</dd>
              </details>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default CareerPage;
