import type { Request, Response } from "express";
import { prisma } from "../../db";

export const dashboard = async (
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

    const [
      activeLoans,
      pendingEmis,
      paidEmis,
      loans,
      emis,
    ] = await Promise.all([
      prisma.loan.count({
        where: {
          customerId: customer.id,
          status: "ACTIVE",
        },
      }),

      prisma.emi.count({
        where: {
          status: "PENDING",
          loan: {
            customerId: customer.id,
          },
        },
      }),

      prisma.emi.count({
        where: {
          status: "PAID",
          loan: {
            customerId: customer.id,
          },
        },
      }),

      prisma.loan.findMany({
        where: {
          customerId: customer.id,
          status: "ACTIVE",
        },
        select: {
          monthlyEmi: true,
        },
      }),

      prisma.emi.findMany({
        where: {
          loan: {
            customerId: customer.id,
          },
        },
        select: {
          amount: true,
          paidAmount: true,
        },
      }),
    ]);

    const totalMonthlyEmi = loans.reduce(
      (sum, loan) => sum + loan.monthlyEmi,
      0
    );

    const totalEmiAmount = emis.reduce(
      (sum, emi) => sum + emi.amount,
      0
    );

    const totalPaidAmount = emis.reduce(
      (sum, emi) => sum + emi.paidAmount,
      0
    );

    const remainingAmount =
      totalEmiAmount - totalPaidAmount;

    return res.status(200).json({
      message: `Hello ${customer.customerName} 👋`,

      customerName: customer.customerName,

      totalEmiAmount,

      totalPaidAmount,

      remainingAmount,

      totalMonthlyEmi,

      activeLoans,

      pendingEmis,

      paidEmis,
    });
  } catch (error) {
    console.error(
      "CUSTOMER DASHBOARD ERROR:",
      error
    );

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};