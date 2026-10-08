import Link from "next/link";
import Navigation from "@/components/Navigation";

const Header = () => {
  return (
    <header>
      <Link href="/">otami</Link>
      <Navigation />
    </header>
  );
};
export default Header;
