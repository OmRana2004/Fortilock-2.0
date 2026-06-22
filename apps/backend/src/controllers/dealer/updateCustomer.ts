import type { Request, Response } from "express";
import { prisma } from "../../db";
import { UpdateCustomerSchema } from "../../common/types";

export const updateCustomer = async (
  req: Request,
  res: Response
) => {
  const parsed = UpdateCustomerSchema.safeParse(
    req.body
  );

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message,
    });
  }

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

    const updatedCustomer =
      await prisma.customer.update({
        where: {
          id: customer.id,
        },
        data: parsed.data,
      });

    return res.status(200).json({
      message: "Customer updated",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};