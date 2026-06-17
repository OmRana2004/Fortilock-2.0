import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../db";
import { CustomerSchema } from "../../common/types";

export const createCustomer = async (
  req: Request,
  res: Response
) => {
  const parsed = CustomerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const { name, email, password } = parsed.data;

    const existingCustomer = await prisma.user.findUnique({
      where: { email },
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "CUSTOMER"
      },
    });

    return res.status(201).json({
      message: "Customer created successfully",
      customerId: customer.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};