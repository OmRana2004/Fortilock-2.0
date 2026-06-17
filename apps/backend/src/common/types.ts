import { z } from "zod";

/* ---------------- HTTP API SCHEMAS ---------------- */

/* User signup */

export const CreateUserSchema = z.object({
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

export const SigninUserSchema = z.object({
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