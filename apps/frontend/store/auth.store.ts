import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "DEALER" | "CUSTOMER";
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (
    email: string,
    password: string
  ) => Promise<User | null>;

  logout: () => void;
}

export const useAuthStore =
  create<AuthStore>()(
    persist(
      (set) => ({
        user: null,
        token: null,
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

            const {
              token,
              user,
            } = response.data;

            set({
              user,
              token,
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

        logout: () => {
          set({
            user: null,
            token: null,
            error: null,
          });
        },
      }),
      {
        name: "fortilock-auth",
      }
    )
  );