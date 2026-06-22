import type { Request, Response } from "express";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    message: "Welcome Dealer",
    user: req.user,
  });
};