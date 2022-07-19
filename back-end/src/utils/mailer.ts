import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.MAILER_ID,
  },
});
