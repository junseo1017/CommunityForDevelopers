import appRoot from "app-root-path";
import fs from "fs";

const accessLogStream = fs.createWriteStream(`${appRoot}/src/log/access.log`, {
  flags: "a",
});

export { accessLogStream };

