import cors from "cors";
import express, { Express } from "express";
import * as Routers from "./routers";
import { errorHandler } from "./middlewares";

const app: Express = express();

//CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// routing
app.use("/api", Routers.userRouter);
app.use("/api/portfolio", Routers.portfolioRouter);
app.use(errorHandler);
export { app };
