const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col items-center gap-3 bg-ink px-gutter py-7 text-center text-paper">
      <h2 className="text-[22px] font-bold leading-[1.3]">
        Contact
        <span className="mt-1 block text-xs font-normal text-faint">
          ご連絡について
        </span>
      </h2>
      <p className="text-[13px] text-rule">
        このページは、ご紹介いただいた方向けに公開しています。
        <br />
        稼働条件や面談のご相談は、ご紹介元のエージェントさまを通してお気軽にどうぞ。
      </p>
      <p className="mt-2 font-mono text-[11px] text-faint">© 2026 otami</p>
    </footer>
  );
};
export default Footer;
