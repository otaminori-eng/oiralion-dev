import type { Metadata } from "next";
import { IBM_Plex_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
});
const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});
export const metadata: Metadata = {
  title: "otamiのホームページ",
  description:
    "otamiのホームページです。Webエンジニアとしての経歴やスキル、個人開発・制作実績等で構成されています。",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${zenKaku.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
