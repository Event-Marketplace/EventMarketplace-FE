import AuthGlobalLayout from "@/components/layout/AuthGlobalLayout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGlobalLayout>{children}</AuthGlobalLayout>;
}
