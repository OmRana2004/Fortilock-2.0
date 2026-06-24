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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const where = {
      loan: {
        customer: {
          dealerId: dealer.id,
        },
      },
    };

    const [emis, total] = await Promise.all([
      prisma.emi.findMany({
        where,

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

        skip,
        take: limit,
      }),

      prisma.emi.count({
        where,
      }),
    ]);

    return res.status(200).json({
      data: emis,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};