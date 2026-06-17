import { z } from "zod";

/* ---------------- HTTP API SCHEMAS ---------------- */

/* User signup */

export const CreateUserSchema = z.object({
  email: z.string().email().min(3).max(500),
  password: z.string().min(6).max(100),
  name: z.string().min(1)
});


/* User signin */

export const SigninUserSchema = z.object({
  email: z.string().email().min(3).max(100),
  password: z.string().min(6)
});