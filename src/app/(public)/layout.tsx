import GlobalLayout from "@/components/layout/public/GlobalLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
