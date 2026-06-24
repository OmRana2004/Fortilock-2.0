import type { Request, Response } from "express";
import { prisma } from "../../db";
import { PayEmiSchema } from "../../common/types";

export const payEmi = async (
  req: Request,
  res: Response
) => {
  const parsed = PayEmiSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const emiId = req.params.id as string;

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

    const emi = await prisma.emi.findFirst({
      where: {
        id: emiId,
        loan: {
          customer: {
            dealerId: dealer.id,
          },
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
        paidAmount: parsed.data.amount,
        paidAt: new Date(),
        status: "PAID",
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