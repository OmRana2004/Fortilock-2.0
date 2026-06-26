import type { Request, Response } from "express";
import { prisma } from "../../db";

export const toggleDealerStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        message: "Invalid dealer id",
      });
    }

    const dealer = await prisma.dealer.findUnique({
      where: {
        id,
      },
    });

    if (!dealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    const updatedDealer = await prisma.dealer.update({
      where: {
        id,
      },
      data: {
        isActive: !dealer.isActive,
      },
    });

    return res.status(200).json({
      message: `Dealer ${
        updatedDealer.isActive
          ? "activated"
          : "deactivated"
      } successfully`,
      dealer: updatedDealer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};