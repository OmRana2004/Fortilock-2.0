import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getDeviceSaleById = async (
  req: Request,
  res: Response
) => {
  try {
    const saleId = req.params.id as string;

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

    const sale = await prisma.deviceSale.findFirst({
      where: {
        id: saleId,
        dealerId: dealer.id,
      },

      include: {
        customer: true,
      },
    });

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};