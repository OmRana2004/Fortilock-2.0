import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "SUPER_ADMIN") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};