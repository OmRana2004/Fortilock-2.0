import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "DEALER" | "CUSTOMER";
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;

  login: (
    email: string,
    password: string
  ) => Promise<User | null>;

  logout: () => Promise<void>;

  restoreSession: () => Promise<boolean>;
}

export const useAuthStore =
  create<AuthStore>()(
    persist(
      (set) => ({
        user: null,
        loading: false,
        error: null,

        login: async (
          email: string,
          password: string
        ) => {
          try {
            set({
              loading: true,
              error: null,
            });

            const response =
              await api.post(
                "/api/v1/auth/login",
                {
                  email,
                  password,
                }
              );

            const { user } =
              response.data;

            set({
              user,
              loading: false,
            });

            return user;
          } catch (error: any) {
            set({
              loading: false,
              error:
                error?.response?.data
                  ?.message ||
                "Login failed",
            });

            return null;
          }
        },

        logout: async () => {
          try {
            await api.post(
              "/api/v1/auth/logout"
            );
          } catch {}

          set({
            user: null,
            error: null,
          });
        },

        restoreSession: async () => {
  try {
    set({ loading: true });

    const response =
      await api.get("/api/v1/auth/me");

    set({
      user: response.data,
      loading: false,
    });

    return true;
  } catch {
    set({
      user: null,
      loading: false,
    });

    return false;
  }
}
      }),
      {
        name: "fortilock-auth",
      }
    )
  );