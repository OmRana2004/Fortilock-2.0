import type { Request, Response } from "express";
import { prisma } from "../../db"
import { tr } from "zod/locales";
import e from "express";

export const deleteDealer = async (
    req: Request,
    res: Response
) => {
    try {
        const  id  = req.params.id as string

        const dealer = await prisma.dealer.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                userId: true
            }
        });

        if (!dealer) {
            return res.status(404).json({msg: "Dealer not found"});
        }

        await prisma.user.delete({
            where: {
                id: dealer.userId
            },
        });

        return res.status(200).json({msg: "Dealer Deleted Sucessfully"});
    } catch (err) {
        console.error(err);

        return res.status(500).json({msg: "Internal server error"})
    }
};