import type { Request, Response } from "express";
import { prisma } from "../../db";

export const payCustomerEmi = async (
  req: Request,
  res: Response
) => {
  try {
    const emiId = req.params.id as string;

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

    const emi = await prisma.emi.findFirst({
      where: {
        id: emiId,
        loan: {
          customerId: customer.id,
        },
      },
    });

    if (!emi) {
      return res.status(404).json({
        message: "EMI not found",
      });
    }

    if (emi.status === "PAID") {
      return res.status(400).json({
        message: "EMI already paid",
      });
    }

    const updatedEmi = await prisma.emi.update({
      where: {
        id: emi.id,
      },
      data: {
        status: "PAID",
        paidAmount: emi.amount,
        paidAt: new Date(),
      },
    });

    return res.status(200).json({
      message: "EMI paid successfully",
      emi: updatedEmi,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};