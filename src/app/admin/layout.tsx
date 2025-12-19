import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SidebarOnly from "@/components/admin/SidebarOnly";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 🔒 NOT LOGGED IN → LOGIN PAGE
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <SidebarOnly />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
