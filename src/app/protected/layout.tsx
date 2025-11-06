import AuthGlobalLayout from "@/components/layout/protected/AuthGlobalLayout";
import { CheckAuthorization } from "@/services/checkAutorization";
import { getUserFromToken } from "@/services/getUserFromToken";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await CheckAuthorization();
  return <AuthGlobalLayout>{children}</AuthGlobalLayout>;
}
