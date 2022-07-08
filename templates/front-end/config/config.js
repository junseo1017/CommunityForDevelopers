const prod = process.env.NODE_ENV === "production";
module.exports = {
  backendUrl: "http://localhost:3000",
  imageUrl: prod ? null : "http://localhost:3065/images",
};
