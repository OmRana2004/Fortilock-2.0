import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../../db";
import { CreateDealerSchema } from "../../common/types";

export const createDealer = async (
  req: Request,
  res: Response
) => {
  const parsed = CreateDealerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const {
      shopName,
      contactPerson,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      yearOfEstablishment,
      address,
      aadharNumber,
      panNumber,
      gstNumber,
    } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await prisma.user.create({
      data: {
        name: contactPerson,
        email,
        password: hashedPassword,
        role: "DEALER",
      },
    });

    const dealer = await prisma.dealer.create({
      data: {
        userId: user.id,

        shopName,
        contactPerson,

        phone,

        gender,

        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth)
          : null,

        yearOfEstablishment,

        address,

        aadharNumber,

        panNumber,

        gstNumber,
      },
    });

    return res.status(201).json({
      message: "Dealer created successfully",
      dealerId: dealer.id,
      userId: user.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};