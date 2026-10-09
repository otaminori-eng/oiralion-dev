import Link from "next/link";
import { pages } from "@/lib/pages";

const PageCards = () => {
  return (
    <ul className="grid gap-3 px-gutter py-6 md:grid-cols-3 md:pb-8">
      {pages.map(({ href, title, description }) => (
        <li key={href}>
          <Link
            href={href}
            className="group relative flex flex-col gap-0.5 rounded-[4px] border border-rule bg-card px-[18px] pt-4 pb-[18px] leading-[1.5] transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-coral motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="absolute top-4 right-4 text-coral transition-transform group-hover:translate-x-[3px] motion-reduce:transition-none"
            >
              →
            </span>
            <span className="text-[17px] font-bold">{title}</span>
            <span className="text-xs text-sub">{description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default PageCards;
