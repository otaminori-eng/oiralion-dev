import Link from "next/link";
import DeskScene from "@/components/illustrations/DeskScene";
import PageCards from "@/components/top/PageCards";
import { getProfile } from "@/lib/profile";

const buttonBase =
  "rounded-[3px] border px-[22px] py-2.5 text-center text-[13px] font-medium hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-coral";

export default async function Home() {
  const profile = await getProfile();
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col">
        <div className="grid flex-1 items-end gap-6 px-gutter pt-2 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4 self-center py-4 md:pt-7 md:pb-12">
            <h1 className="text-[clamp(30px,5vw,48px)] leading-[1.25] tracking-[0.02em]">
              こんにちは、
              <br />
              <span className="font-bold">otami</span>です。
            </h1>
            <p className="text-[15px] text-sub">
              {profile.location}在住のWebエンジニアです。
            </p>
            <div className="mt-1.5 grid w-fit grid-cols-2 gap-2.5">
              <Link
                href="/career"
                className={`${buttonBase} border-coral bg-coral text-on-coral`}
              >
                経歴を見る
              </Link>
              <Link
                href="/skills"
                className={`${buttonBase} border-ink bg-card text-ink`}
              >
                スキルを見る
              </Link>
            </div>
          </div>
          <DeskScene className="block h-auto w-full max-w-[440px] justify-self-end md:max-w-[480px]" />
        </div>
        <div className="border-t-[1.5px] border-ink" />
      </section>
      <PageCards />
    </main>
  );
}
