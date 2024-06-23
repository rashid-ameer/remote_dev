type SidebarTopProps = {
  children: React.ReactNode;
};

function SidebarTop({ children }: SidebarTopProps) {
  return <div className="sidebar__top">{children}</div>;
}
export default SidebarTop;
