import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getCustomers = async (
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

    const [customers, totalCustomers] = await Promise.all([
      prisma.customer.findMany({
        where: {
          dealerId: dealer.id,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              isActive: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.customer.count({
        where: {
          dealerId: dealer.id,
        },
      }),
    ]);

    return res.status(200).json({
      data: customers,

      pagination: {
        page,
        limit,
        totalCustomers,
        totalPages: Math.ceil(
          totalCustomers / limit
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