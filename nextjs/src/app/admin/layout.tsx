import { adminMetadata } from "@/lib/metadata";

export const metadata = adminMetadata;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

