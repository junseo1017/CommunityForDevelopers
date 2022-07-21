import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  public name = "error";
  public status: number;
  public message: string;
  constructor(status: number, message: string, name?: string) {
    super(message);
    this.status = status ?? 500;
    this.message = message;
    if (name !== undefined) {
      this.name = name;
    }
  }
}

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error.stack);

  if (error instanceof AppError) {
    res
      .status(error.status)
      .json({ result: error.name, reason: error.message });
  } else {
    res.json({ result: error.name, reason: error.message });
  }
}

export { errorHandler, AppError };
