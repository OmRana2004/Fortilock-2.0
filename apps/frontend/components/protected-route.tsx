"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

type Role =
  | "SUPER_ADMIN"
  | "DEALER"
  | "CUSTOMER";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const restoreSession =
    useAuthStore(
      (state) => state.restoreSession
    );

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      let currentUser = user;

      if (!currentUser) {
        const authenticated =
          await restoreSession();

        if (!authenticated) {
          router.replace("/login");
          return;
        }

        currentUser =
          useAuthStore.getState().user;
      }

      if (
        !allowedRoles.includes(
          currentUser!.role as Role
        )
      ) {
        router.replace("/login");
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, []);

  if (checking) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}