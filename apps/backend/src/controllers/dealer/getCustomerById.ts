import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getCustomerById = async (
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

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};