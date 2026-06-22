import type { Request, Response } from "express";
import { prisma } from "../../db";

export const profile = async (
  req: Request,
  res: Response
) => {
  try {
    const customer =
      await prisma.customer.findFirst({
        where: {
          userId: req.user!.userId,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },

          dealer: {
            select: {
              id: true,
              shopName: true,
              phone: true,
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