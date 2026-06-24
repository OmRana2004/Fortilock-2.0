import type { Request, Response } from "express";
import { prisma } from "../../db";
import { CreateLoanSchema } from "../../common/types";

export const createLoan = async (
  req: Request,
  res: Response
) => {
  const parsed = CreateLoanSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

  try {
    const {
      customerId,
      deviceSaleId,
      totalAmount,
      downPayment,
      tenureMonths,
    } = parsed.data;

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

    const sale = await prisma.deviceSale.findFirst({
      where: {
        id: deviceSaleId,
        customerId,
        dealerId: dealer.id,
      },
    });

    if (!sale) {
      return res.status(404).json({
        message: "Device sale not found",
      });
    }

    const existingLoan =
      await prisma.loan.findUnique({
        where: {
          deviceSaleId,
        },
      });

    if (existingLoan) {
      return res.status(409).json({
        message: "Loan already exists",
      });
    }

    const financedAmount =
      totalAmount - downPayment;

    const monthlyEmi =
      financedAmount / tenureMonths;

    const loan = await prisma.loan.create({
      data: {
        customerId,
        deviceSaleId,

        totalAmount,
        downPayment,

        financedAmount,

        tenureMonths,

        monthlyEmi,

        startDate: new Date(),
      },
    });

    return res.status(201).json({
      message: "Loan created successfully",
      loan,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};