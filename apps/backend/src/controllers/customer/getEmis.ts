import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getEmis = async (
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

    const emis = await prisma.emi.findMany({
      where: {
        loan: {
          customerId: customer.id,
        },
      },

      include: {
        loan: {
          select: {
            monthlyEmi: true,
            status: true,
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