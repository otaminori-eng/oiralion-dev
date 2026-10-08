import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>
          こんにちは、
          <br />
          otamiです。
        </h1>
        <span>神奈川県在住のWebエンジニアです。</span>
        <Link href="/career">経歴を見る</Link>
        <Link href="/skills">スキルを見る</Link>
      </div>
      <div>
        <Link href="/about">
          about<span>プロフィール・稼働</span>
        </Link>
        <Link href="/skills">
          skills<span>使っている技術</span>
        </Link>
        <Link href="/career">
          career<span>これまでの経歴</span>
        </Link>
      </div>
    </main>
  );
}
