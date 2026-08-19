import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { VisualAdmin } from "@/components/admin/VisualAdmin";

export const metadata = { title: "GLOW Admin · Layout" };
export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyAdminToken(token) ? <VisualAdmin /> : <AdminLogin />;
}
