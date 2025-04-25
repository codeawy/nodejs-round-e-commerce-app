import express, { Express } from "express";
import path from "path";
import { initializeJsonFile } from "./utils/fileUtils";

const app: Express = express();

// * Initialize users.json file if it dosn't exist
const usersFilePath = path.join(process.cwd(), "data/users.json");
try {
  initializeJsonFile(usersFilePath);
} catch (error) {
  console.error("Error initializing users.json file:", error);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
