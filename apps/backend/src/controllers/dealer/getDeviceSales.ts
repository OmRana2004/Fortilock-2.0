import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getDeviceSales = async (
  req: Request,
  res: Response
) => {
  try {
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

    const sales = await prisma.deviceSale.findMany({
      where: {
        dealerId: dealer.id,
      },

      include: {
        customer: {
          select: {
            id: true,
            customerName: true,
            phone: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      totalSales: sales.length,
      sales,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};