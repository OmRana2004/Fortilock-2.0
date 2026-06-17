import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma }from "../../db"
import { CreateUserSchema } from "../../common/types"
import { id } from "zod/locales";

export const signup = async (req: Request, res: Response) =>{
    const parsed = CreateUserSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid input data"
        });
    }

    try {
        const { email, password, name } = parsed.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                msg: "User already exists"
            });
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hasedPassword,
                name,
                photo: ""
            }
        });

        return res.status(201).json({
            msg: "User created successfully",
            userId: user,id
        });
    } catch (err) {
        console.error("SIGNUP ERROR:", err);
        return  res.status(500).json({
            msg: "Internal server error"
        });
    }
};