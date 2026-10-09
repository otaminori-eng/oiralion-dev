type Props = {
  title: string;
  description: string;
};

const PageTitle = ({ title, description }: Props) => {
  return (
    <h1 className="flex flex-wrap items-baseline gap-x-3.5 pt-6 pb-7 text-[26px] font-bold leading-[1.25] md:text-[30px]">
      {title}
      <small className="text-[13px] font-normal text-sub">{description}</small>
    </h1>
  );
};
export default PageTitle;
