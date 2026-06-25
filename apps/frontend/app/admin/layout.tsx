"use client";

import ProtectedRoute from "@/components/protected-route";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute
      allowedRoles={["SUPER_ADMIN"]}
    >
      <div className="flex h-screen bg-slate-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Side */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Overview" />

          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}