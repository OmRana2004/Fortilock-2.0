import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getEmis = async (
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

    const emis = await prisma.emi.findMany({
      where: {
        loan: {
          customer: {
            dealerId: dealer.id,
          },
        },
      },

      include: {
        loan: {
          include: {
            customer: {
              select: {
                customerName: true,
                phone: true,
              },
            },
          },
        },
      },

      orderBy: {
        dueDate: "asc",
      },
    });

    return res.status(200).json({
      total: emis.length,
      emis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};