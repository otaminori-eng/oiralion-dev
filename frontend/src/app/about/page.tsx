import Portrait from "@/components/illustrations/Portrait";
import PageTitle from "@/components/ui/PageTitle";
import { getProfile } from "@/lib/profile";

const AboutPage = async () => {
  const profile = await getProfile();
  const rows = [
    { label: "拠点", value: profile.location },
    { label: "稼働条件", value: profile.workingConditions },
    { label: "開始時期", value: profile.availability },
    { label: "担当業務", value: profile.role },
    { label: "ひとこと", value: profile.value },
  ];

  return (
    <main className="px-gutter pb-12">
      <div className="mx-auto max-w-[920px]">
        <PageTitle title="About" description="プロフィール" />
        <div className="grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10">
          <Portrait className="block h-auto w-full max-w-[280px] rounded-[4px]" />
          <div className="rounded-[4px] border border-rule bg-card px-4 py-1.5 md:px-7">
            <table className="w-full">
              <tbody>
                {rows.map(({ label, value }) => (
                  <tr
                    key={label}
                    className="border-b border-rule last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-[7em] py-3.5 pr-4 text-left align-baseline text-[13.5px] font-normal text-sub md:w-[8em]"
                    >
                      {label}
                    </th>
                    <td className="py-3.5 align-baseline text-[17px]">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
