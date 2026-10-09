import Link from "next/link";
import Navigation from "@/components/Navigation";

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-gutter py-5">
      <Link
        href="/"
        className="flex items-center gap-[9px] font-mono text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-coral"
      >
        <span aria-hidden="true" className="size-2 bg-coral" />
        otami
      </Link>
      <Navigation />
    </header>
  );
};
export default Header;
