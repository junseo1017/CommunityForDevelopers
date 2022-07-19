import cors from "cors";
import express, { Express } from "express";
import * as Routers from "./routers";
import { errorHandler } from "./middlewares";
import cookieParser from "cookie-parser";

const app: Express = express();

// CORS 에러 방지
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// routing
app.use("/api/users", Routers.userRouter);
app.use("/api/portfolios", Routers.portfolioRouter);
app.use("/api/comments", Routers.commentRouter);
app.use("/api/qnas", Routers.qnaRouter);
app.use("/api/oauth", Routers.authRouter);
app.use("/api/search", Routers.searchRouter);

app.use(errorHandler);
export { app };
