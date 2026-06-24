import type { Request, Response } from "express";
import { prisma } from "../../db";

export const me = async (
  req: Request,
  res: Response
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user!.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return res.json(user);
};