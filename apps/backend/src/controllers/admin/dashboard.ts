import type { Request, Response } from "express";
import { prisma } from "../../db";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const [
      totalDealers,
      activeDealers,
      inactiveDealers,
    ] = await Promise.all([
      prisma.dealer.count(),

      prisma.dealer.count({
        where: {
          isActive: true,
        },
      }),

      prisma.dealer.count({
        where: {
          isActive: false,
        },
      }),
    ]);

    return res.status(200).json({
      totalDealers,
      activeDealers,
      inactiveDealers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};