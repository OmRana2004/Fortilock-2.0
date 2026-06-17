import { z } from "zod";

/* ---------------- HTTP API SCHEMAS ---------------- */

/* User signup */

export const AdminUserSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3)
    .max(500)
    .refine((email) => email.includes("@"), {
      message: "Email must contain @",
    }),

  password: z.string().min(6, "Password must be 6 character").max(100),
  name: z.string("").min(1, "name fiels is require"),
});


/* User signin */

export const LoginUserSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3)
    .max(500)
    .refine((email) => email.includes("@"), {
      message: "Email must contain @",
    }),

  password: z.string().min(6).max(100),
});

export const CustomerSchema = z.object({
    name: z.string("").min(2).max(26),
    password: z.string().min(6, "Password must be 6 character").max(100),
    email: z
    .string()
    .email("Please enter a valid email address")
    .min(3)
    .max(500)
    .refine((email) => email.includes("@"), {
      message: "Email must contain @",
    }),
})

export const DealerSchema = z.object({
    name: z.string("").min(2).max(26),
    password: z.string().min(6, "Password must be 6 character").max(100),
    email: z
    .string()
    .email("Please enter a valid email address")
    .min(3)
    .max(500)
    .refine((email) => email.includes("@"), {
      message: "Email must contain @",
    }),
})