import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../../db";
import { CreateCustomerSchema } from "../../common/types";

export const createCustomer = async (
  req: Request,
  res: Response
) => {
  const parsed =
    CreateCustomerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message:
        parsed.error.issues[0]?.message,
    });
  }

  try {
    const {
      customerName,
      email,
      password,
      phone,
      alternatePhone,
      gender,
      dateOfBirth,
      address,
      bankName,
      ifscCode,
      accountNumber,
    } = parsed.data;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const dealer =
      await prisma.dealer.findUnique({
        where: {
          userId: req.user!.userId,
        },
      });

    if (!dealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: customerName,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

    const customer =
      await prisma.customer.create({
        data: {
          userId: user.id,

          dealerId: dealer.id,

          customerName,

          phone,

          alternatePhone,

          gender,

          dateOfBirth:
            dateOfBirth
              ? new Date(dateOfBirth)
              : null,

          address,

          bankName,

          ifscCode,

          accountNumber,
        },
      });

    return res.status(201).json({
      message:
        "Customer created successfully",

      customerId: customer.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};