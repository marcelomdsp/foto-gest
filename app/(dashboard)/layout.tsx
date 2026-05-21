
import Sidebar from '../components/Sidebar';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="overflow-auto w-full">
        {children}
      </div>
    </div>
  );
}