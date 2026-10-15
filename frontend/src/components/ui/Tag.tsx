import type { ReactNode } from "react";
import type { SkillUsage } from "@/lib/skills";

type Props = {
  children: ReactNode;
  usage?: SkillUsage;
};

const Tag = ({ children, usage }: Props) => {
  return <span className={usage ? `tag tag-${usage}` : "tag"}>{children}</span>;
};
export default Tag;
