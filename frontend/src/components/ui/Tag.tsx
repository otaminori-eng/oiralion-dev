import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Tag = ({ children }: Props) => {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-[3px] border border-rule px-[9px] py-[3px] font-mono text-[12.5px] leading-[1.5]">
      {children}
    </span>
  );
};
export default Tag;
