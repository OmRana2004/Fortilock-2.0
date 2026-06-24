"use client";

import ProtectedRoute from "@/components/protected-route";

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute
      allowedRoles={["DEALER"]}
    >
      {children}
    </ProtectedRoute>
  );
}