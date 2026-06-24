import { z } from "zod";

/* ================= LOGIN ================= */

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/* ================= CREATE DEALER ================= */

export const CreateDealerSchema = z.object({
  shopName: z.string().min(2, "Shop name is required"),

  contactPerson: z.string().min(2, "Contact person is required"),

  email: z.string().email("Valid email is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phone: z.string().length(10, "Phone must be 10 digits"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),

  dateOfBirth: z.string().optional(),

  yearOfEstablishment: z.coerce.number().optional(),

  address: z.string().optional(),

  aadharNumber: z.string().optional(),

  panNumber: z.string().optional(),

  gstNumber: z.string().optional(),
});

/* ================= CREATE CUSTOMER ================= */

export const CreateCustomerSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Customer name is required"),

  email: z
    .string()
    .email("Valid email required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .regex(/^\d{10}$/),

  alternatePhone: z
    .string()
    .optional(),

  gender: z
    .enum(["MALE", "FEMALE", "OTHER"])
    .optional(),

  dateOfBirth: z
    .string()
    .optional(),

  address: z
    .string()
    .optional(),

  bankName: z
    .string()
    .optional(),

  ifscCode: z
    .string()
    .optional(),

  accountNumber: z
    .string()
    .optional(),
});

/* ================= UPDATE DEALER ================= */

export const UpdateDealerSchema = z.object({
  shopName: z
    .string()
    .trim()
    .min(2, "Shop name must be at least 2 characters")
    .optional(),

  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .optional(),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),

  address: z
    .string()
    .trim()
    .optional(),
});

/* ================= UPDATE CUSTOMER ================= */

export const UpdateCustomerSchema = z.object({
  customerName: z.string().min(2).optional(),

  phone: z.string().length(10).optional(),

  address: z.string().optional(),

  gender: z
    .enum(["MALE", "FEMALE", "OTHER"])
    .optional(),

  bankName: z.string().optional(),

  ifscCode: z.string().optional(),

  accountNumber: z.string().optional(),
});

/* ================= TYPES ================= */

export type LoginInput = z.infer<typeof LoginSchema>;

export type CreateDealerInput =
  z.infer<typeof CreateDealerSchema>;

export type CreateCustomerInput =
  z.infer<typeof CreateCustomerSchema>;

export type UpdateDealerInput =
  z.infer<typeof UpdateDealerSchema>;

export type UpdateCustomerInput =
  z.infer<typeof UpdateCustomerSchema>;

                     // DEVICE SALE

  export const CreateDeviceSaleSchema = z.object({
  customerId: z.string().uuid(),

  brand: z.string().min(1, "Brand is required"),

  model: z.string().min(1, "Model is required"),

  imei: z.string().min(10, "IMEI is required"),

  salePrice: z.number().positive(),

  purchaseDate: z.string().optional(),
});

            // CREATING LOAN

export const CreateLoanSchema = z.object({
  customerId: z.string().uuid(),

  deviceSaleId: z.string().uuid(),

  totalAmount: z.number().positive(),

  downPayment: z.number().min(0),

  tenureMonths: z.number().min(1),
});

                  // PAY EMIs

export const PayEmiSchema = z.object({
  amount: z.number().positive(),
});