import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const dealerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "DEALER") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};