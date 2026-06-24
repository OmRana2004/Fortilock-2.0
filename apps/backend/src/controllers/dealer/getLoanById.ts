import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getLoanById = async (
  req: Request,
  res: Response
) => {
  try {
    const loanId = req.params.id as string;

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

    const loan = await prisma.loan.findFirst({
      where: {
        id: loanId,

        customer: {
          dealerId: dealer.id,
        },
      },

      include: {
        customer: true,
        deviceSale: true,
        emis: true,
      },
    });

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    return res.status(200).json(loan);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};