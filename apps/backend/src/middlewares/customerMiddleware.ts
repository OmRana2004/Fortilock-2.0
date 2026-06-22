import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const customerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "CUSTOMER") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};