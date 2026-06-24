import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getLoans = async (
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

    const loans = await prisma.loan.findMany({
      where: {
        customer: {
          dealerId: dealer.id,
        },
      },

      include: {
        customer: {
          select: {
            customerName: true,
            phone: true,
          },
        },

        deviceSale: {
          select: {
            brand: true,
            model: true,
            imei: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      total: loans.length,
      loans,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};