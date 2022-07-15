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
      // expiresIn: "10000ms",
      expiresIn: "7d",
    });
  },

  refresh: (user: UserType) => {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: "30d",
    });
  },

  decoded: (token: string) => {
    return jwt.decode(token);
  },

  verify: (access: string) => {
    try {
      const accessDecoded = jwt.verify(access, secretKey);

      if (typeof accessDecoded !== "string") {
        return {
          userId: accessDecoded.userId,
          role: accessDecoded.role,
        };
      }
    } catch (error) {
      return { error };
    }
  },

  refreshVerify: (refresh: string) => {
    try {
      const refreshDecoded = jwt.verify(refresh, secretKey);

      if (typeof refreshDecoded !== "string") {
        return {
          userId: refreshDecoded.userId,
        };
      }
    } catch (error) {
      return { error };
    }
  },
};
