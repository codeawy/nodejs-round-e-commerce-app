import express, { Express } from "express";
import path from "path";
import helmet from "helmet";
import { initializeJsonFile } from "./utils/fileUtils";
import { corsConfig } from "./middlewares/security.middleware";

const app: Express = express();

// * Initialize users.json file if it dosn't exist
const usersFilePath = path.join(process.cwd(), "data/users.json");
try {
  initializeJsonFile(usersFilePath);
} catch (error) {
  console.error("Error initializing users.json file:", error);
  process.exit(1);
}

// ** Security middlewares -> apply thse before route handlers
app.use(helmet()); // ** Set security-related HTTP headers
app.use(corsConfig); // ** custom CORS config

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
