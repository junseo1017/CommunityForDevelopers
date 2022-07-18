import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

interface PayloadData {
  userId: string;
  role: string;
}

export const jwtUtil = {
  generateAccessToken: (user: PayloadData) => {
    const payload = {
      userId: user.userId,
      role: user.role,
    };

    return jwt.sign(payload, secretKey, {
      algorithm: "HS256",
      // expiresIn: "10000ms",
      expiresIn: "7d",
    });
  },

  generateRefreshToken: (user: PayloadData) => {
    const payload = {
      userId: user.userId,
    };
    return jwt.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: "30d",
    });
  },

  decodedToken: (token: string) => {
    return jwt.decode(token);
  },

  verifyAccess: (access: string) => {
    try {
      const accessDecoded = jwt.verify(access, secretKey);
      return {
        userId: (<jwt.JwtPayload>accessDecoded).userId,
        role: (<jwt.JwtPayload>accessDecoded).role,
      };
    } catch (error) {
      console.log("엑세스토큰검증단계", error);
      console.log("엑세스토큰검증단계name", (<Error>error).name);
      console.log("엑세스토큰검증단계message", (<Error>error).message);
      if ((<Error>error).name === "TokenExpiredError") {
        throw new Error("EXPIRED_ACCESS_TOKEN_ERROR");
      } else {
        throw new Error("INVALID_ACCESS_TOKEN_ERROR");
      }
    }
  },

  verifyRefresh: (refresh: string) => {
    try {
      const refreshDecoded = jwt.verify(refresh, secretKey);
      return {
        userId: (<jwt.JwtPayload>refreshDecoded).userId,
      };
    } catch (error) {
      console.log(error);
      if ((<Error>error).name === "TokenExpiredError") {
        throw new Error("EXPIRED_REFRESH_TOKEN_ERROR");
      } else {
        throw new Error("INVALID_REFRESH_TOKEN_ERROR");
      }
    }
  },
};
