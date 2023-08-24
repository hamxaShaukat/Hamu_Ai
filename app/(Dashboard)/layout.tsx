import Navbar from "@/components/Navbar"
import Sidebar from "@/components/SideBar"

export default function DashBoardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-blue-900">
            <Sidebar />
            </div>
        </div>
        <main className="md:pl-72">
            <Navbar />
            {children}
        </main>
        </div>
    );
  }