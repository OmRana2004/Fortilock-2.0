import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        userId: req.user!.userId,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const loans = await prisma.loan.findMany({
      where: {
        customerId: customer.id,
      },

      include: {
        deviceSale: true,
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