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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [sales, totalSales] = await Promise.all([
      prisma.deviceSale.findMany({
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

        skip,
        take: limit,
      }),

      prisma.deviceSale.count({
        where: {
          dealerId: dealer.id,
        },
      }),
    ]);

    return res.status(200).json({
      data: sales,

      pagination: {
        page,
        limit,
        totalSales,
        totalPages: Math.ceil(
          totalSales / limit
        ),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};