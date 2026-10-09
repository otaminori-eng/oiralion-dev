"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages } from "@/lib/pages";

const Navigation = () => {
  // trailingSlashが効いているため、"/about/" と "/about" を同じページとして扱う
  const pathname = usePathname().replace(/\/$/, "");
  if (pathname === "") {
    return null;
  }

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[13px]">
      {pages.map(({ href, name }) => {
        const isCurrent = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={`border-b-2 pb-0.5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-coral ${
              isCurrent
                ? "border-coral text-ink"
                : "border-transparent text-sub"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};
export default Navigation;
