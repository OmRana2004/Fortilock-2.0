import type { Request, Response } from "express";
import { prisma } from "../../db";
import { CreateDeviceSaleSchema } from "../../common/types";

export const createDeviceSale = async (
  req: Request,
  res: Response
) => {
  const parsed =
    CreateDeviceSaleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const {
      customerId,
      brand,
      model,
      imei,
      salePrice,
      purchaseDate,
    } = parsed.data;

    const dealer = await prisma.dealer.findUnique({
      where: {
        userId: req.user!.userId,
      },
    });

    if (!dealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    const customer =
      await prisma.customer.findFirst({
        where: {
          id: customerId,
          dealerId: dealer.id,
        },
      });

    if (!customer) {
      return res.status(404).json({
        message:
          "Customer not found or doesn't belong to you",
      });
    }

    const existingImei =
      await prisma.deviceSale.findUnique({
        where: {
          imei,
        },
      });

    if (existingImei) {
      return res.status(409).json({
        message: "IMEI already exists",
      });
    }

    const sale =
      await prisma.deviceSale.create({
        data: {
          dealerId: dealer.id,
          customerId,

          brand,
          model,

          imei,

          salePrice,

          purchaseDate: purchaseDate
            ? new Date(purchaseDate)
            : new Date(),
        },
      });

    return res.status(201).json({
      message:
        "Device sale created successfully",
      sale,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};