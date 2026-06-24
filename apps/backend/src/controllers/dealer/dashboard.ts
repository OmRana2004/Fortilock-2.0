import type { Request, Response } from "express";
import { prisma } from "../../db";

export const dashboard = async (
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

    const [
      totalCustomers,
      totalDeviceSales,
      activeLoans,
      pendingEmis,
      paidEmis,
    ] = await Promise.all([
      prisma.customer.count({
        where: {
          dealerId: dealer.id,
        },
      }),

      prisma.deviceSale.count({
        where: {
          dealerId: dealer.id,
        },
      }),

      prisma.loan.count({
        where: {
          status: "ACTIVE",
          customer: {
            dealerId: dealer.id,
          },
        },
      }),

      prisma.emi.count({
        where: {
          status: "PENDING",
          loan: {
            customer: {
              dealerId: dealer.id,
            },
          },
        },
      }),

      prisma.emi.count({
        where: {
          status: "PAID",
          loan: {
            customer: {
              dealerId: dealer.id,
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      totalCustomers,
      totalDeviceSales,
      activeLoans,
      pendingEmis,
      paidEmis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};