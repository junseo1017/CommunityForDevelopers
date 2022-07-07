import dotenv from "dotenv";
import { app } from "./src/app";
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log("타입스크립트로 서버실행중입니다");
});
