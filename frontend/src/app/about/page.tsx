import { getProfile } from "@/lib/content";

const AboutPage = async () => {
  const profile = await getProfile();
  return (
    <main>
      {/*ここに画像が差し込まれる*/}
      <table>
        <tr>
          <th>拠点</th>
          <td>{profile.location}</td>
        </tr>
        <tr>
          <th>開始時期</th>
          <td>{profile.startFrom}</td>
        </tr>
        <tr>
          <th>担当業務</th>
          <td>{profile.role}</td>
        </tr>
        <tr>
          <th>ひとこと</th>
          <td>{profile.value}</td>
        </tr>
      </table>
    </main>
  );
};

export default AboutPage;
