import { Navbar } from "@/components/layout/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default CommonLayout;
