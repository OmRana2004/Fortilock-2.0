import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../../db";
import { UpdateDealerSchema } from "../../common/types";

export const updateDealer = async (
  req: Request,
  res: Response
) => {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Invalid dealer id",
    });
  }

  const parsed = UpdateDealerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const dealer = await prisma.dealer.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!dealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    const data = parsed.data;

    // Check email uniqueness
    if (data.email) {
      const existingUser =
        await prisma.user.findFirst({
          where: {
            email: data.email,
            NOT: {
              id: dealer.userId,
            },
          },
        });

      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
    }

    const userData: Record<string, any> = {};
    const dealerData: Record<string, any> = {};

    /* ================= USER ================= */

    if (data.contactPerson !== undefined) {
      userData.name = data.contactPerson;
    }

    if (data.email !== undefined) {
      userData.email = data.email;
    }

    if (
      data.password &&
      data.password.trim() !== ""
    ) {
      userData.password = await bcrypt.hash(
        data.password,
        10
      );
    }

    /* ================= DEALER ================= */

    if (data.shopName !== undefined) {
      dealerData.shopName = data.shopName;
    }

    if (data.contactPerson !== undefined) {
      dealerData.contactPerson =
        data.contactPerson;
    }

    if (data.phone !== undefined) {
      dealerData.phone = data.phone;
    }

    if (data.gender !== undefined) {
      dealerData.gender = data.gender;
    }

    if (data.dateOfBirth !== undefined) {
      dealerData.dateOfBirth =
        data.dateOfBirth === ""
          ? null
          : new Date(data.dateOfBirth);
    }

    if (
      data.yearOfEstablishment !== undefined
    ) {
      dealerData.yearOfEstablishment =
        data.yearOfEstablishment;
    }

    if (data.address !== undefined) {
      dealerData.address = data.address;
    }

    if (data.aadharNumber !== undefined) {
      dealerData.aadharNumber =
        data.aadharNumber;
    }

    if (data.panNumber !== undefined) {
      dealerData.panNumber = data.panNumber;
    }

    if (data.gstNumber !== undefined) {
      dealerData.gstNumber = data.gstNumber;
    }

    await prisma.$transaction(async (tx) => {
      if (Object.keys(userData).length > 0) {
        await tx.user.update({
          where: {
            id: dealer.userId,
          },
          data: userData,
        });
      }

      if (Object.keys(dealerData).length > 0) {
        await tx.dealer.update({
          where: {
            id,
          },
          data: dealerData,
        });
      }
    });

    return res.status(200).json({
      message: "Dealer updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};