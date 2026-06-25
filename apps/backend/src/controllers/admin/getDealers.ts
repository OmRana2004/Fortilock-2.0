import type { Request, Response } from "express";
import { prisma } from "../../db";

export const getDealers = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "");

    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          shopName: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          contactPerson: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          phone: {
            contains: search,
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    };

    const [dealers, total] = await Promise.all([
      prisma.dealer.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      }),

      prisma.dealer.count({
        where,
      }),
    ]);

    return res.status(200).json({
      dealers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};