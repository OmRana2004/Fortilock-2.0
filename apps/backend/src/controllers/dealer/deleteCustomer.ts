import type { Request, Response } from "express";
import { prisma } from "../../db";

export const deleteCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = req.params.id as string;

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

    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
        dealerId: dealer.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await prisma.customer.delete({
      where: {
        id: customer.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: customer.userId,
      },
    });

    return res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};