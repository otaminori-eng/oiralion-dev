"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <nav>
      <Link href="/about">about</Link>
      <Link href="/skills">skills</Link>
      <Link href="/career">career</Link>
    </nav>
  );
};
export default Navigation;
