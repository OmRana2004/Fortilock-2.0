import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../db";
import { DealerSchema } from "../../common/types";

export const createDealer = async (
  req: Request,
  res: Response
) => {
  const parsed = DealerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const { name, email, password } = parsed.data;

    const existingDealer = await prisma.user.findUnique({
      where: { email },
    });

    if (existingDealer) {
      return res.status(409).json({
        message: "Dealer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dealer = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "DEALER"
      },
    });

    return res.status(201).json({
      message: "Dealer created successfully",
      DealerId: dealer.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};