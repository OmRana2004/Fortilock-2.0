import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../db";
import { AdminUserSchema } from "../../common/types";

export const admin = async (req: Request, res: Response) => {
  const parsed = AdminUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      msg: parsed.error.issues[0]?.message,
    });
  }

  try {
    const { email, password, name } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        photo: "",
        role: "ADMIN",
      },
    });

    return res.status(201).json({
      msg: "User created successfully",
      userId: user.id,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};