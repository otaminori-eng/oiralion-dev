import { getProfile } from "@/lib/profile";

const AboutPage = async () => {
  const profile = await getProfile();
  return (
    <main>
      {/*ここに画像が差し込まれる*/}
      <table>
        <tbody>
          <tr>
            <th>拠点</th>
            <td>{profile.location}</td>
          </tr>
          <tr>
            <th>稼働条件</th>
            <td>{profile.workingConditions}</td>
          </tr>
          <tr>
            <th>開始時期</th>
            <td>{profile.availability}</td>
          </tr>
          <tr>
            <th>担当業務</th>
            <td>{profile.role}</td>
          </tr>
          <tr>
            <th>ひとこと</th>
            <td>{profile.value}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default AboutPage;
