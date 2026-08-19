import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = { title: "GLOW Admin" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyAdminToken(token) ? <AdminDashboard /> : <AdminLogin />;
}
