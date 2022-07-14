import jwt from "jsonwebtoken";
import { UserType } from "../db/schemas/user-schema";

const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

export const jwtUtil = {
  access: (user: UserType) => {
    const payload = {
      userId: user._id,
      role: user.role,
    };

    return jwt.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
  },

  refresh: () => {
    return jwt.sign({}, secretKey, {
      algorithm: "HS256",
      expiresIn: "30d",
    });
  },

  verify: (access: string) => {
    const accessDecoded = jwt.verify(access, secretKey);

    try {
      if (typeof accessDecoded !== "string") {
        return {
          ok: true,
          userId: accessDecoded.userId,
          role: accessDecoded.role,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  },

  refreshVerify: (refresh: string) => {
    const refreshDecoded = jwt.verify(refresh, secretKey);

    try {
      if (typeof refreshDecoded !== "string") {
        return {
          ok: true,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  },
};
