type HeaderTopProps = {
  children: React.ReactNode;
};

function HeaderTop({ children }: HeaderTopProps) {
  return <div className="header__top">{children}</div>;
}
export default HeaderTop;
