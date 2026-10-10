"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pages } from "@/lib/pages";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-coral";

const Navigation = () => {
  // trailingSlashが効いているため、"/about/" と "/about" を同じページとして扱う
  const pathname = usePathname().replace(/\/$/, "");
  const [isOpen, setIsOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  if (pathname === "") {
    return null;
  }

  return (
    <nav aria-label="ページ" className="font-mono text-[13px]">
      <ul className="hidden flex-wrap gap-x-6 gap-y-1 md:flex">
        {pages.map(({ href, name }) => {
          const isCurrent = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`border-b-2 pb-0.5 hover:text-ink ${focusRing} ${
                  isCurrent
                    ? "border-coral text-ink"
                    : "border-transparent text-sub"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-menu"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setIsOpen((open) => !open)}
        className={`relative -mr-2.5 block size-10 md:hidden ${focusRing}`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-x-2.5 top-1/2 border-t-[1.5px] border-ink transition-transform motion-reduce:transition-none ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          aria-hidden="true"
          className={`absolute inset-x-2.5 top-1/2 border-t-[1.5px] border-ink transition-opacity motion-reduce:transition-none ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          aria-hidden="true"
          className={`absolute inset-x-2.5 top-1/2 border-t-[1.5px] border-ink transition-transform motion-reduce:transition-none ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      {isOpen && (
        <ul
          id="site-menu"
          aria-label="メニュー"
          className="absolute inset-x-0 top-full z-10 border-y border-rule bg-card px-gutter md:hidden"
        >
          {pages.map(({ href, name, description }) => {
            const isCurrent = pathname === href;
            return (
              <li key={href} className="border-b border-rule last:border-b-0">
                <Link
                  href={href}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 py-3 ${focusRing}`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-[7px] shrink-0 border ${
                      isCurrent ? "border-coral bg-coral" : "border-rule"
                    }`}
                  />
                  {name}
                  <span className="ml-auto font-sans text-xs text-sub">
                    {description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};
export default Navigation;
