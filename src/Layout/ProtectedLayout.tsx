import SideNav from './SideNav';

interface ProtectedLayoutProps {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
